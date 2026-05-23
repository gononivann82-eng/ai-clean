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
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.1)',
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
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.1)',
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
    color: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.1)',
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
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group relative glass rounded-2xl p-8 transition-all duration-500 hover:bg-white/[0.07] flex flex-col"
      style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.06)' }}
      data-cursor-hover
    >
      {/* Barre accent top */}
      <div
        className="absolute top-0 left-8 right-8 h-px rounded-full opacity-35 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
      />

      {/* Icône */}
      <div
        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300"
        style={{ background: service.bgColor, color: service.color }}
      >
        {service.icon}
      </div>

      <h3 className="font-display text-xl font-semibold text-white mb-3">{service.name}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-5">{service.description}</p>

      <ul className="space-y-2 mb-8 flex-1">
        {service.benefits.map((b) => (
          <li key={b} className="flex items-center gap-2.5 text-sm text-text-secondary">
            <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: service.color }} />
            {b}
          </li>
        ))}
      </ul>

      {/* Prix + CTA */}
      <div className="pt-5 border-t border-white/[0.07]">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="font-display text-3xl font-bold" style={{ color: service.color }}>
              {service.price}
            </div>
            <div className="text-text-muted text-xs mt-1">{service.priceNote}</div>
          </div>
        </div>
        <a
          href="#contact"
          data-cursor-hover
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
          style={{
            background: `${service.color}18`,
            border: `1px solid ${service.color}35`,
          }}
        >
          Réserver ce soin
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.article>
  )
}

function LineReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
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

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute top-0 left-0 right-0 divider-gradient" />
      <div className="absolute bottom-0 left-0 right-0 divider-gradient" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-900/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <LineReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-300 text-xs font-medium tracking-[0.15em] uppercase mb-4">
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              Nos Prestations
            </div>
          </LineReveal>
          <LineReveal delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4 leading-tight">
              Conçu pour
              <span className="gradient-text-blue"> la perfection</span>
            </h2>
          </LineReveal>
          <LineReveal delay={0.2}>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
              Chaque prestation est réalisée à domicile, sur Saint-Étienne et ses alentours,
              avec une précision et une attention irréprochables.
            </p>
          </LineReveal>
        </div>

        {/* 3 cartes centrées */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Note tarifaire */}
        <motion.p
          className="text-center text-text-muted text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          * Tarifs indicatifs — citadine. Berline &amp; SUV : majoration de 20 à 40 €. Devis gratuit sur demande.
        </motion.p>
      </div>
    </section>
  )
}
