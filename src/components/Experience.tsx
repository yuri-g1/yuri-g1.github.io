import { PlusIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/context'
import { Reveal } from './Reveal'

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return desktop
}

export function Experience() {
  const { t } = useLang()
  const reduce = useReducedMotion()
  const desktop = useIsDesktop()
  const pinned = desktop && !reduce
  const jobs = t.experience.jobs
  const [open, setOpen] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!pinned) return
    setOpen(Math.min(jobs.length - 1, Math.floor(v * jobs.length)))
  })

  return (
    <section
      id="experiencia"
      ref={ref}
      className="relative scroll-mt-24"
      style={pinned ? { height: `${jobs.length * 80 + 40}vh` } : undefined}
    >
      <div className={pinned ? 'sticky top-0 flex min-h-[100dvh] items-center pb-10 pt-32' : 'py-24 md:py-32'}>
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-14 px-4 md:px-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:order-2 lg:col-span-4 lg:text-right">
            <Reveal>
              <h2 className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-6xl xl:text-7xl">
                {t.experience.title}
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted lg:ml-auto">{t.experience.sub}</p>
              {pinned && (
                <ol aria-hidden className="mt-10 flex gap-2 lg:justify-end">
                  {jobs.map((j, i) => (
                    <li key={j.org} className={`h-1 rounded-full transition-all duration-500 ${i === open ? 'w-10 bg-fg' : 'w-4 bg-fg/15'}`} />
                  ))}
                </ol>
              )}
            </Reveal>
          </div>

          <ol className="flex flex-col gap-3 lg:order-1 lg:col-span-8">
            {jobs.map((job, i) => {
              const isOpen = open === i
              return (
                <li key={job.org}>
                  <Reveal delay={i * 0.06}>
                    <div
                      className={`overflow-hidden rounded-3xl bg-[#fbfbfa] ring-1 ring-line transition-shadow duration-500 ${
                        isOpen ? 'shadow-[0_24px_60px_-30px_rgb(18_18_17/0.25)]' : ''
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-6 p-5 text-left md:p-6"
                      >
                        <div className="flex items-center gap-4 md:gap-5">
                          <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-bg ring-1 ring-line md:size-16">
                            {job.logo ? (
                              <img src={job.logo} alt={`${t.experience.logoAlt} ${job.org}`} className={`h-full w-full object-contain ${job.logoPadding ?? 'p-3'}`} />
                            ) : (
                              <span aria-hidden className="text-xl font-semibold text-fg/30">
                                {job.org[0]}
                              </span>
                            )}
                          </span>
                          <div className="flex flex-col gap-1.5">
                            <span className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.04em] md:text-4xl">
                              {job.org}
                              <img
                                src={`https://flagcdn.com/w40/${job.country}.png`}
                                alt={job.place}
                                title={job.place}
                                className="h-4 w-6 rounded-[3px] object-cover outline outline-1 -outline-offset-1 outline-fg/10"
                              />
                            </span>
                            <span className="font-medium">{job.role}</span>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-4">
                          <span className="hidden font-mono text-sm text-muted sm:block">{job.dates}</span>
                          <motion.span
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                            className={`grid size-10 place-items-center rounded-full ${isOpen ? 'bg-accent' : 'bg-fg/5'}`}
                          >
                            <PlusIcon size={16} weight="bold" />
                          </motion.span>
                        </div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="px-5 pb-6 md:px-6">
                              <p className="mb-5 font-mono text-sm text-muted sm:hidden">{job.dates}</p>
                              <ul className="grid gap-3 border-t border-line pt-5 md:grid-cols-2 md:gap-x-10">
                                {job.bullets.map((b) => (
                                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                                    <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-fg/40" />
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
