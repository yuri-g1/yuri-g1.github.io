import { CheckIcon, CopyIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../data'
import { useLang } from '../i18n/context'
import { CvButton } from './CvButton'
import { MailButton } from './MailButton'
import { Reveal } from './Reveal'

export function Contact() {
  const { t, lang } = useLang()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  const linkedin = lang === 'pt' ? `${LINKEDIN_URL}/?locale=pt-BR` : LINKEDIN_URL

  return (
    <section id="contato" className="scroll-mt-24 px-4 md:px-8">
      <Reveal>
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-accent p-6 md:p-12 lg:p-16"
        >
          <div className="flex flex-col justify-between gap-12 py-4 lg:py-8">
            <div>
              <h2 className="max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl xl:text-8xl">
                {t.contact.title}
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg text-fg/70 md:text-xl">{t.contact.sub}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex h-14 items-center gap-3 whitespace-nowrap rounded-full border border-fg/20 px-6 font-mono text-sm transition-colors duration-300 hover:bg-fg/5 active:scale-[0.98]"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={copied ? 'ok' : 'copy'}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.15 }}
                    >
                      {copied ? <CheckIcon size={18} weight="bold" /> : <CopyIcon size={18} />}
                    </motion.span>
                  </AnimatePresence>
                  <span aria-live="polite">{copied ? t.contact.copied : EMAIL}</span>
                </button>
                <CvButton label={t.contact.cvLabel} variant="outline" />
              <div className="flex items-center gap-3">
                <MailButton className="grid size-14 place-items-center rounded-full border border-fg/20 transition-colors duration-300 hover:bg-fg hover:text-accent" />
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="grid size-14 place-items-center rounded-full border border-fg/20 transition-colors duration-300 hover:bg-fg hover:text-accent"
                >
                  <LinkedinLogoIcon size={22} weight="fill" />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="grid size-14 place-items-center rounded-full border border-fg/20 transition-colors duration-300 hover:bg-fg hover:text-accent"
                >
                  <GithubLogoIcon size={22} weight="fill" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
