import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingActions from '@/components/FloatingActions'

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-background overflow-x-hidden">
        <Navigation />
        <Hero />
        <Services />
        <About />
        <Contact />
        <Footer />
      </main>
      <FloatingActions />
    </>
  )
}
