import { useCallback, useEffect, useRef, useState } from 'react'
import { API_BASE } from '../data/site'

export type ChatStatus =
  | 'idle'
  | 'ready'
  | 'not_loaded'
  | 'loading'
  | 'thinking'
  | 'streaming'
  | 'offline'
  | 'busy'
  | 'rate_limited'
  | 'model_missing'
  | 'error'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

/** States where the assistant cannot take a new question right now. */
const BLOCKED: ChatStatus[] = ['offline', 'rate_limited', 'model_missing']

/** States where a generation is already in flight. */
const BUSY_STATES: ChatStatus[] = ['loading', 'thinking', 'streaming']

interface SseFrame {
  event: string
  data: unknown
}

/** Parse the `event:`/`data:` blocks of one SSE chunk, ignoring `:` comments. */
function parseFrames(block: string): SseFrame | null {
  let event = 'message'
  const dataLines: string[] = []

  for (const line of block.split('\n')) {
    if (line.startsWith(':')) continue
    if (line.startsWith('event:')) event = line.slice(6).trim()
    else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim())
  }

  if (dataLines.length === 0) return null
  try {
    return { event, data: JSON.parse(dataLines.join('\n')) }
  } catch {
    return null
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [status, setStatus] = useState<ChatStatus>('idle')
  const [remaining, setRemaining] = useState<number | null>(null)

  const abortRef = useRef<AbortController | null>(null)
  const messagesRef = useRef<ChatMessage[]>([])
  messagesRef.current = messages

  /** Ask the backend what the model is doing before the visitor types anything. */
  const refreshStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/chat/status`)
      if (!res.ok) throw new Error(String(res.status))
      const body = (await res.json()) as { state?: string }
      setStatus((current) =>
        BUSY_STATES.includes(current) ? current : ((body.state ?? 'offline') as ChatStatus),
      )
    } catch {
      setStatus((current) => (BUSY_STATES.includes(current) ? current : 'offline'))
    }
  }, [])

  useEffect(() => {
    void refreshStatus()
  }, [refreshStatus])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
  }, [])

  useEffect(() => () => abortRef.current?.abort(), [])

  const reset = useCallback(() => {
    cancel()
    setMessages([])
    setStatus('idle')
    void refreshStatus()
  }, [cancel, refreshStatus])

  const send = useCallback(
    async (text: string) => {
      const question = text.trim()
      if (!question) return
      if (BUSY_STATES.includes(status)) return

      const history = [...messagesRef.current, { role: 'user' as const, content: question }]
      setMessages([...history, { role: 'assistant', content: '' }])
      setStatus('thinking')

      const controller = new AbortController()
      abortRef.current = controller

      /** Grow the trailing assistant bubble as tokens land. */
      const appendToken = (piece: string) => {
        setMessages((prev) => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role === 'assistant') {
            next[next.length - 1] = { ...last, content: last.content + piece }
          }
          return next
        })
      }

      try {
        const res = await fetch(`${API_BASE}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        })

        const headerRemaining = res.headers.get('X-RateLimit-Remaining')
        if (headerRemaining !== null) setRemaining(Number(headerRemaining))

        if (!res.ok || !res.body) {
          const body = (await res.json().catch(() => null)) as { state?: string } | null
          const state = (body?.state ?? 'error') as ChatStatus
          setStatus(state)
          // Nothing was generated, so drop the empty bubble we optimistically added.
          setMessages((prev) => prev.slice(0, -1))
          return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let failed = false

        for (;;) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          // SSE frames are separated by a blank line; keep any partial tail.
          let split = buffer.indexOf('\n\n')
          while (split !== -1) {
            const block = buffer.slice(0, split)
            buffer = buffer.slice(split + 2)

            const frame = parseFrames(block)
            if (frame) {
              const payload = frame.data as { state?: string; t?: string }
              if (frame.event === 'status' && payload.state) {
                setStatus(payload.state as ChatStatus)
              } else if (frame.event === 'token' && payload.t) {
                appendToken(payload.t)
              } else if (frame.event === 'error') {
                failed = true
                setStatus((payload.state ?? 'error') as ChatStatus)
              } else if (frame.event === 'done') {
                setStatus('ready')
              }
            }
            split = buffer.indexOf('\n\n')
          }
        }

        if (failed) {
          setMessages((prev) => {
            const last = prev[prev.length - 1]
            // Keep partial output if any arrived before the failure.
            return last?.role === 'assistant' && last.content === '' ? prev.slice(0, -1) : prev
          })
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          // Visitor stopped it on purpose; keep whatever was already written.
          setStatus('ready')
          setMessages((prev) => {
            const last = prev[prev.length - 1]
            return last?.role === 'assistant' && last.content === '' ? prev.slice(0, -1) : prev
          })
          return
        }
        setStatus('offline')
        setMessages((prev) => prev.slice(0, -1))
      } finally {
        abortRef.current = null
      }
    },
    [status],
  )

  return {
    messages,
    status,
    remaining,
    send,
    cancel,
    reset,
    refreshStatus,
    isGenerating: BUSY_STATES.includes(status),
    isBlocked: BLOCKED.includes(status),
  }
}
