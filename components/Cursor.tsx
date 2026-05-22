'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Ring — slow + springy (Cuberto lag effect)
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 })

  // Dot — almost instant
  const dotX = useSpring(mouseX, { stiffness: 1500, damping: 40 })
  const dotY = useSpring(mouseY, { stiffness: 1500, damping: 40 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-cursor-hover], input, select, textarea')) {
        setIsHover(true)
      }
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [data-cursor-hover], input, select, textarea')) {
        setIsHover(false)
      }
    }

    const onDown = () => setIsClick(true)
    const onUp = () => setIsClick(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [mouseX, mouseY, visible])

  if (typeof window === 'undefined') return null

  return (
    <div className="hidden lg:block" aria-hidden="true">
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHover ? 52 : isClick ? 18 : 32,
          height: isHover ? 52 : isClick ? 18 : 32,
          opacity: visible ? 1 : 0,
          borderColor: isHover
            ? 'rgba(59,130,246,0.9)'
            : 'rgba(255,255,255,0.45)',
          backgroundColor: isHover
            ? 'rgba(59,130,246,0.08)'
            : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Inner dot — instant */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHover ? 4 : isClick ? 10 : 5,
          height: isHover ? 4 : isClick ? 10 : 5,
          opacity: visible ? (isHover ? 0.5 : 1) : 0,
          backgroundColor: isHover ? '#3b82f6' : '#ffffff',
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}
