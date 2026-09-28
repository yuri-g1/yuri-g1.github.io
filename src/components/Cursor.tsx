import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

export function Cursor() {
  const reduce = useReducedMotion()
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 })

  useEffect(() => {
    if (!enabled || reduce) return
    document.documentElement.classList.add('custom-cursor')
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, reduce, x, y])

  if (!enabled || reduce) return null

  return (
    <motion.svg
      aria-hidden
      width="22"
      height="26"
      viewBox="0 0 22 26"
      style={{ x: sx, y: sy }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
      className="pointer-events-none fixed left-0 top-0 z-[80] -ml-[3px] -mt-[2px] drop-shadow-[0_1px_2px_rgb(0_0_0/0.35)]"
    >
      <path d="M4 2.5v18.2l4.6-4.3 2.9 6.6 3.2-1.4-2.8-6.5h6.4L4 2.5z" fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
    </motion.svg>
  )
}
