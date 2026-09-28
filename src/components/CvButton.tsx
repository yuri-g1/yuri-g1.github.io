import { CheckCircleIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLang } from '../i18n/context'

const files = { pt: '/cv/Yuri_Gabriel_Resume_PT.pdf', en: '/cv/Yuri_Gabriel_Resume_EN.pdf' }
const thanks = { pt: 'Obrigado por baixar meu CV!', en: 'Thanks for downloading my CV!' }

export function CvButton({ label, variant = 'solid' }: { label: string; variant?: 'solid' | 'outline' }) {
  const { lang } = useLang()
  const reduce = useReducedMotion()
  const [toast, setToast] = useState(false)

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(false), 3200)
    return () => clearTimeout(id)
  }, [toast])

  const base =
    variant === 'solid'
      ? 'h-12 bg-fg text-bg hover:scale-[1.03]'
      : 'h-14 border border-fg/20 hover:bg-fg/5'

  return (
    <>
      <a
        href={files[lang]}
        download
        onClick={() => setToast(true)}
        className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-6 text-sm font-medium transition-transform duration-300 active:scale-[0.98] ${base}`}
      >
        <DownloadSimpleIcon size={18} weight="bold" />
        {label}
      </a>
      {createPortal(
        <AnimatePresence>
          {toast && (
            <motion.div
              role="status"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full bg-fg py-3 pl-3 pr-6 text-sm font-medium text-bg shadow-[0_20px_50px_-20px_rgb(18_18_17/0.6)]"
            >
              <span className="grid size-8 place-items-center rounded-full bg-accent text-fg">
                <CheckCircleIcon size={20} weight="fill" />
              </span>
              {thanks[lang]}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
