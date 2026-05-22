'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const values = [
  {
    symbol: '◆',
    title: 'Précision absolue',
    description: 'Chaque centimètre de votre véhicule reçoit une attention méticuleuse — aucun détail laissé au hasard.',
  },
  {
    symbol: '●',
    title: 'Produits professionnels',
    description: 'Nous utilisons exclusivement des produits certifiés et pH neutres, efficaces sans jamais agresser.',
  },
  {
    symbol: '▲',
    title: 'Artisans passionnés',
    description: "Notre équipe de spécialistes allie formation pointue et passion authentique pour l'automobile.",
  },
]

// Cuberto-style curtain reveal for about image
function AboutImage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-12%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <div ref={ref} className="relative rounded-3xl overflow-hidden aspect-[3/4] lg:aspect-auto lg:h-[580px]">
      {/* Parallax image */}
      <motion.div className="absolute inset-[-8%]" style={{ y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1622329821376-a19fd6002562?w=900&q=80&auto=format&fit=crop"
          alt="Technicien A&I Clean en plein travail de détailing"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>

      {/* Color overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/20" />

      {/* Curtain reveal */}
      <motion.div
        className="absolute inset-0 bg-background z-10"
        initial={{ y: 0 }}
        animate={isInView ? { y: '-101%' } : { y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Floating stat bottom left */}
      <motion.div
        className="absolute bottom-6 left-6 z-20 glass rounded-2xl p-4 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 1.0 }}
      >
        <div className="text-amber-400 text-xs mb-1">★★★★★</div>
        <div className="text-white font-semibold text-sm">500+ clients satisfaits</div>
        <div className="text-text-muted text-xs">Saint-Étienne & Loire</div>
      </motion.div>

      {/* Corner brackets */}
      {[
        'top-5 left-5 border-l-2 border-t-2 rounded-tl-xl',
        'top-5 right-5 border-r-2 border-t-2 rounded-tr-xl',
      ].map((cls, i) => (
        <div key={i} className={`absolute z-20 w-8 h-8 border-blue-400/30 ${cls}`} />
      ))}
    </div>
  )
}

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Real photo with curtain reveal */}
          <AboutImage />

          {/* Right — Text content */}
          <div ref={ref}>
            <LineReveal delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-300 text-xs font-medium tracking-[0.15em] uppercase mb-6">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                Notre philosophie
              </div>
            </LineReveal>

            <div className="mb-6">
              <LineReveal delay={0.1}>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-white leading-tight">
                  Notre passion
                </h2>
              </LineReveal>
              <LineReveal delay={0.2}>
                <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] font-bold leading-tight">
                  <span className="gradient-text-gold">de la perfection</span>
                </h2>
              </LineReveal>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <p className="text-text-secondary text-base leading-relaxed mb-5">
                Fondée à Saint-Étienne, A&amp;I Clean est née d'une passion commune pour
                l'automobile et d'une exigence absolue du détail. Nous intervenons sur
                Saint-Étienne et toute la région de la Loire, au plus près de nos clients.
              </p>
              <p className="text-text-secondary text-base leading-relaxed mb-10">
                Notre équipe de spécialistes certifiés associe des techniques de pointe aux
                meilleurs produits professionnels disponibles. Que ce soit votre quotidienne ou
                un véhicule de collection, nous apportons le même engagement sans compromis.
              </p>
            </motion.div>

            <div className="space-y-3">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="flex gap-4 items-start p-4 glass rounded-xl border border-white/[0.06] hover:border-white/10 transition-colors duration-300"
                  initial={{ opacity: 0, x: 24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                  transition={{ duration: 0.6, delay: 0.45 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
      </div>
    </section>
  )
}
