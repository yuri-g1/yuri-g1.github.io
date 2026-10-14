import { motion, useReducedMotion } from 'motion/react'
import { useLang } from '../i18n/context'
import { Reveal } from './Reveal'

const countries = ['us', 'ro', 'no', 'nl', 'br', 'gb']

export function About() {
  const { t } = useLang()
  const reduce = useReducedMotion()

  return (
    <section id="sobre" aria-label={t.about.title} className="relative isolate flex w-full scroll-mt-24 items-center overflow-hidden bg-fg text-bg md:aspect-[3/1]">
      <div role="img" aria-label={t.about.flagsLabel} className="absolute inset-0 -z-10 grid grid-cols-3 grid-rows-2">
        {countries.map((code, i) => (
          <motion.div
            key={code}
            initial={reduce ? false : { opacity: 0, scale: 1.15 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <img src={`https://flagcdn.com/w640/${code}.png`} alt="" loading="lazy" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-fg/85" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 py-16 text-center md:px-8 md:py-20">
        <Reveal>
          <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-6xl">{t.about.title}</h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 max-w-[48ch] text-balance text-lg font-medium leading-snug tracking-[-0.02em] md:mt-8 md:text-2xl">{t.about.text}</p>
        </Reveal>
      </div>
    </section>
  )
}
