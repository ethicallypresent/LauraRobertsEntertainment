import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  id?: string
  delay?: number
  style?: React.CSSProperties
}

/** Wraps a section with a scroll-triggered fade-up animation */
export default function SectionWrapper({ children, className = '', id, delay = 0, style }: Props) {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
