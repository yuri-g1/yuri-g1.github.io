export type Lang = "pt" | "en";

export type Project = {
  title: string;
  description: string;
  stack: { name: string; slug: string }[];
  details: string;
  gallery: string[];
  href: string;
  image?: string;
  status?: string;
};

export type Content = {
  meta: { title: string; description: string };
  nav: {
    about: string;
    experience: string;
    projects: string;
    skills: string;
    contact: string;
    language: string;
  };
  hero: {
    role: string;
    photoAlt: string;
    facts: { label: string; value: string }[];
    cv: string;
    cvLabel: string;
    email: string;
    scroll: string;
  };
  about: { title: string; text: string; flagsLabel: string };
  services: { title: string; items: { title: string; description: string }[] };
  experience: {
    title: string;
    sub: string;
    jobs: {
      org: string;
      role: string;
      place: string;
      dates: string;
      bullets: string[];
      logo?: string;
      logoPadding?: string;
      country: string;
    }[];
    logoAlt: string;
  };
  projects: {
    title: string;
    imageAlt: string;
    stackLabel: string;
    codeLabel: string;
    items: Project[];
  };
  skills: { title: string; groups: { name: string; items: string[] }[] };
  education: {
    title: string;
    eduLabel: string;
    certLabel: string;
    langLabel: string;
    edu: { title: string; detail: string; dates: string }[];
    certs: { title: string; issuer: string }[];
    languages: { name: string; level: string }[];
  };
  github: {
    title: string;
    repos: string;
    languages: string;
    soon: string;
    empty: string;
    cta: string;
  };
  contact: {
    title: string;
    sub: string;
    cta: string;
    copy: string;
    copied: string;
    cv: string;
    cvLabel: string;
    photoAlt: string;
  };
  footer: { top: string };
};

const GITHUB = "https://github.com/yuri-g1";

export const content: Record<Lang, Content> = {
  pt: {
    meta: {
      title: "Yuri Gabriel | Desenvolvedor de software",
      description:
        "Yuri Gabriel, desenvolvedor de software: front-end, back-end, APIs, bancos de dados e QA.",
    },
    nav: {
      about: "Sobre",
      experience: "Experiência",
      projects: "Projetos",
      skills: "Habilidades",
      contact: "Fale comigo",
      language: "Idioma",
    },
    hero: {
      role: "Desenvolvedor de software e Quality Assurance",
      photoAlt: "Foto de Yuri Gabriel",
      facts: [
        { label: "Experiência", value: "3+ anos" },
        { label: "Foco", value: "Front-end, Back-end e QA" },
        { label: "Idiomas", value: "Português nativo, Inglês fluente" },
        { label: "Modelo", value: "Remoto ou presencial" },
      ],
      cv: "/cv/Yuri_Gabriel_Resume_PT.pdf",
      cvLabel: "Baixar CV",
      email: "E-mail",
      scroll: "Role para ver mais",
    },
    about: {
      title: "Sobre mim",
      flagsLabel:
        "Bandeiras de Brasil, Romênia, Noruega, Holanda, Estados Unidos e Reino Unido",
      text: "Sou desenvolvedor com atuação paralela em Quality Assurance. Há 3 anos entrego landing pages e produtos completos para empresas internacionais na Romênia, na Noruega, na Holanda e em outros países. Nesse período, também trabalhei bastante com desenvolvimento e manutenção de sistemas, integração de APIs e modelagem de bancos de dados.",
    },
    services: {
      title: "O que eu faço",
      items: [
        {
          title: "Landing pages completas",
          description:
            "Do design à implementação, com arquitetura de front-end escalável em Next.js, React e TypeScript.",
        },
        {
          title: "UI/UX no Figma",
          description:
            "Interfaces personalizadas e pensadas para o público de cada produto.",
        },
        {
          title: "Performance e SEO",
          description:
            "Lighthouse, SEO, AEO e GEO com Search Console e Tag Manager.",
        },
        {
          title: "Animação 3D na web",
          description: "Experiências interativas com Three.js e GSAP.",
        },
        {
          title: "Backends em Node.js",
          description: "APIs REST e pequenos serviços para dar vida ao front.",
        },
        {
          title: "QA e testes de API",
          description:
            "Playwright, testes de estresse, permissões e tempos de resposta.",
        },
      ],
    },
    experience: {
      title: "Experiência",
      logoAlt: "Logo da",
      sub: "Trabalhei com empresas na Romênia, na Noruega e em outros países, cuidando de produtos do design ao deploy. Construí interfaces para o setor financeiro e para educação, testei APIs e sistemas de ponta a ponta e mantive tudo rápido, acessível e responsivo em qualquer dispositivo.",
      jobs: [
        {
          org: "Vasonim",
          logo: "/logos/vasonim.png",
          country: "ro",
          role: "Desenvolvedor Fullstack",
          place: "Romênia",
          dates: "Jan 2023 - Ago 2026",
          bullets: [
            "Lidero a criação completa de landing pages e soluções tecnológicas para clientes, do design até a implementação.",
            "Designs de UI/UX personalizados e arquiteturas de front-end escaláveis em Next.js, React e TypeScript.",
            "Validações rigorosas de performance (Lighthouse) e responsividade em diferentes breakpoints e dispositivos.",
            "Otimizações completas de SEO, AEO e GEO com Google Search Console e Google Tag Manager.",
            "Projetos que vão de arquiteturas web simples a animações 3D complexas com Three.js e GSAP, além de pequenos backends em Node.js.",
          ],
        },
        {
          org: "Symetrisk",
          logo: "/logos/symetrisk.png",
          country: "no",
          role: "Desenvolvedor Front-end",
          place: "Noruega",
          dates: "Fev 2025 - Jun 2026",
          bullets: [
            "Frontend principal feito por mim: três interfaces personalizadas para bancos, mutuários de empréstimo e avaliadores de crédito.",
            "Busca e transformação de dados do backend via API para calcular e exibir métricas financeiras precisas.",
            "Responsividade mobile em todas as plataformas, apesar do foco desktop-first.",
            "Edição de vídeos simples para demonstrações do app em eventos e reuniões.",
            "Testes de API de permissões e tempos de resposta, validando os dados e a lógica de cálculo.",
          ],
        },
        {
          org: "Langory",
          logo: "/logos/langory.png?v=5",
          country: "no",
          role: "Quality Assurance & Desenvolvedor Front-end",
          place: "Noruega",
          dates: "Out 2024 - Out 2025",
          bullets: [
            "Correção de bugs de responsividade em toda a plataforma e redesign da antiga landing page.",
            "Redesign de interfaces por público: experiências distintas para crianças de acordo com a idade e para professores de acordo com o tema.",
            "Validação de histórias infantis geradas por IA quanto a coerência, adequação à idade e precisão das traduções.",
            "Testes de API e de estresse focados em permissões e limites do sistema, acompanhando gargalos de performance.",
          ],
        },
      ],
    },
    projects: {
      title: "Projetos selecionados",
      imageAlt: "Imagem do projeto",
      stackLabel: "Tecnologias",
      codeLabel: "Ver no GitHub",
      items: [
        {
          title: "yuri-g1.github.io",
          description:
            "Este portfólio. Página única bilíngue com animações, bento grids e dados vindos de uma API própria.",
          stack: [
            { name: "React", slug: "react" },
            { name: "TypeScript", slug: "typescript" },
            { name: "Tailwind CSS", slug: "tailwindcss" },
            { name: "Motion", slug: "framer" },
          ],
          details:
            "Feito do zero com React 19 e Vite, com conteúdo em português e inglês, animações com Motion e layout pensado primeiro para o celular.",
          gallery: [
            "https://picsum.photos/seed/yuri-portfolio-a/900/600",
            "https://picsum.photos/seed/yuri-portfolio-b/900/600",
          ],
          href: `${GITHUB}/yuri-g1.github.io`,
          image: "https://picsum.photos/seed/yuri-portfolio-desk/1400/1000",
        },
        {
          title: "GitHub Stats API",
          description:
            "API em Node que agrega repositórios e linguagens do GitHub para alimentar este site.",
          stack: [
            { name: "Node.js", slug: "nodedotjs" },
            { name: "Express", slug: "express" },
            { name: "GitHub", slug: "github" },
          ],
          details:
            "Serviço em Node que consulta a API do GitHub, agrega repositórios e linguagens e entrega um JSON simples para o portfólio.",
          gallery: [
            "https://picsum.photos/seed/yuri-api-a/900/600",
            "https://picsum.photos/seed/yuri-api-b/900/600",
          ],
          href: GITHUB,
          image: "https://picsum.photos/seed/yuri-api-server/900/600",
          status: "Em desenvolvimento",
        },
        {
          title: "Sistema de agendamento logístico",
          description:
            "Sistema de agendamento para um cliente de logística, construído em uma plataforma low-code. Usuários de vários países agendam entregas de caminhões nos armazéns por um formulário personalizado, que coleta os dados essenciais logo de início e deixa todo o processo de entrada mais rápido.",
          stack: [],
          details:
            "Sistema de agendamento para um cliente de logística, construído em uma plataforma low-code. Usuários de vários países agendam entregas de caminhões nos armazéns por um formulário personalizado, que coleta os dados essenciais logo de início e deixa todo o processo de entrada mais rápido.",
          gallery: ["/logistics-scheduling.png"],
          href: GITHUB,
        },
        {
          title: "Validador SAP",
          description: "Automação em Node.js + Playwright que valida notas fiscais no SAP usando OCR (Tesseract.js) e pdftotext.",
          stack: [],
          details: "Automação em Node.js + Playwright que valida notas fiscais no SAP usando OCR (Tesseract.js) e pdftotext.",
          gallery: [],
          href: GITHUB,
        },
        {
          title: "Próximo projeto",
          description: "Em construção. Acompanhe o progresso no GitHub.",
          stack: [],
          details:
            "O próximo projeto vai aparecer aqui assim que for publicado.",
          gallery: [],
          href: GITHUB,
        },
      ],
    },
    skills: {
      title: "Habilidades",
      groups: [
        {
          name: "Frontend",
          items: [
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React.js",
            "Next.js (SSR/SPA)",
            "Remix",
            "Micro Frontends",
            "Tailwind CSS",
            "Three.js",
            "GSAP",
            "Framer Motion",
            "Mapbox GL JS",
          ],
        },
        {
          name: "Backend",
          items: [
            "Node.js",
            "APIs REST",
            "SQL",
            "CMS (Contentful)",
            "OAuth 2.0",
            "Google Cloud Platform",
          ],
        },
        {
          name: "Ferramentas",
          items: [
            "Git",
            "GitHub",
            "Figma",
            "Vercel",
            "npm",
            "Pacote Office",
            "Postman",
          ],
        },
        {
          name: "Performance",
          items: [
            "Lighthouse",
            "SEO",
            "AEO",
            "GEO",
            "Google Search Console",
            "Google Tag Manager",
          ],
        },
        {
          name: "Quality Assurance",
          items: [
            "Controle de Qualidade",
            "Testes de API REST",
            "Playwright",
            "Chrome DevTools",
            "WCAG",
          ],
        },
        {
          name: "Boas práticas",
          items: [
            "Clean Code",
            "SOLID",
            "Scrum",
            "Kanban",
            "CI/CD",
            "Design Patterns",
          ],
        },
      ],
    },
    education: {
      title: "Formação e certificações",
      eduLabel: "Formação acadêmica",
      certLabel: "Certificações",
      langLabel: "Idiomas",
      edu: [
        {
          title: "Bacharelado em Engenharia de Software",
          detail: "Cursando, Brasil",
          dates: "2026 - 2030",
        },
        {
          title: "Sociedade Brasileira de Cultura Inglesa (SBCI)",
          detail: "Inglês, nível Plus 4",
          dates: "Jul 2022 - Dez 2027",
        },
      ],
      certs: [
        { title: "Introduction to Cybersecurity", issuer: "Cisco" },
        {
          title: "Model Context Protocol: Advanced Topics",
          issuer: "Anthropic",
        },
        { title: "Claude Code 101", issuer: "Anthropic" },
        { title: "Building Effective Human-Agent Teams", issuer: "Anthropic" },
        { title: "AI Fluency: Framework & Foundations", issuer: "Anthropic" },
      ],
      languages: [
        { name: "Português", level: "Nativo" },
        { name: "Inglês", level: "Fluente" },
      ],
    },
    github: {
      title: "No GitHub",
      repos: "Repositórios públicos",
      languages: "Linguagens mais usadas",
      soon: "Em breve",
      empty: "As estatísticas aparecem aqui assim que a API estiver no ar.",
      cta: "Ver GitHub",
    },
    contact: {
      title: "Vamos construir algo juntos?",
      sub: "Aberto a projetos freelance e novas oportunidades. Respondo rápido.",
      cta: "Fale comigo",
      copy: "Copiar e-mail",
      copied: "Copiado",
      cv: "/cv/Yuri_Gabriel_Resume_PT.pdf",
      cvLabel: "Baixar CV",
      photoAlt: "Foto de Yuri Gabriel",
    },
    footer: { top: "Voltar ao topo" },
  },
  en: {
    meta: {
      title: "Yuri Gabriel | Software Developer",
      description:
        "Yuri Gabriel, software developer: front-end, back-end, APIs, databases and QA.",
    },
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Get in touch",
      language: "Language",
    },
    hero: {
      role: "Software developer and Quality Assurance",
      photoAlt: "Photo of Yuri Gabriel",
      facts: [
        { label: "Experience", value: "3+ years" },
        { label: "Focus", value: "Front-end, Back-end and QA" },
        { label: "Languages", value: "Native Portuguese, fluent English" },
        { label: "Work setup", value: "Remote or on-site" },
      ],
      cv: "/cv/Yuri_Gabriel_Resume_EN.pdf",
      cvLabel: "Download CV",
      email: "Email",
      scroll: "Scroll to see more",
    },
    about: {
      title: "About me",
      flagsLabel:
        "Flags of Brazil, Romania, Norway, the Netherlands, the United States and the United Kingdom",
      text: "I'm a developer with a parallel track in Quality Assurance. For 3 years I've shipped complete landing pages and products for international companies in Romania, Norway, the Netherlands and beyond. Along the way, I've also done a lot of system development and maintenance, API integration and database modeling.",
    },
    services: {
      title: "What I do",
      items: [
        {
          title: "Complete landing pages",
          description:
            "From design to implementation, with scalable front-end architecture in Next.js, React and TypeScript.",
        },
        {
          title: "UI/UX in Figma",
          description:
            "Custom interfaces designed around each product audience.",
        },
        {
          title: "Performance & SEO",
          description:
            "Lighthouse, SEO, AEO and GEO with Search Console and Tag Manager.",
        },
        {
          title: "3D web animation",
          description: "Interactive experiences with Three.js and GSAP.",
        },
        {
          title: "Node.js backends",
          description: "REST APIs and small services that power the front end.",
        },
        {
          title: "QA & API testing",
          description:
            "Playwright, stress testing, permissions and response times.",
        },
      ],
    },
    experience: {
      title: "Experience",
      logoAlt: "Logo of",
      sub: "I have worked with companies in Romania, Norway and other countries, owning products from design to deploy. I built interfaces for finance and education, tested APIs and systems end to end, and kept everything fast, accessible and responsive on any device.",
      jobs: [
        {
          org: "Vasonim",
          logo: "/logos/vasonim.png",
          country: "ro",
          role: "Fullstack Developer",
          place: "Romania",
          dates: "Jan 2023 - Aug 2026",
          bullets: [
            "Lead the end-to-end creation of landing pages and technology solutions for clients, from design through implementation.",
            "Custom, user-focused UI/UX and scalable front-end architectures in Next.js, React and TypeScript.",
            "Rigorous performance (Lighthouse) and responsiveness validation across breakpoints and devices.",
            "Comprehensive SEO, AEO and GEO optimization with Google Search Console and Google Tag Manager.",
            "Projects ranging from simple web architectures to complex 3D animations with Three.js and GSAP, plus small Node.js backends.",
          ],
        },
        {
          org: "Symetrisk",
          logo: "/logos/symetrisk.png",
          country: "no",
          role: "Front-end Developer",
          place: "Norway",
          dates: "Feb 2025 - Jun 2026",
          bullets: [
            "Built the core front end: three tailored interfaces for banks, loan borrowers and credit scorers.",
            "Fetched and transformed backend data via API to calculate and display accurate financial metrics.",
            "Mobile responsiveness across all platforms despite a desktop-first focus.",
            "Simple video editing for app demos at events and meetings.",
            "API testing for permissions and response times, validating data correctness and calculation logic.",
          ],
        },
        {
          org: "Langory",
          logo: "/logos/langory.png?v=5",
          country: "no",
          role: "Quality Assurance & Front-end Developer",
          place: "Norway",
          dates: "Oct 2024 - Oct 2025",
          bullets: [
            "Fixed UI responsiveness bugs across the platform and redesigned the old landing page.",
            "Redesigned interfaces by audience: distinct experiences for children by age and for teachers by theme.",
            "Validated AI-generated children's stories for coherence, age-appropriateness and accurate translations.",
            "API and stress testing focused on permissions and system limits, tracking performance bottlenecks.",
          ],
        },
      ],
    },
    projects: {
      title: "Selected projects",
      imageAlt: "Project image",
      stackLabel: "Tech stack",
      codeLabel: "View on GitHub",
      items: [
        {
          title: "yuri-g1.github.io",
          description:
            "This portfolio. A bilingual single page with animation, bento grids and data from its own API.",
          stack: [
            { name: "React", slug: "react" },
            { name: "TypeScript", slug: "typescript" },
            { name: "Tailwind CSS", slug: "tailwindcss" },
            { name: "Motion", slug: "framer" },
          ],
          details:
            "Built from scratch with React 19 and Vite, with Portuguese and English content, Motion animations and a mobile-first layout.",
          gallery: [
            "https://picsum.photos/seed/yuri-portfolio-a/900/600",
            "https://picsum.photos/seed/yuri-portfolio-b/900/600",
          ],
          href: `${GITHUB}/yuri-g1.github.io`,
          image: "https://picsum.photos/seed/yuri-portfolio-desk/1400/1000",
        },
        {
          title: "GitHub Stats API",
          description:
            "A Node API that aggregates GitHub repositories and languages to power this site.",
          stack: [
            { name: "Node.js", slug: "nodedotjs" },
            { name: "Express", slug: "express" },
            { name: "GitHub", slug: "github" },
          ],
          details:
            "A Node service that queries the GitHub API, aggregates repositories and languages and returns a simple JSON for the portfolio.",
          gallery: [
            "https://picsum.photos/seed/yuri-api-a/900/600",
            "https://picsum.photos/seed/yuri-api-b/900/600",
          ],
          href: GITHUB,
          image: "https://picsum.photos/seed/yuri-api-server/900/600",
          status: "In progress",
        },
        {
          title: "Logistics Scheduling System",
          description:
            "A scheduling system for a logistics client, built on a low-code platform. International users book truck deliveries to warehouses through a customized form that collects the essential data upfront, streamlining and speeding up the whole intake process.",
          stack: [],
          details:
            "A scheduling system for a logistics client, built on a low-code platform. International users book truck deliveries to warehouses through a customized form that collects the essential data upfront, streamlining and speeding up the whole intake process.",
          gallery: ["/logistics-scheduling.png"],
          href: GITHUB,
        },
        {
          title: "SAP Validator",
          description: "Node.js + Playwright automation that validates invoices in SAP using OCR (Tesseract.js) and pdftotext.",
          stack: [],
          details: "Node.js + Playwright automation that validates invoices in SAP using OCR (Tesseract.js) and pdftotext.",
          gallery: [],
          href: GITHUB,
        },
        {
          title: "Next project",
          description: "Under construction. Follow the progress on GitHub.",
          stack: [],
          details:
            "The next project will show up here as soon as it is published.",
          gallery: [],
          href: GITHUB,
        },
      ],
    },
    skills: {
      title: "Skills",
      groups: [
        {
          name: "Frontend",
          items: [
            "HTML",
            "CSS",
            "JavaScript",
            "TypeScript",
            "React.js",
            "Next.js (SSR/SPA)",
            "Remix",
            "Micro Frontends",
            "Tailwind CSS",
            "Three.js",
            "GSAP",
            "Framer Motion",
            "Mapbox GL JS",
          ],
        },
        {
          name: "Backend",
          items: [
            "Node.js",
            "REST APIs",
            "SQL",
            "CMS (Contentful)",
            "OAuth 2.0",
            "Google Cloud Platform",
          ],
        },
        {
          name: "Tooling",
          items: [
            "Git",
            "GitHub",
            "Figma",
            "Vercel",
            "npm",
            "Microsoft Office",
            "Postman",
          ],
        },
        {
          name: "Performance",
          items: [
            "Lighthouse",
            "SEO",
            "AEO",
            "GEO",
            "Google Search Console",
            "Google Tag Manager",
          ],
        },
        {
          name: "Quality Assurance",
          items: [
            "Quality Control",
            "REST API Testing",
            "Playwright",
            "Chrome DevTools",
            "WCAG",
          ],
        },
        {
          name: "Practices",
          items: [
            "Clean Code",
            "SOLID",
            "Scrum",
            "Kanban",
            "CI/CD",
            "Design Patterns",
          ],
        },
      ],
    },
    education: {
      title: "Education & certifications",
      eduLabel: "Academic",
      certLabel: "Certifications",
      langLabel: "Languages",
      edu: [
        {
          title: "B.S. in Software Engineering",
          detail: "In progress, Brazil",
          dates: "2026 - 2030",
        },
        {
          title: "Sociedade Brasileira de Cultura Inglesa (SBCI)",
          detail: "English, Level Plus 4",
          dates: "Jul 2022 - Dec 2027",
        },
      ],
      certs: [
        { title: "Introduction to Cybersecurity", issuer: "Cisco" },
        {
          title: "Model Context Protocol: Advanced Topics",
          issuer: "Anthropic",
        },
        { title: "Claude Code 101", issuer: "Anthropic" },
        { title: "Building Effective Human-Agent Teams", issuer: "Anthropic" },
        { title: "AI Fluency: Framework & Foundations", issuer: "Anthropic" },
      ],
      languages: [
        { name: "Portuguese", level: "Native" },
        { name: "English", level: "Fluent" },
      ],
    },
    github: {
      title: "On GitHub",
      repos: "Public repositories",
      languages: "Most used languages",
      soon: "Coming soon",
      empty: "Stats will show up here as soon as the API is live.",
      cta: "View GitHub",
    },
    contact: {
      title: "Let's build something together?",
      sub: "Open to freelance projects and new opportunities. I reply fast.",
      cta: "Get in touch",
      copy: "Copy email",
      copied: "Copied",
      cv: "/cv/Yuri_Gabriel_Resume_EN.pdf",
      cvLabel: "Download CV",
      photoAlt: "Photo of Yuri Gabriel",
    },
    footer: { top: "Back to top" },
  },
};
