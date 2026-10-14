import { HandPointingIcon } from '@phosphor-icons/react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type Mode = 'arrow' | 'pointer' | 'text'

const clickable = 'a, button, [role="button"], summary, label, select, input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"]'
const editable = 'input, textarea, [contenteditable=""], [contenteditable="true"]'

function textNodeAt(x: number, y: number) {
  const doc = document as Document & { caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null }
  if (doc.caretPositionFromPoint) return doc.caretPositionFromPoint(x, y)?.offsetNode
  return document.caretRangeFromPoint?.(x, y)?.startContainer
}

function isOverText(x: number, y: number) {
  const node = textNodeAt(x, y)
  if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent?.trim()) return false
  const parent = node.parentElement
  if (!parent || getComputedStyle(parent).userSelect === 'none') return false
  const range = document.createRange()
  range.selectNodeContents(node)
  return [...range.getClientRects()].some((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom)
}

function modeAt(target: EventTarget | null, x: number, y: number): Mode {
  if (!(target instanceof Element)) return 'arrow'
  if (target.closest(clickable)) return 'pointer'
  if (target.closest(editable)) return 'text'
  return isOverText(x, y) ? 'text' : 'arrow'
}

const layer = (active: boolean) => `absolute transition-opacity duration-100 ${active ? 'opacity-100' : 'opacity-0'}`

export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const [visible, setVisible] = useState(false)
  const [mode, setMode] = useState<Mode>('arrow')
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 1500, damping: 35, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 1500, damping: 35, mass: 0.2 })

  useEffect(() => {
    if (!enabled || reduce) return
    const el = ref.current
    if (!el) return
    document.documentElement.classList.add('custom-cursor')
    el.showPopover()

    const raise = () => {
      el.hidePopover()
      el.showPopover()
    }
    const observer = new MutationObserver((records) => {
      if (records.some((r) => r.target instanceof HTMLDialogElement && r.target.open)) raise()
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['open'], subtree: true })

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setMode(modeAt(e.target, e.clientX, e.clientY))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      observer.disconnect()
      if (el.matches(':popover-open')) el.hidePopover()
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, reduce, x, y])

  if (!enabled || reduce) return null

  return (
    <motion.div
      ref={ref}
      popover="manual"
      aria-hidden
      style={{ x: sx, y: sy }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      className="pointer-events-none fixed inset-auto left-0 top-0 m-0 size-0 overflow-visible border-0 bg-transparent p-0 drop-shadow-[0_1px_2px_rgb(0_0_0/0.35)]"
    >
      <svg width="22" height="26" viewBox="0 0 22 26" className={`${layer(mode === 'arrow')} -left-[3px] -top-[2px]`}>
        <path d="M4 2.5v18.2l4.6-4.3 2.9 6.6 3.2-1.4-2.8-6.5h6.4L4 2.5z" fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <HandPointingIcon
        size={26}
        weight="fill"
        color="#000"
        stroke="#fff"
        strokeWidth={14}
        strokeLinejoin="round"
        overflow="visible"
        className={`${layer(mode === 'pointer')} -left-[11.4px] -top-[1.6px]`}
      />
      <svg width="12" height="22" viewBox="0 0 12 22" fill="none" strokeLinecap="round" className={`${layer(mode === 'text')} -left-[6px] -top-[11px]`}>
        <path d="M2 2h1.5C4.9 2 6 3 6 4.4 6 3 7.1 2 8.5 2H10M6 4.4v13.2M2 20h1.5C4.9 20 6 19 6 17.6 6 19 7.1 20 8.5 20H10" stroke="#fff" strokeWidth="3.5" />
        <path d="M2 2h1.5C4.9 2 6 3 6 4.4 6 3 7.1 2 8.5 2H10M6 4.4v13.2M2 20h1.5C4.9 20 6 19 6 17.6 6 19 7.1 20 8.5 20H10" stroke="#000" strokeWidth="1.5" />
      </svg>
    </motion.div>
  )
}
