import { motion, useReducedMotion } from 'motion/react'
import { useLang } from '../i18n/context'
import { Reveal } from './Reveal'

const issuerLogo: Record<string, string> = { Cisco: 'cisco', Anthropic: 'anthropic' }
const langFlag = ['br', 'us']

export function Education() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const e = t.education

  return (
    <section className="mx-auto w-full max-w-[1400px] px-4 md:px-8">
      <Reveal>
        <h2 className="max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">{e.title}</h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 lg:grid-cols-12">
        <Reveal className="rounded-3xl bg-[#fbfbfa] p-6 ring-1 ring-line md:p-10 lg:col-span-8">
          <h3 className="text-sm font-medium text-muted">{e.eduLabel}</h3>
          <ul className="mt-8 flex flex-col gap-10">
            {e.edu.map((item) => (
              <li key={item.title} className="flex flex-col gap-2">
                <p className="w-fit rounded-full bg-accent px-2.5 py-0.5 font-mono text-sm text-fg">{item.dates}</p>
                <div>
                  <p className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-balance">{item.title}</p>
                  <p className="mt-2 text-muted">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.06} className="rounded-3xl bg-[#fbfbfa] p-6 ring-1 ring-line md:p-10 lg:col-span-4">
          <h3 className="text-sm font-medium text-muted">{e.langLabel}</h3>
          <ul className="mt-8 flex flex-col gap-6">
            {e.languages.map((l, i) => (
              <li key={l.name} className="flex items-center gap-4">
                <img src={`https://flagcdn.com/w80/${langFlag[i]}.png`} alt="" className="size-11 shrink-0 rounded-full object-cover ring-2 ring-fg/10" />
                <div className="flex flex-col">
                  <span className="text-3xl font-semibold leading-none tracking-[-0.04em]">{l.name}</span>
                  <span className="mt-1.5 text-sm font-medium text-muted">{l.level}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="lg:col-span-12">
          <h3 className="mb-3 mt-6 text-sm font-medium text-muted">{e.certLabel}</h3>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-5 [&>li:last-child]:col-span-2 lg:[&>li:last-child]:col-span-1">
            {e.certs.map((c, i) => (
              <motion.li
                key={c.title}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-36 flex-col justify-between gap-6 rounded-3xl bg-[#fbfbfa] p-4 ring-1 ring-line sm:p-6 lg:min-h-44 lg:gap-8"
              >
                <div className="flex items-center gap-3 text-sm font-medium">
                  {issuerLogo[c.issuer] && <span className="grid size-10 place-items-center rounded-xl bg-surface"><img src={`https://cdn.simpleicons.org/${issuerLogo[c.issuer]}/121211`} alt="" className="size-5" /></span>}
                  {c.issuer}
                </div>
                <p className="text-base font-semibold leading-snug tracking-tight sm:text-lg">{c.title}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
