from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    # Ollama
    ollama_host: str = "http://192.168.0.150:11434"
    ollama_model: str = "gemma4:e4b"
    ollama_timeout: float = 180.0
    ollama_probe_timeout: float = 2.5
    # gemma4:e4b is a thinking model, and its reasoning tokens are charged
    # against num_predict — leaving almost nothing for the visible answer.
    # Landing-page replies are 2-4 sentences, so thinking is off by default.
    ollama_think: bool = False

    # Skips the Origin check so curl/Postman can hit the API while debugging.
    dev_mode: bool = False

    # DEBUG also turns httpx's per-request lines back on.
    log_level: str = "INFO"

    # CORS
    allowed_origins: str = (
        "https://pixlworks.itzgalaxy.com,http://localhost:5173,http://localhost:4173"
    )

    # Abuse protection
    rate_limit_burst: int = 8
    rate_limit_window: int = 300
    rate_limit_daily: int = 40
    max_concurrent: int = 2
    max_message_chars: int = 600
    max_history_turns: int = 6
    max_output_tokens: int = 400

    # Leads
    leads_file: str = "data/leads.jsonl"
    lead_limit_hourly: int = 3

    @property
    def origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
