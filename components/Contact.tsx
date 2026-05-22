'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const servicesList = [
  'Détailing extérieur — à partir de 60 €',
  'Régénération intérieure — à partir de 60 €',
  'Pack complet — à partir de 100 €',
]

const contactInfo = [
  {
    label: 'Zone d\'intervention',
    value: 'À domicile — Saint-Étienne & alentours (Loire)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Téléphone',
    value: '06 62 25 07 06',
    href: 'tel:0662250706',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Horaires',
    value: 'Samedi & Dimanche : 10h00 – 19h00',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    label: 'Déplacement',
    value: 'Gratuit dans un rayon de 20 km autour de Saint-Étienne',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClasses =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all duration-200'

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute top-0 left-0 right-0 divider-gradient" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/20 text-blue-300 text-xs font-medium tracking-[0.15em] uppercase mb-6">
              <span className="w-1 h-1 rounded-full bg-blue-400" />
              Prendre contact
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Prêt à transformer
              <br />
              <span className="gradient-text-blue">votre véhicule ?</span>
            </h2>

            <p className="text-text-secondary text-base leading-relaxed mb-10">
              On se déplace chez vous sur Saint-Étienne et ses alentours.
              Disponibles <strong className="text-white">le week-end uniquement</strong> — réservez votre créneau
              à l'avance pour garantir votre place.
            </p>

            <div className="space-y-4 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg glass border border-white/10 flex items-center justify-center text-blue-400">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-text-muted text-[11px] tracking-widest uppercase font-medium mb-0.5">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-text-primary text-sm hover:text-blue-400 transition-colors duration-200 font-medium"
                        data-cursor-hover
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-text-primary text-sm">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Appel direct */}
            <a
              href="tel:0662250706"
              data-cursor-hover
              className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass border border-blue-500/25 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="text-text-muted text-[10px] uppercase tracking-widest mb-0.5">Appel direct</div>
                <div className="text-white font-display font-bold text-lg tracking-wide group-hover:text-blue-300 transition-colors duration-200">
                  06 62 25 07 06
                </div>
              </div>
            </a>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="glass rounded-3xl p-8 border border-white/[0.07]">
              {!submitted ? (
                <>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Réserver un créneau
                  </h3>
                  <p className="text-text-muted text-sm mb-6">
                    Disponible sam. & dim. · Réponse sous 24h
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5 tracking-wide">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jean Dupont"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1.5 tracking-wide">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="06 XX XX XX XX"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5 tracking-wide">
                        Prestation souhaitée
                      </label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className={inputClasses + ' cursor-pointer'}
                      >
                        <option value="" className="bg-zinc-900">Choisir une prestation...</option>
                        {servicesList.map((s) => (
                          <option key={s} value={s} className="bg-zinc-900">{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5 tracking-wide">
                        Message (optionnel)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Votre véhicule, votre adresse, vos disponibilités..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={inputClasses + ' resize-none'}
                      />
                    </div>

                    <button
                      type="submit"
                      data-cursor-hover
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-blue-400 transition-all duration-300 btn-glow shadow-lg shadow-blue-900/30 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      Envoyer la demande
                    </button>

                    <p className="text-center text-text-muted text-xs">
                      Nous vous recontactons sous 24h pour confirmer le créneau.
                    </p>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">Demande envoyée !</h3>
                  <p className="text-text-secondary text-sm max-w-xs leading-relaxed">
                    Merci <strong className="text-white">{form.name}</strong> — on vous rappelle au plus vite
                    pour confirmer votre créneau A&amp;I Clean.
                  </p>
                  <a
                    href="tel:0662250706"
                    className="mt-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                  >
                    Ou appelez directement le 06 62 25 07 06
                  </a>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', service: '', message: '' }) }}
                    className="text-text-muted text-xs hover:text-text-secondary transition-colors mt-1"
                  >
                    Nouvelle demande
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
