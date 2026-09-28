import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import type { Lang } from '../i18n/content'
import { useLang } from '../i18n/context'

const langs: { code: Lang; flag: string; name: string }[] = [
  { code: 'pt', flag: 'br', name: 'Português' },
  { code: 'en', flag: 'us', name: 'English' },
]

function LangSwitch() {
  const { lang, setLang, t } = useLang()
  const reduce = useReducedMotion()
  return (
    <div role="group" aria-label={t.nav.language} className="relative flex items-center rounded-full bg-fg/5 p-0.5">
      <motion.span
        aria-hidden
        initial={false}
        animate={{ x: lang === 'pt' ? '0%' : '100%' }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
        className="absolute left-0.5 top-0.5 size-11 rounded-full bg-bg shadow-[0_2px_8px_rgb(18_18_17/0.14)]"
      />
      {langs.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          aria-label={l.name}
          title={l.name}
          className="relative grid size-11 place-items-center rounded-full"
        >
          <img
            src={`https://flagcdn.com/w80/${l.flag}.png`}
            alt=""
            className={`relative rounded-full object-cover transition-all duration-300 ${
              lang === l.code ? 'size-7' : 'size-6 opacity-50 grayscale hover:opacity-90 hover:grayscale-0'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

export function Nav() {
  const reduce = useReducedMotion()
  const { t } = useLang()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 80))
  const visible = desktop || scrolled
  const links = [
    { label: t.nav.about, href: '#sobre' },
    { label: t.nav.experience, href: '#experiencia' },
    { label: t.nav.skills, href: '#habilidades' },
    { label: t.nav.projects, href: '#projetos' },
  ]

  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -16 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: reduce ? 0 : desktop ? 0.8 : 0.4, delay: desktop ? 0.6 : 0, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-4 z-50 px-4 ${visible ? '' : 'pointer-events-none'}`}
    >
      <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-3 rounded-full border border-line bg-bg/75 pl-6 pr-2.5 shadow-[0_8px_32px_rgb(18_18_17/0.06),inset_0_1px_0_rgb(255_255_255/0.6)] backdrop-blur-xl">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          Yuri Gabriel
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors duration-300 hover:bg-fg/5 hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <a
            href="#contato"
            className="hidden h-11 items-center whitespace-nowrap rounded-full bg-fg px-5 lg:inline-flex text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            {t.nav.contact}
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
