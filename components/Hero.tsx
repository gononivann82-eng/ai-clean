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
          src="https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?w=1920&q=85&auto=format&fit=crop"
          alt="Véhicule détaillé par A&I Clean"
          fill
          priority
          className="object-cover"
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex justify-center mt-16 pt-8 border-t border-white/[0.07]"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.1 }}
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-white">{s.value}</div>
              <div className="text-text-secondary text-xs font-medium mt-1 tracking-widest uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-hidden="true"
      >
        <span className="text-text-muted text-[9px] tracking-[0.25em] uppercase">Défiler</span>
        <div className="relative w-px h-14 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-blue-400/60 to-transparent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
