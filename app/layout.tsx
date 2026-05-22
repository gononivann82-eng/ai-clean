import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'A&I Clean | Détailing Automobile Premium – Saint-Étienne',
  description:
    "Spécialiste du détailing automobile haut de gamme à Saint-Étienne et alentours. Correction de peinture, revêtement céramique, PPF et soins intérieurs d'exception.",
  keywords:
    'détailing automobile Saint-Étienne, polish carrosserie Loire, revêtement céramique, correction peinture, PPF, nettoyage intérieur voiture',
  openGraph: {
    title: 'A&I Clean | Détailing Automobile Premium – Saint-Étienne',
    description:
      "Spécialiste du détailing automobile haut de gamme à Saint-Étienne et alentours.",
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-body bg-background text-text-primary antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
