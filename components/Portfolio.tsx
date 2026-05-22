'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const categories = ['Tout', 'Extérieur', 'Intérieur', 'Céramique', 'Pack Complet']

const portfolioItems = [
  {
    id: 1,
    title: 'Volkswagen Polo',
    category: 'Extérieur',
    description: 'Détailing extérieur complet & Polish',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
    accent: '#3b82f6',
  },
  {
    id: 2,
    title: 'Volkswagen Polo GTI',
    category: 'Céramique',
    description: 'Revêtement céramique 9H',
    image: 'https://images.unsplash.com/photo-1575568249829-843fb6a55525',
    accent: '#8b5cf6',
  },
  {
    id: 3,
    title: 'Skoda Kodiaq',
    category: 'Pack Complet',
    description: 'Pack détailing intérieur & extérieur',
    image: 'https://images.unsplash.com/photo-1650285486993-85d2104a1327',
    accent: '#06b6d4',
  },
  {
    id: 4,
    title: 'Audi A4',
    category: 'Céramique',
    description: 'Correction de peinture + céramique',
    image: 'https://images.unsplash.com/photo-1555652736-e92021d28a10',
    accent: '#c9a84c',
  },
  {
    id: 5,
    title: 'Habitacle cuir',
    category: 'Intérieur',
    description: 'Régénération & conditionnement cuir',
    image: 'https://images.unsplash.com/photo-1682858110563-3f609263d418',
    accent: '#ec4899',
  },
  {
    id: 6,
    title: 'Skoda Octavia',
    category: 'Extérieur',
    description: "Détailing extérieur + PPF zones d'impact",
    image: 'https://images.unsplash.com/photo-1650285313450-39cd35418322',
    accent: '#10b981',
  },
]

// Cuberto-style curtain reveal for images
function CurtainImage({
  src,
  alt,
  isInView,
  delay = 0,
}: {
  src: string
  alt: string
  isInView: boolean
  delay?: number
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Photo — slight scale-down as curtain lifts */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={isInView ? { scale: 1 } : { scale: 1.08 }}
        transition={{ duration: 1.2, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={`${src}?w=900&q=80&auto=format&fit=crop`}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>
      {/* Curtain — slides upward */}
      <motion.div
        className="absolute inset-0 bg-background-secondary z-10"
        initial={{ y: 0 }}
        animate={isInView ? { y: '-101%' } : { y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <motion.article
      ref={ref}
      className="group relative rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      {/* Aspect ratio container */}
      <div className="aspect-[4/3] relative">
        <CurtainImage
          src={item.image}
          alt={item.title}
          isInView={isInView}
          delay={index * 0.08}
        />

        {/* Dark overlay — increases on hover */}
        <motion.div
          className="absolute inset-0 z-20 bg-black"
          animate={{ opacity: hovered ? 0.65 : 0.18 }}
          transition={{ duration: 0.4 }}
        />

        {/* Category badge */}
        <motion.div
          className="absolute top-4 left-4 z-30 px-3 py-1 rounded-full glass text-white text-xs font-medium border border-white/15"
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          {item.category}
        </motion.div>

        {/* Hover content */}
        <motion.div
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-display text-xl font-bold text-white mb-2">{item.title}</div>
          <div className="text-text-secondary text-sm mb-5">{item.description}</div>
          <div
            className="px-5 py-2 rounded-full border text-white text-xs font-medium"
            style={{ borderColor: `${item.accent}60`, boxShadow: `0 0 20px ${item.accent}30` }}
          >
            Voir la réalisation
          </div>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 z-30"
          style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
          animate={{ opacity: hovered ? 1 : 0.4, scaleX: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.article>
  )
}

// Section title line reveal
function TitleLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Tout')

  const filteredItems =
    activeFilter === 'Tout'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute top-0 left-0 right-0 divider-gradient" />
      <div className="absolute bottom-0 left-0 right-0 divider-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <TitleLine delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-300 text-xs font-medium tracking-[0.15em] uppercase mb-4">
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              Portfolio
            </div>
          </TitleLine>

          <TitleLine delay={0.1}>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4 leading-tight">
              Nos plus belles
              <span className="gradient-text-blue"> réalisations</span>
            </h2>
          </TitleLine>

          <TitleLine delay={0.2}>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              Chaque projet raconte une transformation. Chaque résultat parle de passion.
            </p>
          </TitleLine>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex gap-2 justify-center mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              data-cursor-hover
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'glass border border-white/10 text-text-secondary hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredItems.map((item, i) => (
              <PortfolioCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
