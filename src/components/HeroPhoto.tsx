import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { AVATAR_URL } from '../data'

const ease = [0.76, 0, 0.24, 1] as const

export function HeroPhoto({ alt }: { alt: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.18])

  return (
    <div ref={ref} className="relative aspect-square w-32 overflow-hidden rounded-full sm:w-40 lg:aspect-[4/5] lg:w-full lg:max-w-lg lg:rounded-3xl bg-accent ring-1 ring-line">
      <motion.div
        initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        transition={{ duration: 1.3, delay: 0.25, ease }}
        className="absolute inset-0"
      >
        <motion.div style={{ scale }} className="h-full w-full">
          <div className="h-full w-full origin-[15%_15%] -translate-x-[16%] scale-[1.3] lg:translate-x-0 lg:scale-100">
          <motion.img
            src={AVATAR_URL}
            alt={alt}
            fetchPriority="high"
            initial={reduce ? false : { scale: 1.35 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, delay: 0.25, ease }}
            className="h-full w-full object-cover object-[50%_75%]"
          />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
