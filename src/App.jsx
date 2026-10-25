import { MotionConfig } from 'motion/react'
import Navbar from './components/Navbar'
import { Intro, ScrollProgress, WaveDivider } from './components/MotionKit'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import { BookingProvider } from './context/BookingContext'
import Hero from './sections/Hero'
import Explore from './sections/Explore'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BookingProvider>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-cream"
        >
          Pular para o conteúdo
        </a>
        <Intro />
        <ScrollProgress />
        <Navbar />
        <main id="conteudo">
          <Hero />
          <WaveDivider />
          <Explore />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </BookingProvider>
    </MotionConfig>
  )
}