import { motion, useReducedMotion } from 'motion/react'
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

export function Skills() {
  const { t, lang } = useLang()
  const reduce = useReducedMotion()
  const items = t.skills.groups.flatMap((g) => g.items).filter((item) => icons[item])

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
        <a
          href={lang === 'pt' ? '/cv/Yuri_Gabriel_Resume_PT.pdf' : '/cv/Yuri_Gabriel_Resume_EN.pdf'}
          target="_blank"
          rel="noreferrer"
          className="text-lg font-medium underline decoration-fg/30 underline-offset-4 transition-colors duration-300 hover:decoration-fg"
        >
          {lang === 'pt' ? 'e muito mais...' : 'and much more...'}
        </a>
      </p>
    </section>
  )
}
