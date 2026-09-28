import { CheckIcon, CopyIcon, EnvelopeSimpleIcon, XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { EMAIL } from '../data'
import { useLang } from '../i18n/context'

const text = {
  pt: { hint: 'Não abriu seu app de e-mail?', copy: 'Copiar', copied: 'Copiado', close: 'Fechar', label: 'Enviar e-mail' },
  en: { hint: "Mail app didn't open?", copy: 'Copy', copied: 'Copied', close: 'Close', label: 'Send email' },
}

export function MailButton({ className }: { className: string }) {
  const { lang } = useLang()
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const s = text[lang]

  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => setOpen(false), 8000)
    return () => clearTimeout(id)
  }, [open, copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <a
        href={`mailto:${EMAIL}`}
        aria-label={s.label}
        onClick={() => {
          setCopied(false)
          setOpen(true)
        }}
        className={className}
      >
        <EnvelopeSimpleIcon size={20} weight="bold" />
      </a>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              role="status"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="fixed bottom-6 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-full bg-fg py-2 pl-5 pr-2 text-sm text-bg shadow-[0_20px_50px_-20px_rgb(18_18_17/0.6)]"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-bg/60">{s.hint}</span>
                <span className="block truncate font-mono">{EMAIL}</span>
              </span>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-accent px-4 font-medium text-fg transition-transform active:scale-[0.97]"
              >
                {copied ? <CheckIcon size={16} weight="bold" /> : <CopyIcon size={16} weight="bold" />}
                {copied ? s.copied : s.copy}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={s.close}
                className="grid size-10 shrink-0 place-items-center rounded-full text-bg/60 transition-colors hover:text-bg"
              >
                <XIcon size={16} weight="bold" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
