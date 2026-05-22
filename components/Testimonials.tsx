'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Thomas B.',
    role: 'Propriétaire Audi RS6 – Saint-Étienne',
    text: "A&I Clean a transformé mon Audi RS6 au-delà de mes espérances. Le travail de correction de peinture est absolument remarquable, la carrosserie brille comme au premier jour. Un service d'exception, je recommande les yeux fermés.",
    rating: 5,
    initials: 'TB',
  },
  {
    id: 2,
    name: 'Marie D.',
    role: 'Propriétaire Porsche Cayenne – Firminy',
    text: "J'ai confié ma Porsche à A&I Clean pour un revêtement céramique et le résultat dépasse tout ce que j'avais imaginé. L'équipe est professionnelle, rigoureuse et vraiment passionnée par son métier. Impeccable.",
    rating: 5,
    initials: 'MD',
  },
  {
    id: 3,
    name: 'Laurent P.',
    role: 'Propriétaire BMW M3 – Andrézieux',
    text: "Service impeccable du début à la fin. Mon BMW M3 est revenu dans un état parfait après le pack complet. Chaque détail a été soigné avec une précision remarquable. Je reviens sans hésiter.",
    rating: 5,
    initials: 'LP',
  },
  {
    id: 4,
    name: 'Sophie M.',
    role: 'Propriétaire Mercedes GLE – Saint-Chamond',
    text: "Une adresse incontournable pour tout amateur de belles voitures dans la région stéphanoise. Le résultat avant/après de l'intérieur de mon Mercedes est tout simplement bluffant. Merci à toute l'équipe !",
    rating: 5,
    initials: 'SM',
  },
  {
    id: 5,
    name: 'Claire R.',
    role: 'Propriétaire VW Golf GTI – Saint-Étienne',
    text: "Équipe à l'écoute, travail soigné, résultat parfait. Ma Golf est ressortie comme neuve. Le rapport qualité/prix est excellent pour un niveau de finition aussi haut. Je recommande vivement à mon entourage.",
    rating: 5,
    initials: 'CR',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-600'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [autoplay, current])

  const prev = () => {
    setAutoplay(false)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }
  const next = () => {
    setAutoplay(false)
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-300 text-xs font-medium tracking-[0.15em] uppercase mb-4">
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            Avis clients
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mt-2">
            Ce que disent
            <span className="gradient-text-blue"> nos clients</span>
          </h2>
        </motion.div>

        {/* Carrousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-8 lg:p-12 border border-white/[0.07]"
            >
              {/* Guillemet décoratif */}
              <div className="text-blue-500/15 text-9xl font-serif leading-none select-none -mt-4 mb-1">
                "
              </div>

              {/* Texte du témoignage */}
              <p className="text-text-primary text-lg lg:text-xl leading-relaxed mb-8 -mt-6">
                {testimonials[current].text}
              </p>

              {/* Auteur */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold font-display">
                    {testimonials[current].initials}
                  </div>
                  <div>
                    <div className="text-white font-semibold font-display">
                      {testimonials[current].name}
                    </div>
                    <div className="text-text-secondary text-sm">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
                <StarRating rating={testimonials[current].rating} />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              aria-label="Témoignage précédent"
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Points de pagination */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoplay(false); setCurrent(i) }}
                  aria-label={`Témoignage ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 h-2 bg-blue-500' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Témoignage suivant"
              className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
