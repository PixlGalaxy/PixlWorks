/**
 * All user-facing copy. Structure is mirrored exactly between `es` and `en`;
 * `t()` resolves dot paths against the active language.
 */

export const translations = {
  es: {
    meta: {
      title: 'PixlWorks | Software, Automatización e IA para Negocios',
      description:
        'PixlWorks crea páginas web, web apps, dashboards, chatbots y automatizaciones con IA para negocios que quieren ahorrar tiempo, capturar más clientes y operar mejor.',
    },
    nav: {
      solutions: 'Soluciones',
      work: 'Proyectos',
      process: 'Proceso',
      pricing: 'Paquetes',
      contact: 'Contacto',
      cta: 'Contacto',
      byline: 'by PixlGalaxy',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      language: 'Cambiar idioma',
    },
    hero: {
      badge: 'Sistemas de software para negocios reales',
      title: 'Software práctico para negocios que quieren trabajar más rápido.',
      subtitle:
        'PixlWorks crea páginas web, sistemas internos, dashboards, automatizaciones con IA y chatbots que ayudan a tu negocio a capturar más clientes, reducir tareas manuales y tomar mejores decisiones.',
      ctaPrimary: 'Agenda una reunión',
      ctaSecondary: 'Ver soluciones',
      cards: {
        lead: 'Lead capturado',
        leadMeta: 'WhatsApp · hace 2 min',
        booking: 'Reserva automatizada',
        bookingMeta: 'Confirmación enviada',
        inventory: 'Inventario sincronizado',
        inventoryMeta: '412 SKUs actualizados',
        dashboard: 'Dashboard actualizado',
        dashboardMeta: 'Ventas +18% esta semana',
        ai: 'Respuesta IA generada',
        aiMeta: 'Revisada y enviada',
      },
    },
    trust: {
      label: 'Cómo trabajamos',
      items: {
        speed: {
          title: 'Semanas, no meses',
          desc: 'Alcance cerrado y entregas parciales que ya puedes usar.',
        },
        ownership: {
          title: 'El código es tuyo',
          desc: 'Sin licencias atadas ni dependencia de una plataforma.',
        },
        infra: {
          title: 'Desplegado en serio',
          desc: 'Docker, SSL, backups y monitoreo desde el primer día.',
        },
        direct: {
          title: 'Hablas con quien programa',
          desc: 'Sin intermediarios ni briefings que se pierden.',
        },
      },
    },
    pains: {
      eyebrow: 'El problema',
      title:
        'Si tu negocio todavía depende de hojas de cálculo, mensajes perdidos o procesos manuales, estás perdiendo tiempo y clientes.',
      lead: 'Estos son los cuellos de botella que aparecen una y otra vez, y lo que ponemos en su lugar.',
      solutionLabel: 'Lo que hacemos',
      items: {
        messages: {
          problem: 'Clientes escriben por WhatsApp o Instagram y nadie responde a tiempo.',
          solution:
            'Un chatbot responde al instante, califica al cliente y te deja el lead ordenado con su contacto.',
        },
        bookings: {
          problem: 'Las reservas o citas se manejan a mano, una por una.',
          solution:
            'Un sistema de reservas con confirmación y recordatorio automático, sin que nadie escriba nada.',
        },
        data: {
          problem: 'Los datos importantes viven en Excel, en papel y en tres apps distintas.',
          solution:
            'Una sola app interna donde todo queda registrado, buscable y accesible desde el celular.',
        },
        visibility: {
          problem: 'No existe un dashboard para ver ventas, leads o rendimiento.',
          solution:
            'Un panel con tus números reales, actualizado solo, para decidir con datos y no por intuición.',
        },
        website: {
          problem: 'La página web no convierte visitantes en clientes.',
          solution:
            'Una web rápida con formularios, CTA de WhatsApp y seguimiento de cada lead que entra.',
        },
        repetition: {
          problem: 'El equipo repite todos los días tareas que podrían automatizarse.',
          solution:
            'Automatizamos el reporte, el correo y la clasificación para que tu equipo haga el trabajo que importa.',
        },
      },
    },
    solutions: {
      eyebrow: 'Soluciones',
      title: 'Soluciones que se adaptan a tu operación.',
      lead: 'No vendemos paquetes cerrados. Empezamos por donde tu negocio pierde más tiempo o más dinero.',
      items: {
        websites: {
          title: 'Páginas web que convierten',
          desc: 'Presencia profesional con SEO básico, formularios, CTA de WhatsApp, testimonios y captura de leads.',
        },
        apps: {
          title: 'Sistemas internos',
          desc: 'Apps privadas para inventario, clientes, reportes, citas, pagos, tareas y seguimiento operativo.',
        },
        ai: {
          title: 'Automatización con IA',
          desc: 'Respuestas automáticas, clasificación de mensajes, generación de reportes, resúmenes y extracción de datos.',
        },
        dashboards: {
          title: 'Dashboards y analítica',
          desc: 'Visualización de ventas, leads, tickets, clientes, productividad y reservas en un solo lugar.',
        },
        chatbots: {
          title: 'Chatbots para clientes',
          desc: 'Responden preguntas frecuentes, capturan datos, califican leads, agendan citas y derivan a una persona.',
        },
        devops: {
          title: 'DevOps e infraestructura',
          desc: 'Docker, Nginx, CI/CD, despliegues, backups, monitoreo y soluciones self-hosted que tú controlas.',
        },
      },
    },
    industries: {
      eyebrow: 'Casos de uso',
      title: 'Casos de uso por tipo de negocio',
      lead: 'Los mismos bloques técnicos, aplicados a lo que tu rubro necesita todos los días.',
      items: {
        restaurants: { name: 'Restaurantes', desc: 'Reservas, menú digital, pedidos y dashboard de ventas.' },
        clinics: { name: 'Clínicas y dentistas', desc: 'Citas, recordatorios, historial de pacientes y formularios.' },
        realestate: { name: 'Inmobiliarias', desc: 'CRM de leads, catálogo de propiedades y seguimiento automático.' },
        workshops: { name: 'Talleres mecánicos', desc: 'Órdenes de trabajo, inventario y cotizaciones.' },
        lawyers: { name: 'Abogados', desc: 'Intake forms, seguimiento de casos y documentos.' },
        retail: { name: 'Tiendas', desc: 'Inventario, ventas y catálogo online.' },
        construction: { name: 'Contratistas', desc: 'Reportes de obra, costos, tareas y fotos.' },
        schools: { name: 'Escuelas y tutores', desc: 'Reservas, pagos y progreso de estudiantes.' },
        startups: { name: 'Startups', desc: 'MVPs, dashboards, APIs y pipelines de despliegue.' },
      },
    },
    founder: {
      eyebrow: 'Quién lo construye',
      title: 'Construido por un fundador técnico, no por una agencia genérica.',
      body: 'PixlWorks es creado por Fabrizio Gamboa, también conocido como PixlGalaxy, con más de 5 años de experiencia técnica en React, Node.js, Python, Docker, servidores Linux, herramientas de IA, virtualización, dashboards y sistemas full-stack, y formación en gestión orientada a innovación y tecnología.',
      note: 'Hablas directamente con quien escribe el código y decide la arquitectura. Sin intermediarios, sin traducciones perdidas entre tu negocio y la solución.',
      stackLabel: 'Stack técnico',
      stackGroups: {
        frontend: 'Frontend',
        backend: 'Backend',
        data: 'Datos',
        infra: 'Infraestructura',
        ai: 'IA',
      },
      links: { resume: 'Resume', github: 'GitHub', itzgalaxy: 'ItzGalaxy' },
    },
    projects: {
      eyebrow: 'Selected builds',
      title: 'Ejemplos técnicos públicos.',
      lead: 'Proyectos abiertos que muestran el tipo de sistemas que construimos. El código está disponible para revisión.',
      view: 'Ver proyecto',
      items: {
        eagledocs: {
          desc: 'Plataforma de documentación en React + Vite con backend, base de datos e integración de un motor de IA.',
        },
        onpe: {
          desc: 'Dashboard de resultados electorales en tiempo real para Perú con React, TypeScript, FastAPI, Docker, Nginx y asistente de IA.',
        },
        itzgalaxy: {
          desc: 'Frontend construido con React y Vite para el ecosistema ItzGalaxy, la infraestructura que hospeda estos servicios.',
        },
      },
    },
    process: {
      eyebrow: 'Proceso',
      title: 'De un proceso desordenado a un sistema que funciona.',
      lead: 'Cinco pasos, sin sorpresas. Sabes qué se entrega en cada uno antes de empezar.',
      steps: {
        audit: { name: 'Audit', desc: 'Revisamos dónde se pierde tiempo, leads o datos en tu operación actual.' },
        blueprint: { name: 'Blueprint', desc: 'Diseñamos una solución simple y medible, con alcance cerrado.' },
        build: { name: 'Build', desc: 'Creamos la web app, la automatización, el dashboard o la integración.' },
        deploy: { name: 'Deploy', desc: 'Publicamos con dominio, SSL y Docker/Nginx cuando aplica.' },
        improve: { name: 'Improve', desc: 'Medimos resultados y mejoramos el sistema con datos reales.' },
      },
    },
    packages: {
      eyebrow: 'Paquetes',
      title: 'Elige por dónde empezar.',
      lead: 'El precio depende del alcance real, así que no publicamos tarifas genéricas. La auditoría es gratis y sin compromiso.',
      cta: 'Solicitar cotización',
      badge: 'Recomendado',
      items: {
        starter: {
          name: 'Starter Website',
          desc: 'Para presencia profesional: landing page, formularios y CTA de WhatsApp.',
          features: ['Diseño responsive', 'SEO básico y metadata', 'Formulario de contacto', 'CTA de WhatsApp'],
        },
        automation: {
          name: 'Business Automation',
          desc: 'Para automatizar reservas, leads, reportes o tareas repetitivas.',
          features: ['Automatización de flujos', 'Respuestas con IA', 'Integración de herramientas', 'Reportes automáticos'],
        },
        app: {
          name: 'Custom Web App',
          desc: 'Para sistemas internos, dashboards, inventario o CRM ligero.',
          features: ['App interna a medida', 'Base de datos propia', 'Roles y accesos', 'Dashboard incluido'],
        },
        infra: {
          name: 'Infrastructure & Deployment',
          desc: 'Para Docker, Nginx, CI/CD, backups, monitoreo y self-hosting.',
          features: ['Contenedores y CI/CD', 'SSL y dominio', 'Backups y monitoreo', 'Infraestructura propia'],
        },
      },
    },
    cta: {
      eyebrow: 'Siguiente paso',
      title: '¿Quieres saber qué parte de tu negocio se puede automatizar primero?',
      body: 'Agenda una auditoría gratis. Revisamos tu proceso actual y te damos una idea clara de qué sistema tendría más impacto.',
      email: 'Escribir por correo',
      github: 'Ver GitHub',
      bullets: [
        'Auditoría gratis y sin compromiso',
        'Revisamos tu proceso actual',
        'Te decimos qué automatizar primero',
      ],
      emailAlt: '¿Prefieres el correo? Escríbenos a',
      form: {
        title: 'Cuéntanos de tu negocio',
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Correo',
        emailPlaceholder: 'tu@correo.com',
        business: 'Negocio o rubro',
        businessPlaceholder: 'Restaurante, clínica, tienda…',
        message: '¿Qué te está costando más tiempo?',
        messagePlaceholder: 'Cuéntanos el proceso que más te pesa hoy.',
        submit: 'Solicitar auditoría gratis',
        sending: 'Enviando…',
        success: 'Recibido. Te escribimos a tu correo muy pronto.',
        errorEmail: 'Revisa que el correo esté bien escrito.',
        errorRate: 'Ya recibimos tu solicitud. Escríbenos por correo si es urgente.',
        errorGeneric: 'No se pudo enviar. Escríbenos directamente por correo.',
        required: 'Nombre y correo son obligatorios.',
        prefill: 'Me interesa el paquete {package}. Cuéntame cómo funcionaría para mi negocio.',
      },
    },
    footer: {
      tagline: 'Sistemas de software prácticos para negocios modernos.',
      services: 'Servicios',
      projects: 'Proyectos',
      contact: 'Contacto',
      links: 'Links',
      hosted: 'Hosted in itzgalaxy.com · Developed by PixlGalaxy',
      rights: '© 2026 PixlWorks. Sistemas de software prácticos para negocios modernos.',
    },
    chat: {
      open: 'Abrir asistente de PixlWorks',
      close: 'Cerrar asistente',
      title: 'Asistente PixlWorks',
      subtitle: 'Pregunta qué se puede automatizar en tu negocio',
      placeholder: 'Escribe tu pregunta…',
      send: 'Enviar',
      stop: 'Detener',
      clear: 'Nueva conversación',
      greeting:
        'Hola. Cuéntame de tu negocio y te digo qué sistema te ahorraría más tiempo. También puedo explicarte los servicios o el proceso.',
      suggestionsLabel: 'Prueba con',
      suggestions: [
        'Tengo un restaurante, ¿qué me recomiendas?',
        '¿Cómo automatizo mis reservas?',
        '¿Qué incluye la auditoría gratis?',
      ],
      remaining: 'Te quedan {n} mensajes en esta sesión.',
      offlineNotice:
        'El asistente está fuera de línea en este momento. Escríbenos por correo y te respondemos igual.',
      emailFallback: 'Ir al formulario',
      status: {
        ready: 'Asistente listo',
        not_loaded: 'Modelo no cargado',
        loading: 'Cargando modelo en Zaylar',
        thinking: 'Pensando',
        streaming: 'Respondiendo',
        offline: 'Asistente fuera de línea',
        busy: 'Asistente ocupado',
        rate_limited: 'Límite alcanzado',
        model_missing: 'Modelo no disponible',
        error: 'Error del asistente',
        idle: 'Asistente listo',
      },
      errors: {
        offline: 'No pude conectar con el servidor del modelo. Escríbenos por correo y te respondemos.',
        busy: 'El asistente está atendiendo otra consulta. Inténtalo en unos segundos.',
        rate_limited: 'Alcanzaste el límite de mensajes. Escríbenos por correo para seguir la conversación.',
        model_missing: 'El modelo no está disponible ahora mismo. Escríbenos por correo.',
        error: 'Algo falló al generar la respuesta. Inténtalo de nuevo.',
      },
    },
  },

  en: {
    meta: {
      title: 'PixlWorks | Software, Automation and AI for Businesses',
      description:
        'PixlWorks builds websites, web apps, dashboards, chatbots and AI automations for businesses that want to save time, capture more leads and operate better.',
    },
    nav: {
      solutions: 'Solutions',
      work: 'Work',
      process: 'Process',
      pricing: 'Pricing',
      contact: 'Contact',
      cta: 'Contact',
      byline: 'by PixlGalaxy',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      language: 'Change language',
    },
    hero: {
      badge: 'Software systems for real businesses',
      title: 'Practical software for businesses that want to move faster.',
      subtitle:
        'PixlWorks builds websites, internal systems, dashboards, AI automations and chatbots that help your business capture more leads, cut manual work and make better decisions.',
      ctaPrimary: 'Book a meeting',
      ctaSecondary: 'See solutions',
      cards: {
        lead: 'Lead captured',
        leadMeta: 'WhatsApp · 2 min ago',
        booking: 'Booking automated',
        bookingMeta: 'Confirmation sent',
        inventory: 'Inventory synced',
        inventoryMeta: '412 SKUs updated',
        dashboard: 'Dashboard updated',
        dashboardMeta: 'Sales +18% this week',
        ai: 'AI reply generated',
        aiMeta: 'Reviewed and sent',
      },
    },
    trust: {
      label: 'How we work',
      items: {
        speed: {
          title: 'Weeks, not months',
          desc: 'Closed scope and partial releases you can already use.',
        },
        ownership: {
          title: 'You own the code',
          desc: 'No locked licences, no dependency on a platform.',
        },
        infra: {
          title: 'Deployed properly',
          desc: 'Docker, SSL, backups and monitoring from day one.',
        },
        direct: {
          title: 'You talk to the developer',
          desc: 'No middlemen, no briefs lost in translation.',
        },
      },
    },
    pains: {
      eyebrow: 'The problem',
      title:
        'If your business still runs on spreadsheets, lost messages and manual steps, you are losing time and customers.',
      lead: 'These are the bottlenecks that show up again and again, and what we put in their place.',
      solutionLabel: 'What we do',
      items: {
        messages: {
          problem: 'Customers write on WhatsApp or Instagram and nobody replies in time.',
          solution:
            'A chatbot answers instantly, qualifies the customer and hands you the lead with their contact details.',
        },
        bookings: {
          problem: 'Bookings and appointments are handled by hand, one at a time.',
          solution:
            'A booking system with automatic confirmation and reminders, with nobody typing a thing.',
        },
        data: {
          problem: 'Important data lives in Excel, on paper and across three different apps.',
          solution:
            'One internal app where everything is recorded, searchable and reachable from a phone.',
        },
        visibility: {
          problem: 'There is no dashboard to see sales, leads or performance.',
          solution:
            'A panel with your real numbers, updated on its own, so you decide with data instead of instinct.',
        },
        website: {
          problem: 'The website does not turn visitors into customers.',
          solution:
            'A fast site with forms, WhatsApp CTA and tracking for every lead that comes in.',
        },
        repetition: {
          problem: 'The team repeats the same tasks every day that could be automated.',
          solution:
            'We automate the report, the email and the triage so your team does the work that matters.',
        },
      },
    },
    solutions: {
      eyebrow: 'Solutions',
      title: 'Solutions that fit how you actually operate.',
      lead: 'No fixed bundles. We start wherever your business is losing the most time or money.',
      items: {
        websites: {
          title: 'Websites that convert',
          desc: 'Professional presence with basic SEO, forms, WhatsApp CTA, testimonials and lead capture.',
        },
        apps: {
          title: 'Internal web apps',
          desc: 'Private apps for inventory, customers, reports, appointments, payments, tasks and operational tracking.',
        },
        ai: {
          title: 'AI workflow automation',
          desc: 'Automatic replies, message triage, report generation, summaries and data extraction.',
        },
        dashboards: {
          title: 'Dashboards & analytics',
          desc: 'Visibility into sales, leads, tickets, customers, productivity and bookings in one place.',
        },
        chatbots: {
          title: 'Customer chatbots',
          desc: 'Answer FAQs, capture data, qualify leads, book appointments and hand off to a human.',
        },
        devops: {
          title: 'DevOps & self-hosting',
          desc: 'Docker, Nginx, CI/CD, deployments, backups, monitoring and self-hosted setups you control.',
        },
      },
    },
    industries: {
      eyebrow: 'Use cases',
      title: 'Use cases by type of business',
      lead: 'The same technical building blocks, applied to what your industry needs every day.',
      items: {
        restaurants: { name: 'Restaurants', desc: 'Reservations, digital menu, orders and sales dashboard.' },
        clinics: { name: 'Clinics & dentists', desc: 'Appointments, reminders, patient history and intake forms.' },
        realestate: { name: 'Real estate', desc: 'Lead CRM, property catalog and automatic follow-up.' },
        workshops: { name: 'Auto repair shops', desc: 'Work orders, inventory and quotes.' },
        lawyers: { name: 'Lawyers', desc: 'Intake forms, case tracking and documents.' },
        retail: { name: 'Retail stores', desc: 'Inventory, sales and online catalog.' },
        construction: { name: 'Contractors', desc: 'Site reports, costs, tasks and photos.' },
        schools: { name: 'Schools & tutors', desc: 'Bookings, payments and student progress.' },
        startups: { name: 'Startups', desc: 'MVPs, dashboards, APIs and deployment pipelines.' },
      },
    },
    founder: {
      eyebrow: 'Who builds it',
      title: 'Built by a technical founder, not a generic agency.',
      body: 'PixlWorks is built by Fabrizio Gamboa, also known as PixlGalaxy, with over 5 years of technical experience across React, Node.js, Python, Docker, Linux servers, AI tools, virtualization, dashboards and full-stack systems, backed by innovation and tech-driven management.',
      note: 'You talk directly to the person writing the code and making the architectural calls. No middlemen, nothing lost in translation between your business and the solution.',
      stackLabel: 'Technical stack',
      stackGroups: {
        frontend: 'Frontend',
        backend: 'Backend',
        data: 'Data',
        infra: 'Infrastructure',
        ai: 'AI',
      },
      links: { resume: 'Resume', github: 'GitHub', itzgalaxy: 'ItzGalaxy' },
    },
    projects: {
      eyebrow: 'Selected builds',
      title: 'Public technical examples.',
      lead: 'Open projects that show the kind of systems we build. The code is there to review.',
      view: 'View project',
      items: {
        eagledocs: {
          desc: 'A React + Vite documentation platform with backend, database and AI engine integration.',
        },
        onpe: {
          desc: 'A real-time election results dashboard for Peru using React, TypeScript, FastAPI, Docker, Nginx and AI assistant features.',
        },
        itzgalaxy: {
          desc: 'Frontend built with React and Vite for the ItzGalaxy ecosystem, the infrastructure hosting these services.',
        },
      },
    },
    process: {
      eyebrow: 'Process',
      title: 'From messy process to working system.',
      lead: 'Five steps, no surprises. You know what ships at each one before we start.',
      steps: {
        audit: { name: 'Audit', desc: 'We find where time, leads or data are leaking out of your current operation.' },
        blueprint: { name: 'Blueprint', desc: 'We design a simple, measurable solution with a closed scope.' },
        build: { name: 'Build', desc: 'We build the web app, automation, dashboard or integration.' },
        deploy: { name: 'Deploy', desc: 'We ship it with domain, SSL and Docker/Nginx where it applies.' },
        improve: { name: 'Improve', desc: 'We measure results and improve the system with real data.' },
      },
    },
    packages: {
      eyebrow: 'Packages',
      title: 'Pick where to start.',
      lead: 'Pricing depends on real scope, so we do not publish generic rates. The audit is free and with no commitment.',
      cta: 'Request quote',
      badge: 'Recommended',
      items: {
        starter: {
          name: 'Starter Website',
          desc: 'For professional presence: landing page, forms and WhatsApp CTA.',
          features: ['Responsive design', 'Basic SEO and metadata', 'Contact form', 'WhatsApp CTA'],
        },
        automation: {
          name: 'Business Automation',
          desc: 'To automate bookings, leads, reports or repetitive tasks.',
          features: ['Workflow automation', 'AI-assisted replies', 'Tool integrations', 'Automatic reports'],
        },
        app: {
          name: 'Custom Web App',
          desc: 'For internal systems, dashboards, inventory or a light CRM.',
          features: ['Tailored internal app', 'Your own database', 'Roles and access', 'Dashboard included'],
        },
        infra: {
          name: 'Infrastructure & Deployment',
          desc: 'For Docker, Nginx, CI/CD, backups, monitoring and self-hosting.',
          features: ['Containers and CI/CD', 'SSL and domain', 'Backups and monitoring', 'Infrastructure you own'],
        },
      },
    },
    cta: {
      eyebrow: 'Next step',
      title: 'Want to know which part of your business can be automated first?',
      body: 'Book a free audit. We review your current process and give you a clear idea of which system would have the most impact.',
      email: 'Contact by email',
      github: 'View GitHub',
      bullets: [
        'Free audit, no commitment',
        'We review your current process',
        'We tell you what to automate first',
      ],
      emailAlt: 'Prefer email? Write to us at',
      form: {
        title: 'Tell us about your business',
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        business: 'Business or industry',
        businessPlaceholder: 'Restaurant, clinic, store…',
        message: 'What is costing you the most time?',
        messagePlaceholder: 'Tell us the process that weighs on you most today.',
        submit: 'Request free audit',
        sending: 'Sending…',
        success: 'Got it. We will email you back shortly.',
        errorEmail: 'Please check that the email is written correctly.',
        errorRate: 'We already received your request. Email us directly if it is urgent.',
        errorGeneric: 'Could not send. Please email us directly.',
        required: 'Name and email are required.',
        prefill: "I'm interested in the {package} package. Tell me how it would work for my business.",
      },
    },
    footer: {
      tagline: 'Practical software systems for modern businesses.',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      links: 'Links',
      hosted: 'Hosted in itzgalaxy.com · Developed by PixlGalaxy',
      rights: '© 2026 PixlWorks. Practical software systems for modern businesses.',
    },
    chat: {
      open: 'Open the PixlWorks assistant',
      close: 'Close assistant',
      title: 'PixlWorks assistant',
      subtitle: 'Ask what can be automated in your business',
      placeholder: 'Type your question…',
      send: 'Send',
      stop: 'Stop',
      clear: 'New conversation',
      greeting:
        'Hi. Tell me about your business and I will tell you which system would save you the most time. I can also walk you through the services or the process.',
      suggestionsLabel: 'Try',
      suggestions: [
        'I run a small clinic, what do you recommend?',
        'How would you automate my bookings?',
        'What does the free audit include?',
      ],
      remaining: 'You have {n} messages left in this session.',
      offlineNotice:
        'The assistant is offline right now. Email us and we will get back to you all the same.',
      emailFallback: 'Go to the form',
      status: {
        ready: 'Assistant ready',
        not_loaded: 'Model not loaded',
        loading: 'Loading model on Zaylar',
        thinking: 'Thinking',
        streaming: 'Streaming',
        offline: 'Assistant offline',
        busy: 'Assistant busy',
        rate_limited: 'Limit reached',
        model_missing: 'Model unavailable',
        error: 'Assistant error',
        idle: 'Assistant ready',
      },
      errors: {
        offline: 'I could not reach the model server. Email us and we will reply.',
        busy: 'The assistant is handling another request. Try again in a few seconds.',
        rate_limited: 'You reached the message limit. Email us to continue the conversation.',
        model_missing: 'The model is not available right now. Please email us.',
        error: 'Something failed while generating the answer. Please try again.',
      },
    },
  },
} as const

export type Lang = keyof typeof translations
