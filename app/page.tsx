import Cursor from '@/components/Cursor'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Cursor />
      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navigation />
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
