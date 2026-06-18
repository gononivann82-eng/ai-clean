'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { label: 'Prestations', href: '#services' },
  { label: 'À propos', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Texte foncé une fois scrollé (fond blanc), clair sur la photo
  const dark = scrolled
  const textColor = dark ? 'text-[#171a20]' : 'text-white'

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="A&I Clean"
              width={36}
              height={36}
              className="rounded-lg object-cover"
            />
            <span className={`font-display font-semibold text-base tracking-tight transition-colors duration-300 ${textColor}`}>
              A&amp;I Clean
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Navigation principale">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-1.5 rounded-md text-sm font-medium tracking-wide transition-colors duration-200 ${textColor} ${
                  dark ? 'hover:bg-black/[0.06]' : 'hover:bg-white/15'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + menu mobile */}
          <div className="flex items-center gap-2">
            <Link
              href="#contact"
              className={`hidden md:inline-block px-5 py-1.5 rounded-full text-sm font-medium tracking-wide transition-colors duration-200 ${
                dark ? 'btn-dark' : 'btn-glass-light'
              }`}
            >
              Prendre RDV
            </Link>

            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Ouvrir le menu"
              aria-expanded={isOpen}
            >
              <motion.span
                className={`w-6 h-0.5 rounded-full block transition-colors duration-300 ${dark || isOpen ? 'bg-[#171a20]' : 'bg-white'}`}
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`w-6 h-0.5 rounded-full block transition-colors duration-300 ${dark || isOpen ? 'bg-[#171a20]' : 'bg-white'}`}
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`w-6 h-0.5 rounded-full block transition-colors duration-300 ${dark || isOpen ? 'bg-[#171a20]' : 'bg-white'}`}
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-line px-4 py-4 space-y-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-[#171a20] hover:bg-black/[0.04] rounded-md transition-colors duration-200 text-base font-medium py-3 px-2"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              className="block text-center btn-dark px-5 py-3 rounded-full font-medium mt-2"
              onClick={() => setIsOpen(false)}
            >
              Prendre RDV
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
