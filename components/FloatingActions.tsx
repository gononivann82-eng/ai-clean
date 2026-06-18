'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
      {/* Back to top — apparaît au scroll */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Remonter en haut"
            className="w-11 h-11 rounded-full bg-white border border-line flex items-center justify-center text-[#171a20] shadow-md hover:bg-[#f4f4f4] transition-colors duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Snapchat — contact rapide toujours visible */}
      <motion.a
        href="https://www.snapchat.com/add/ai-clean"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous contacter sur Snapchat"
        data-cursor-hover
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-14 h-14 rounded-full bg-[#FFFC00] flex items-center justify-center shadow-xl shadow-yellow-500/30 group"
      >
        {/* Halo pulsant */}
        <span className="absolute inset-0 rounded-full bg-[#FFFC00] opacity-60 animate-ping" style={{ animationDuration: '2.5s' }} />
        <svg className="relative w-7 h-7 text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.166 2.139c.394.014.751.039 1.105.097 1.473.241 2.79 1.13 3.534 2.397.512.872.732 1.84.732 2.829 0 .394-.026.768-.052 1.143-.013.187-.026.374-.039.566.225.117.451.16.7.16.318 0 .613-.06.882-.158a.768.768 0 01.953.404.768.768 0 01-.346 1.033c-.435.225-.973.36-1.535.42-.066.193-.16.45-.291.71.515 1.793 2.04 2.077 2.27 2.107a.448.448 0 01.354.566c-.236.733-1.466.984-1.997 1.069-.018.103-.052.207-.092.336-.04.137-.21.252-.498.252h-.014c-.179 0-.4-.029-.713-.087a3.842 3.842 0 00-.726-.066c-.272 0-.546.024-.86.078-.59.103-1.099.512-1.7.99-.858.683-1.83 1.458-3.36 1.458-.066 0-.131-.003-.197-.007h-.158c-1.53 0-2.502-.775-3.36-1.459-.6-.477-1.11-.886-1.7-.99a4.946 4.946 0 00-.86-.077c-.354 0-.624.054-.85.099a4.21 4.21 0 01-.589.073c-.354 0-.482-.215-.518-.337-.04-.13-.07-.232-.092-.336-.531-.085-1.761-.336-1.997-1.07a.448.448 0 01.354-.565c.23-.03 1.755-.314 2.27-2.107-.131-.26-.225-.518-.291-.71-.562-.06-1.1-.196-1.535-.42a.768.768 0 01-.346-1.033.768.768 0 01.953-.405c.269.098.564.158.882.158.249 0 .476-.043.7-.16-.013-.192-.026-.379-.039-.566-.026-.375-.052-.749-.052-1.143 0-.99.22-1.957.732-2.829.745-1.267 2.061-2.156 3.534-2.397.354-.058.71-.083 1.105-.097z" />
        </svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#171a20] text-white text-xs font-medium whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none shadow-lg">
          @ai-clean
        </span>
      </motion.a>
    </div>
  )
}
