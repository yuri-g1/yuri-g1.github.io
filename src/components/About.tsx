import { motion, useReducedMotion } from 'motion/react'
import { useLang } from '../i18n/context'
import { Reveal } from './Reveal'

const flags = [
  { code: 'br', side: 'left', top: '8%', rotate: -12 },
  { code: 'ro', side: 'left', top: '46%', rotate: 8 },
  { code: 'nl', side: 'left', top: '82%', rotate: -6 },
  { code: 'no', side: 'right', top: '8%', rotate: 10 },
  { code: 'us', side: 'right', top: '46%', rotate: -10 },
  { code: 'gb', side: 'right', top: '82%', rotate: 7 },
] as const

export function About() {
  const { t } = useLang()
  const reduce = useReducedMotion()

  return (
    <section id="sobre" className="relative mx-auto w-full max-w-[1400px] scroll-mt-24 px-4 md:px-8">
      <div role="img" aria-label={t.about.flagsLabel} className="pointer-events-none absolute inset-0 hidden lg:block">
        {flags.map((f, i) => (
          <motion.div
            key={f.code}
            initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: f.rotate }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: i * 0.08 }}
            className="absolute"
            style={{ top: f.top, [f.side]: i % 2 ? '6%' : '2%' }}
          >
            <div className={reduce ? '' : 'animate-[float_6s_ease-in-out_infinite]'} style={{ animationDelay: `${i * 0.7}s` }}>
              <img
                src={`https://flagcdn.com/w160/${f.code}.png`}
                alt=""
                className="h-16 w-24 rounded-xl object-cover shadow-[0_18px_40px_-18px_rgb(18_18_17/0.4)] outline outline-1 -outline-offset-1 outline-fg/10 saturate-[0.85] xl:h-20 xl:w-28"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative flex flex-col items-center text-center">
        <Reveal>
          <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">{t.about.title}</h2>
        </Reveal>
        <Reveal delay={0.06} className="flex flex-col items-center">
          <p className="mt-8 max-w-[40ch] text-xl font-medium leading-snug tracking-[-0.02em] md:mt-16 md:text-3xl">{t.about.text}</p>
        </Reveal>
      </div>
    </section>
  )
}
