import { motion, useReducedMotion } from 'motion/react'

export function Footer() {
  const reduce = useReducedMotion()
  return (
    <footer className="overflow-hidden pt-16">
      <motion.p
        aria-hidden
        initial={reduce ? false : { y: '40%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="select-none whitespace-nowrap px-4 pb-[0.06em] text-center font-semibold leading-[0.8] tracking-[-0.07em] text-fg/[0.06] text-[clamp(3.5rem,17vw,17rem)] md:px-8"
      >
        Yuri Gabriel
      </motion.p>
    </footer>
  )
}
