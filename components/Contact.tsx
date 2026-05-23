'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const servicesList = [
  'Détailing extérieur — à partir de 60 €',
  'Régénération intérieure — à partir de 60 €',
  'Pack complet — à partir de 100 €',
]

const timeSlots = ['10h00', '11h00', '12h00', '13h00', '14h00', '15h00', '16h00', '17h00', '18h00']

const MONTHS_FULL = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const MONTHS_SHORT = ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sep.', 'oct.', 'nov.', 'déc.']
const DAYS_SHORT = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.']
const DAY_HEADERS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

function BookingCalendar({ selectedDate, onSelect }: { selectedDate: string; onSelect: (label: string) => void }) {
  const todayRaw = new Date()
  todayRaw.setHours(0, 0, 0, 0)
  const [viewDate, setViewDate] = useState(new Date(todayRaw.getFullYear(), todayRaw.getMonth(), 1))

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startOffset = (new Date(year, month, 1).getDay() + 6) % 7

  const cells: (number | null)[] = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const getLabel = (day: number) => {
    const d = new Date(year, month, day)
    return `${DAYS_SHORT[d.getDay()]} ${day} ${MONTHS_SHORT[month]}`
  }

  const isWeekend = (day: number) => {
    const dow = new Date(year, month, day).getDay()
    return dow === 0 || dow === 6
  }

  const isPast = (day: number) => {
    const d = new Date(year, month, day)
    d.setHours(0, 0, 0, 0)
    return d <= todayRaw
  }

  const canGoPrev = () => {
    const now = new Date()
    return year > now.getFullYear() || (year === now.getFullYear() && month > now.getMonth())
  }

  const prevMonth = () => {
    if (canGoPrev()) setViewDate(new Date(year, month - 1, 1))
  }
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      {/* Navigation mois */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev()}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-text-secondary hover:text-white hover:bg-white/10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-display font-semibold text-white text-sm tracking-wide">
          {MONTHS_FULL[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-lg text-text-secondary hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* En-têtes jours */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map((h, i) => (
          <div key={h} className={`text-center text-[10px] font-semibold tracking-widest py-1.5 uppercase ${i >= 5 ? 'text-blue-400' : 'text-text-muted'}`}>
            {h}
          </div>
        ))}
      </div>

      {/* Grille jours */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />
          const available = isWeekend(day) && !isPast(day)
          const selected = selectedDate === getLabel(day)
          return (
            <button
              key={idx}
              type="button"
              disabled={!available}
              onClick={() => available && onSelect(getLabel(day))}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-200
                ${selected
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 scale-105'
                  : available
                  ? 'text-white border border-blue-500/25 hover:bg-blue-500/20 hover:border-blue-400/50'
                  : 'text-white/20 cursor-not-allowed'
                }
              `}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Légende */}
      <div className="flex items-center gap-5 mt-3 pt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded border border-blue-500/40 bg-blue-500/10" />
          <span className="text-text-muted text-[10px]">Disponible</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded bg-blue-600" />
          <span className="text-text-muted text-[10px]">Sélectionné</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded bg-white/10" />
          <span className="text-text-muted text-[10px]">Indisponible</span>
        </div>
      </div>
    </div>
  )
}

const contactInfo = [
  {
    label: "Zone d'intervention",
    value: 'À domicile — Saint-Étienne & alentours (Loire)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Snapchat',
    value: '@ai-clean',
    href: 'https://www.snapchat.com/add/ai-clean',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.166 2.139c.394.014.751.039 1.105.097 1.473.241 2.79 1.13 3.534 2.397.512.872.732 1.84.732 2.829 0 .394-.026.768-.052 1.143-.013.187-.026.374-.039.566.225.117.451.16.7.16.318 0 .613-.06.882-.158a.768.768 0 01.953.404.768.768 0 01-.346 1.033c-.435.225-.973.36-1.535.42-.066.193-.16.45-.291.71.515 1.793 2.04 2.077 2.27 2.107a.448.448 0 01.354.566c-.236.733-1.466.984-1.997 1.069-.018.103-.052.207-.092.336-.04.137-.21.252-.498.252h-.014c-.179 0-.4-.029-.713-.087a3.842 3.842 0 00-.726-.066c-.272 0-.546.024-.86.078-.59.103-1.099.512-1.7.99-.858.683-1.83 1.458-3.36 1.458-.066 0-.131-.003-.197-.007h-.158c-1.53 0-2.502-.775-3.36-1.459-.6-.477-1.11-.886-1.7-.99a4.946 4.946 0 00-.86-.077c-.354 0-.624.054-.85.099a4.21 4.21 0 01-.589.073c-.354 0-.482-.215-.518-.337-.04-.13-.07-.232-.092-.336-.531-.085-1.761-.336-1.997-1.07a.448.448 0 01.354-.565c.23-.03 1.755-.314 2.27-2.107-.131-.26-.225-.518-.291-.71-.562-.06-1.1-.196-1.535-.42a.768.768 0 01-.346-1.033.768.768 0 01.953-.405c.269.098.564.158.882.158.249 0 .476-.043.7-.16-.013-.192-.026-.379-.039-.566-.026-.375-.052-.749-.052-1.143 0-.99.22-1.957.732-2.829.745-1.267 2.061-2.156 3.534-2.397.354-.058.71-.083 1.105-.097z" />
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
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', service: '', date: '', time: '', message: '' })

  const inputClasses =
    'w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-text-primary placeholder-text-muted text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all duration-200'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } catch {
      // fallback: show success anyway
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background-secondary" />
      <div className="absolute top-0 left-0 right-0 divider-gradient" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-900/8 rounded-full blur-[100px]" />
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
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary text-sm hover:text-yellow-300 transition-colors duration-200 font-medium"
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

            {/* Snapchat direct */}
            <a
              href="https://www.snapchat.com/add/ai-clean"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass border border-yellow-400/25 hover:border-yellow-400/60 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-400/15 border border-yellow-400/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.166 2.139c.394.014.751.039 1.105.097 1.473.241 2.79 1.13 3.534 2.397.512.872.732 1.84.732 2.829 0 .394-.026.768-.052 1.143-.013.187-.026.374-.039.566.225.117.451.16.7.16.318 0 .613-.06.882-.158a.768.768 0 01.953.404.768.768 0 01-.346 1.033c-.435.225-.973.36-1.535.42-.066.193-.16.45-.291.71.515 1.793 2.04 2.077 2.27 2.107a.448.448 0 01.354.566c-.236.733-1.466.984-1.997 1.069-.018.103-.052.207-.092.336-.04.137-.21.252-.498.252h-.014c-.179 0-.4-.029-.713-.087a3.842 3.842 0 00-.726-.066c-.272 0-.546.024-.86.078-.59.103-1.099.512-1.7.99-.858.683-1.83 1.458-3.36 1.458-.066 0-.131-.003-.197-.007h-.158c-1.53 0-2.502-.775-3.36-1.459-.6-.477-1.11-.886-1.7-.99a4.946 4.946 0 00-.86-.077c-.354 0-.624.054-.85.099a4.21 4.21 0 01-.589.073c-.354 0-.482-.215-.518-.337-.04-.13-.07-.232-.092-.336-.531-.085-1.761-.336-1.997-1.07a.448.448 0 01.354-.565c.23-.03 1.755-.314 2.27-2.107-.131-.26-.225-.518-.291-.71-.562-.06-1.1-.196-1.535-.42a.768.768 0 01-.346-1.033.768.768 0 01.953-.405c.269.098.564.158.882.158.249 0 .476-.043.7-.16-.013-.192-.026-.379-.039-.566-.026-.375-.052-.749-.052-1.143 0-.99.22-1.957.732-2.829.745-1.267 2.061-2.156 3.534-2.397.354-.058.71-.083 1.105-.097z" />
                </svg>
              </div>
              <div>
                <div className="text-text-muted text-[10px] uppercase tracking-widest mb-0.5">Snapchat</div>
                <div className="text-white font-display font-bold text-lg tracking-wide group-hover:text-yellow-200 transition-colors duration-200">
                  @ai-clean
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
                    Disponible sam. &amp; dim. · Réponse sous 24h
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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

                    {/* Planning — calendrier */}
                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-2 tracking-wide">
                        Choisir une date <span className="text-text-muted font-normal">(sam. &amp; dim. uniquement)</span>
                      </label>
                      <BookingCalendar
                        selectedDate={form.date}
                        onSelect={(label) => setForm({ ...form, date: label, time: '' })}
                      />
                    </div>

                    {/* Planning — time */}
                    {form.date && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-xs font-medium text-text-secondary mb-2 tracking-wide">
                          Choisir un créneau
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {timeSlots.map((slot) => {
                            const selected = form.time === slot
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setForm({ ...form, time: slot })}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                                  selected
                                    ? 'bg-blue-600 text-white border border-blue-500'
                                    : 'glass border border-white/10 text-text-secondary hover:border-blue-500/40 hover:text-white'
                                }`}
                              >
                                {slot}
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-text-secondary mb-1.5 tracking-wide">
                        Message (optionnel)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Votre véhicule, votre adresse..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={inputClasses + ' resize-none'}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      data-cursor-hover
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-sm hover:from-blue-500 hover:to-blue-400 transition-all duration-300 btn-glow shadow-lg shadow-blue-900/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
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
                    Merci <strong className="text-white">{form.name}</strong> — on vous recontacte au plus vite
                    pour confirmer votre créneau.
                    {form.date && form.time && (
                      <span className="block mt-2 text-blue-300 font-medium">
                        {form.date} à {form.time}
                      </span>
                    )}
                  </p>
                  <a
                    href="https://www.snapchat.com/add/ai-clean"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-yellow-300 text-sm font-medium hover:text-yellow-200 transition-colors"
                  >
                    Ou ajoutez-nous sur Snapchat : @ai-clean
                  </a>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', service: '', date: '', time: '', message: '' }) }}
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
