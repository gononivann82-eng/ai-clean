'use client'

const items = [
  'Détailing extérieur',
  'Revêtement céramique',
  'Correction de peinture',
  'Film PPF',
  'Régénération intérieure',
  'Polissage carrosserie',
  'Nettoyage vapeur',
  'Protection longue durée',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden py-5 border-y border-white/[0.06] bg-background-secondary select-none">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background-secondary to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background-secondary to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-6 text-text-muted text-xs font-medium tracking-[0.18em] uppercase"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 flex-shrink-0"
              aria-hidden="true"
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
