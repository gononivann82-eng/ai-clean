'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const values = [
  {
    symbol: '◆',
    title: 'Précision absolue',
    description: 'Chaque centimètre de votre véhicule reçoit une attention méticuleuse. Aucun détail laissé au hasard.',
  },
  {
    symbol: '●',
    title: 'Produits pro certifiés',
    description: 'On utilise les meilleurs produits pH neutres du marché — efficaces sans jamais agresser votre peinture.',
  },
  {
    symbol: '▲',
    title: 'Artisans passionnés',
    description: "La passion de l'auto depuis toujours — maintenant au service de votre véhicule, chaque week-end.",
  },
]

function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={{ y: '105%' }}
        animate={isInView ? { y: '0%' } : { y: '105%' }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-900/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center" ref={ref}>

          {/* Left — Text */}
          <div>
            <LineReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-300 text-xs font-medium tracking-[0.15em] uppercase mb-6">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Artisans passionnés
              </div>
            </LineReveal>

            <div className="mb-6">
              <LineReveal delay={0.1}>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-white leading-tight">
                  On fait ça
                </h2>
              </LineReveal>
              <LineReveal delay={0.2}>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] font-bold leading-tight">
                  <span className="gradient-text-gold">avec le cœur.</span>
                </h2>
              </LineReveal>
            </div>

            <motion.p
              className="text-text-secondary text-lg leading-relaxed"
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Deux jeunes de Saint-Étienne, une obsession : rendre votre voiture
              impeccable. On a grandi avec la passion de l'auto et on en a fait
              notre métier. Pas de blabla, juste du travail sérieux —
              chez vous, chaque week-end.
            </motion.p>
          </div>

          {/* Right — Values cards */}
          <div className="space-y-3">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="flex gap-4 items-start p-5 glass rounded-xl border border-white/[0.06] hover:border-blue-500/20 transition-all duration-300 hover:bg-white/[0.04]"
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                transition={{ duration: 0.6, delay: 0.45 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-blue-400 text-sm mt-0.5 w-4 flex-shrink-0 select-none">
                  {v.symbol}
                </span>
                <div>
                  <div className="font-display font-semibold text-white text-sm mb-1">{v.title}</div>
                  <div className="text-text-secondary text-sm leading-relaxed">{v.description}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
