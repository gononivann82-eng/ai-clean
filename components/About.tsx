'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const values = [
  {
    title: 'Précision absolue',
    description: 'Chaque centimètre de votre véhicule reçoit une attention méticuleuse. Aucun détail laissé au hasard.',
  },
  {
    title: 'Produits pro certifiés',
    description: 'On utilise les meilleurs produits pH neutres du marché — efficaces sans jamais agresser votre peinture.',
  },
  {
    title: 'Artisans passionnés',
    description: "La passion de l'auto depuis toujours — maintenant au service de votre véhicule, chaque week-end.",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center" ref={ref}>

          {/* Gauche — Texte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-text-muted text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Artisans passionnés
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#171a20] tracking-tight leading-tight mb-6">
              On fait ça avec le cœur.
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Deux jeunes de Saint-Étienne, une obsession : rendre votre voiture
              impeccable. On a grandi avec la passion de l'auto et on en a fait
              notre métier. Pas de blabla, juste du travail sérieux —
              chez vous, chaque week-end.
            </p>
          </motion.div>

          {/* Droite — Valeurs */}
          <div className="space-y-px bg-line rounded-2xl overflow-hidden border border-line">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="bg-white p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="font-display font-semibold text-[#171a20] text-base mb-1.5">{v.title}</div>
                <div className="text-text-secondary text-sm leading-relaxed">{v.description}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
