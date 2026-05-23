'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Cuberto-style: each line reveals upward from a clip mask
function LineReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '105%', rotateX: 8 }}
        animate={{ y: '0%', rotateX: 0 }}
        transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'bottom' }}
      >
        {children}
      </motion.div>
    </div>
  )
}

const stats = [
  { value: 'Loire', label: '& alentours' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: photo moves slower than scroll
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.55], ['0%', '-6%'])

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      aria-label="Accueil A&I Clean"
    >
      {/* ── Background photo with parallax ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: photoY, scale: photoScale }}>
        <Image
          src="/hero.jpg"
          alt="Véhicule détaillé par A&I Clean"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Heavy dark overlay to keep dark theme */}
        <div className="absolute inset-0 bg-background/75" />
        {/* Gradient fade top & bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/90" />
        {/* Subtle blue tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-indigo-950/20" />
      </motion.div>

      {/* ── Grid overlay ── */}
      <div className="absolute inset-0 z-[1] line-grid pointer-events-none" />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto perspective-text"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Headline — Cuberto word-by-word reveal */}
        <h1 className="font-display font-bold leading-[1.03] tracking-tight mb-7">
          <LineReveal delay={0.25} className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem]">
            La perfection
          </LineReveal>
          <LineReveal delay={0.38} className="gradient-text-blue text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem]">
            au service de
          </LineReveal>
          <LineReveal delay={0.51} className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[5.8rem]">
            votre véhicule.
          </LineReveal>
        </h1>

        {/* Tagline */}
        <LineReveal delay={0.68}>
          <p className="text-text-secondary text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Soin impeccable. Finition parfaite. Passion incomparable — chaque détail
            traité avec la précision qu'il mérite.
          </p>
        </LineReveal>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="#contact"
            className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-base transition-all duration-300 btn-glow hover:scale-[1.04] shadow-2xl shadow-blue-900/40"
            data-cursor-hover
          >
            Réserver un soin
            <motion.span
              className="absolute inset-0 rounded-full bg-white/10"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
          <Link
            href="#services"
            className="group flex items-center gap-2.5 px-9 py-4 rounded-full glass border border-white/12 text-text-primary font-semibold text-base hover:border-white/25 hover:bg-white/[0.07] transition-all duration-300"
            data-cursor-hover
          >
            Découvrir nos prestations
            <svg
              className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

      </motion.div>

      {/* ── Loire & alentours — bottom left avec flèche ── */}
      <motion.div
        className="absolute bottom-8 left-6 sm:left-10 flex flex-col items-start gap-1.5"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <div className="w-px h-6 bg-gradient-to-b from-blue-400/60 to-transparent" />
          <div>
            <div className="font-display text-lg font-bold text-white leading-none">Loire</div>
            <div className="text-text-secondary text-[10px] tracking-widest uppercase mt-0.5">& alentours</div>
          </div>
        </div>
        <motion.svg
          className="w-4 h-4 text-blue-400 ml-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
