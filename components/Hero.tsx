'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen min-h-[640px] w-full overflow-hidden"
      aria-label="Accueil A&I Clean"
    >
      {/* Photo plein écran */}
      <Image
        src="/hero.jpg"
        alt="Véhicule détaillé par A&I Clean"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Légers dégradés pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/35" />

      {/* Titre — haut centré (façon Tesla) */}
      <motion.div
        className="absolute top-[14%] left-0 right-0 text-center px-4"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight">
          A&amp;I Clean
        </h1>
        <p className="mt-3 text-base sm:text-lg text-white/90 font-medium">
          Détailing automobile premium · à domicile
        </p>
        <Link
          href="#services"
          className="inline-block mt-2 text-sm text-white/80 underline underline-offset-4 hover:text-white transition-colors"
        >
          Découvrir nos prestations
        </Link>
      </motion.div>

      {/* Boutons — bas centré */}
      <motion.div
        className="absolute bottom-[8%] left-0 right-0 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href="#contact"
          className="btn-glass-light w-full sm:w-60 text-center py-3 rounded-full font-medium text-sm tracking-wide shadow-sm"
        >
          Réserver un soin
        </Link>
        <Link
          href="#services"
          className="btn-glass-dark w-full sm:w-60 text-center py-3 rounded-full font-medium text-sm tracking-wide"
        >
          Nos prestations
        </Link>
      </motion.div>

      {/* Indicateur de scroll */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
