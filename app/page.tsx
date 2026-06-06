import Cursor from '@/components/Cursor'
import ScrollProgress from '@/components/ScrollProgress'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'

export default function Home() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <main className="min-h-screen overflow-x-hidden">
        <Navigation />
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Contact />
        <Footer />
      </main>
      <FloatingActions />
    </>
  )
}
