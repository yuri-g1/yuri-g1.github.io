import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { AVATAR_URL } from '../data'

const ease = [0.16, 1, 0.3, 1] as const

export function HeroPhoto({ alt }: { alt: string }) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.18])

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease }}
      className="relative aspect-square w-32 overflow-hidden rounded-full sm:w-40 lg:w-full lg:max-w-lg bg-accent ring-1 ring-line"
    >
      <motion.div style={{ scale }} className="h-full w-full">
        <div className="h-full w-full origin-[15%_15%] -translate-x-[16%] scale-[1.3] lg:-translate-x-[5%] lg:scale-[1.06]">
          <img src={AVATAR_URL} alt={alt} fetchPriority="high" className="h-full w-full object-cover object-[50%_75%]" />
        </div>
      </motion.div>
    </motion.div>
  )
}
