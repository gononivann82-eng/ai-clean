'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background border-t border-white/[0.05] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[160px] bg-blue-900/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Marque */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 3C10.3 3 9 4.3 9 6s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M3 12l3-3M21 12l-3-3M12 21v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-base text-white">
                  A&amp;I <span className="text-blue-400">Clean</span>
                </span>
                <span className="text-[10px] text-text-muted tracking-widest uppercase">Saint-Étienne</span>
              </div>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Détailing automobile premium à domicile sur Saint-Étienne et la Loire.
              Disponible le week-end, au service de votre véhicule.
            </p>
          </div>

          {/* Prestations */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">Prestations</h4>
            <ul className="space-y-2.5">
              {[
                'Détailing extérieur',
                'Régénération intérieure',
                'Pack complet',
                'Correction de peinture',
                'Revêtement céramique',
                'Film PPF',
              ].map((item) => (
                <li key={item}>
                  <Link href="#services" className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact rapide */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0662250706"
                  className="flex items-center gap-2.5 text-text-secondary text-sm hover:text-white transition-colors duration-200 group"
                  data-cursor-hover
                >
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  06 62 25 07 06
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-text-secondary text-sm">
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth={1.8} />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6l4 2" />
                </svg>
                Sam. &amp; Dim. · 10h – 19h
              </li>
              <li className="flex items-start gap-2.5 text-text-secondary text-sm">
                <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                À domicile · Saint-Étienne &amp; Loire
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className="divider-gradient mb-6" />

        {/* Bas de page */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-text-muted text-xs">
          <p>© {currentYear} A&amp;I Clean · Saint-Étienne. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-text-secondary transition-colors duration-200">Mentions légales</Link>
            <Link href="#" className="hover:text-text-secondary transition-colors duration-200">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
