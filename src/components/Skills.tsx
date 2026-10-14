import {
  ArrowCounterClockwiseIcon,
  ArrowsClockwiseIcon,
  ChatCircleTextIcon,
  CheckSquareIcon,
  CodeIcon,
  CompassIcon,
  CubeIcon,
  FileDocIcon,
  GlobeIcon,
  InfinityIcon,
  KanbanIcon,
  MagnifyingGlassIcon,
  PlugsConnectedIcon,
  PolygonIcon,
  RobotIcon,
  SealCheckIcon,
  SparkleIcon,
  SquaresFourIcon,
  TestTubeIcon,
  WebhooksLogoIcon,
  WheelchairIcon,
  XIcon,
  type Icon,
} from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/context'
import { Reveal } from './Reveal'

const icons: Record<string, string> = {
  HTML: 'html5',
  CSS: 'css',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  'React.js': 'react',
  'Next.js (SSR/SPA)': 'nextdotjs',
  Remix: 'remix',
  'Tailwind CSS': 'tailwindcss',
  'Three.js': 'threedotjs',
  GSAP: 'greensock',
  'Framer Motion': 'framer',
  'Mapbox GL JS': 'mapbox',
  'Node.js': 'nodedotjs',
  SQL: 'postgresql',
  'CMS (Contentful)': 'contentful',
  'OAuth 2.0': 'auth0',
  'Google Cloud Platform': 'googlecloud',
  Git: 'git',
  GitHub: 'github',
  Figma: 'figma',
  Vercel: 'vercel',
  npm: 'npm',
  Postman: 'postman',
  Lighthouse: 'lighthouse',
  'Google Search Console': 'googlesearchconsole',
  'Google Tag Manager': 'googletagmanager',
  'Chrome DevTools': 'googlechrome',
}

const brandIcons: Record<string, string> = {
  ...icons,
  MySQL: 'mysql',
  Airtable: 'airtable',
  Cloudflare: 'cloudflare',
}

const imageIcons: Record<string, string> = {
  Playwright: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg',
}

const glyphs: Record<string, Icon> = {
  'APIs REST': PlugsConnectedIcon,
  'REST APIs': PlugsConnectedIcon,
  'Micro Frontends': SquaresFourIcon,
  'Pacote Office': FileDocIcon,
  'Microsoft Office': FileDocIcon,
  Webhooks: WebhooksLogoIcon,
  RPA: RobotIcon,
  HTTP: GlobeIcon,
  SEO: MagnifyingGlassIcon,
  AEO: ChatCircleTextIcon,
  GEO: SparkleIcon,
  'Controle de Qualidade': SealCheckIcon,
  'Quality Control': SealCheckIcon,
  'Testes Funcionais': CheckSquareIcon,
  'Functional Testing': CheckSquareIcon,
  'Testes Regressivos': ArrowCounterClockwiseIcon,
  'Regression Testing': ArrowCounterClockwiseIcon,
  'Testes Exploratórios': CompassIcon,
  'Exploratory Testing': CompassIcon,
  'Testes de API REST': TestTubeIcon,
  'REST API Testing': TestTubeIcon,
  WCAG: WheelchairIcon,
  'Clean Code': CodeIcon,
  SOLID: CubeIcon,
  Scrum: ArrowsClockwiseIcon,
  Kanban: KanbanIcon,
  'CI/CD': InfinityIcon,
  'Design Patterns': PolygonIcon,
}

function SkillIcon({ name }: { name: string }) {
  const Glyph = glyphs[name]
  if (Glyph) return <Glyph size={16} weight="duotone" className="shrink-0 text-fg/70" />
  const src = imageIcons[name] ?? (brandIcons[name] && `https://cdn.simpleicons.org/${brandIcons[name]}`)
  return src ? <img src={src} alt="" className="size-4 shrink-0" /> : null
}

export function Skills() {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const items = t.skills.groups.flatMap((g) => g.items).filter((item) => icons[item])

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <section id="habilidades" className="mx-auto w-full max-w-[1400px] scroll-mt-24 px-4 md:px-8">
      <Reveal>
        <h2 className="text-center text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">{t.skills.title}</h2>
      </Reveal>

      <ul className="mt-12 flex flex-wrap justify-center gap-2 md:mt-16">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.03 }}
            className="group flex aspect-square w-[calc(25%-0.375rem)] flex-col items-center justify-center gap-2 rounded-2xl bg-[#fbfbfa] p-1.5 sm:gap-3 sm:p-3 text-center ring-1 ring-line sm:w-28 md:w-32"
          >
            <img
              src={`https://cdn.simpleicons.org/${icons[item]}`}
              alt=""
              className="size-7 sm:size-8 md:size-9"
            />
            <span className="line-clamp-2 text-[10px] font-medium leading-tight text-fg/70 sm:text-xs">{item}</span>
          </motion.li>
        ))}
      </ul>

      <p className="mt-10 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-lg font-medium underline decoration-fg/30 underline-offset-4 transition-colors duration-300 hover:decoration-fg"
        >
          {lang === 'pt' ? 'e muito mais...' : 'and much more...'}
        </button>
      </p>

      <dialog
        ref={dialog}
        aria-labelledby="skills-dialog-title"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        className="m-auto max-h-[90dvh] w-[min(76rem,calc(100%-2rem))] overflow-hidden rounded-3xl bg-[#fbfbfa] p-0 text-fg ring-1 ring-line backdrop:bg-fg/50 backdrop:backdrop-blur-sm open:animate-[modal-in_0.35s_cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-5 md:px-8">
          <h3 id="skills-dialog-title" className="text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
            {t.skills.title}
          </h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={lang === 'pt' ? 'Fechar' : 'Close'}
            className="grid size-10 shrink-0 place-items-center rounded-full ring-1 ring-line transition-colors duration-300 hover:bg-fg hover:text-bg"
          >
            <XIcon size={18} weight="bold" />
          </button>
        </div>
        <div className="max-h-[calc(90dvh-5rem)] gap-x-10 overflow-y-auto px-6 py-6 md:columns-2 md:px-8 lg:columns-3">
          {t.skills.groups.map((g) => (
            <div key={g.name} className="mb-7 break-inside-avoid">
              <h4 className="text-sm text-muted">{g.name}</h4>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <li key={item} className="inline-flex items-center gap-2 rounded-full bg-bg px-2.5 py-1 text-[13px] font-medium ring-1 ring-line">
                    <SkillIcon name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </dialog>
    </section>
  )
}
