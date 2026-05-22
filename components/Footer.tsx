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
                  href="https://www.snapchat.com/add/aiclean"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-text-secondary text-sm hover:text-white transition-colors duration-200 group"
                  data-cursor-hover
                >
                  <svg className="w-4 h-4 text-yellow-300 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.166 2.139c.394.014.751.039 1.105.097 1.473.241 2.79 1.13 3.534 2.397.512.872.732 1.84.732 2.829 0 .394-.026.768-.052 1.143-.013.187-.026.374-.039.566.225.117.451.16.7.16.318 0 .613-.06.882-.158a.768.768 0 01.953.404.768.768 0 01-.346 1.033c-.435.225-.973.36-1.535.42-.066.193-.16.45-.291.71.515 1.793 2.04 2.077 2.27 2.107a.448.448 0 01.354.566c-.236.733-1.466.984-1.997 1.069-.018.103-.052.207-.092.336-.04.137-.21.252-.498.252h-.014c-.179 0-.4-.029-.713-.087a3.842 3.842 0 00-.726-.066c-.272 0-.546.024-.86.078-.59.103-1.099.512-1.7.99-.858.683-1.83 1.458-3.36 1.458-.066 0-.131-.003-.197-.007h-.158c-1.53 0-2.502-.775-3.36-1.459-.6-.477-1.11-.886-1.7-.99a4.946 4.946 0 00-.86-.077c-.354 0-.624.054-.85.099a4.21 4.21 0 01-.589.073c-.354 0-.482-.215-.518-.337-.04-.13-.07-.232-.092-.336-.531-.085-1.761-.336-1.997-1.07a.448.448 0 01.354-.565c.23-.03 1.755-.314 2.27-2.107-.131-.26-.225-.518-.291-.71-.562-.06-1.1-.196-1.535-.42a.768.768 0 01-.346-1.033.768.768 0 01.953-.405c.269.098.564.158.882.158.249 0 .476-.043.7-.16-.013-.192-.026-.379-.039-.566-.026-.375-.052-.749-.052-1.143 0-.99.22-1.957.732-2.829.745-1.267 2.061-2.156 3.534-2.397.354-.058.71-.083 1.105-.097z" />
                  </svg>
                  @aiclean (Snapchat)
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
