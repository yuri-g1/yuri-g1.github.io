import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { GITHUB_URL, LINKEDIN_URL } from '../data'
import { useLang } from '../i18n/context'
import { CvButton } from './CvButton'
import { MailButton } from './MailButton'
import { HeroPhoto } from './HeroPhoto'

const ease = [0.16, 1, 0.3, 1] as const
const name = ['Yuri', 'Gabriel']

export function Hero() {
  const reduce = useReducedMotion()
  const { t, lang } = useLang()
  const { scrollY } = useScroll()
  const socials = (
    <>
              {[
                { href: LINKEDIN_URL, label: 'LinkedIn', Icon: LinkedinLogoIcon, external: true },
                { href: GITHUB_URL, label: 'GitHub', Icon: GithubLogoIcon, external: true },
              ].map(({ href, label, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="grid size-12 place-items-center rounded-full border border-line bg-bg transition-colors duration-300 hover:bg-fg hover:text-bg"
                >
                  <Icon size={20} weight="fill" />
                </a>
              ))}
        <MailButton className="grid size-12 place-items-center rounded-full border border-line bg-bg transition-colors duration-300 hover:bg-fg hover:text-bg" />
    </>
  )
  const cueOpacity = useTransform(scrollY, [0, 120], [1, 0])

  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-[100dvh] w-full max-w-[1400px] grid-cols-1 items-center gap-6 px-4 pb-12 pt-24 lg:pb-16 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-24"
    >
      <div className="text-center lg:col-span-7 lg:text-left">
        <h1 className="flex flex-wrap justify-center gap-x-[0.22em] lg:justify-start font-semibold leading-[0.9] tracking-[-0.06em] text-[2.5rem] lg:text-[clamp(3rem,6.6vw,6.75rem)]">
          {name.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="mt-3 md:mt-10"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={lang}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              className="mx-auto max-w-[22ch] text-xl lg:mx-0 lg:text-[clamp(1.5rem,3.4vw,3rem)] font-medium leading-tight tracking-[-0.035em]"
            >
              {t.hero.role}
            </motion.p>
          </AnimatePresence>
          <div className="mt-5 flex items-center justify-center gap-3 lg:hidden">
            {socials}
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease }}
          className="mt-8 md:mt-14"
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
            {t.hero.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="mt-1 text-lg font-medium tracking-tight">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-14 flex flex-col items-center gap-4 lg:mt-8 lg:flex-row lg:gap-3">
            <CvButton label={t.hero.cvLabel} />
            <motion.a href="#sobre" style={{ opacity: cueOpacity }} className="text-sm text-muted lg:hidden">{t.hero.scroll}</motion.a>
            <div className="hidden items-center gap-3 lg:flex">
            {socials}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.3, ease }}
        className="order-first flex justify-center lg:order-none lg:col-span-5 lg:justify-end"
      >
        <HeroPhoto alt={t.hero.photoAlt} />
      </motion.div>

      <motion.a
        href="#sobre"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center text-sm text-muted transition-colors hover:text-fg lg:flex"
      >
        <motion.span style={{ opacity: cueOpacity }}>{t.hero.scroll}</motion.span>
      </motion.a>
    </section>
  )
}
