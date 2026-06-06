'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { label: 'Prestations', href: '#services', id: 'services' },
  { label: 'À propos', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Détecte la section visible pour surligner le lien correspondant
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/40'
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="A&I Clean"
                width={42}
                height={42}
                className="rounded-xl object-cover shadow-lg group-hover:shadow-amber-500/30 transition-shadow duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-amber-500/0 group-hover:bg-amber-500/10 blur-sm transition-all duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-base tracking-tight text-white">
                A&amp;I <span className="text-amber-400">Clean</span>
              </span>
              <span className="text-[10px] text-text-muted tracking-widest uppercase">
                Saint-Étienne
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm transition-colors duration-200 tracking-wide font-medium relative group ${
                    isActive ? 'text-white' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:scale-105 transition-all duration-300 btn-glow shine shadow-lg shadow-blue-900/30 inline-block"
            >
              Prendre RDV
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
          >
            <motion.span
              className="w-6 h-0.5 bg-white rounded-full block"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white rounded-full block"
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-white rounded-full block"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden glass border-t border-white/[0.06] px-4 py-6 space-y-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="block text-text-secondary hover:text-white transition-colors duration-200 text-base font-medium py-3 border-b border-white/[0.04]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ x: -16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.05 }}
              className="pt-2"
            >
              <Link
                href="#contact"
                className="block text-center px-5 py-3 font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Prendre RDV
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
