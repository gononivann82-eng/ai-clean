'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  )
}
