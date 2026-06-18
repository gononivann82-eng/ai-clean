'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    id: 1,
    name: 'Détailing extérieur',
    description:
      "Traitement extérieur complet qui redonne à votre carrosserie son éclat d'origine, du lavage à la protection finale.",
    benefits: ['Décontamination de la peinture', 'Lavage à la main', 'Jantes & pneus', 'Protection finale'],
    price: 'À partir de 60 €',
    priceNote: 'Selon taille du véhicule',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 6H4L3 10v2a1 1 0 001 1h1.5M13 6l3 7H7.5m5.5-7V3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 13h1.5a1 1 0 001-1v-2l-1-4" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Régénération intérieure',
    description:
      'Nettoyage en profondeur et restauration de chaque surface intérieure pour un habitacle impeccable et parfumé.',
    benefits: ['Nettoyage vapeur', 'Conditionnement cuir', 'Protection tissus', 'Élimination des odeurs'],
    price: 'À partir de 60 €',
    priceNote: 'Selon taille du véhicule',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Pack complet',
    description:
      'La formule tout-en-un combinant le traitement intérieur et extérieur intégral — la remise en état totale de votre véhicule.',
    benefits: ['Extérieur complet', 'Régénération intérieure', 'Vitres & chrome', 'Contrôle final'],
    price: 'À partir de 100 €',
    priceNote: 'Selon taille du véhicule',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <polygon strokeLinecap="round" strokeLinejoin="round" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-clean rounded-2xl p-8 flex flex-col"
    >
      {/* Icône */}
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 bg-[#f4f4f4] text-[#171a20]">
        {service.icon}
      </div>

      <h3 className="font-display text-xl font-semibold text-[#171a20] mb-3">{service.name}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-6">{service.description}</p>

      <ul className="space-y-2.5 mb-8 flex-1">
        {service.benefits.map((b) => (
          <li key={b} className="flex items-center gap-2.5 text-sm text-text-secondary">
            <svg className="w-4 h-4 text-[#171a20] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {b}
          </li>
        ))}
      </ul>

      {/* Prix + CTA */}
      <div className="pt-5 border-t border-line">
        <div className="font-display text-2xl font-semibold text-[#171a20]">{service.price}</div>
        <div className="text-text-muted text-xs mt-1 mb-4">{service.priceNote}</div>
        <a
          href="#contact"
          className="btn-dark flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-medium"
        >
          Réserver ce soin
        </a>
      </div>
    </motion.article>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-text-muted text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Nos Prestations
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#171a20] tracking-tight mb-4">
              Conçu pour la perfection
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Chaque prestation est réalisée à domicile, sur Saint-Étienne et ses alentours,
              avec une précision irréprochable.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <p className="text-center text-text-muted text-xs mt-10">
          * Tarifs indicatifs — citadine. Berline &amp; SUV : majoration de 20 à 40 €. Devis gratuit sur demande.
        </p>
      </div>
    </section>
  )
}
