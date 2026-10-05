import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticCursor from './components/MagneticCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { WhyUs, Services, Gallery, Videos, Process, Team, FAQ, CTA, Footer } from './components/Sections'

function LoadingGate({ children }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 650)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[200] grid place-items-center bg-[#02040a]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <img src="/assets/logo-icon.jpg" alt="ServiHouse" className="h-10 w-10 animate-pulse rounded-[12px] object-cover shadow-[0_0_24px_rgba(46,139,255,0.7)]" />
              <span className="font-display text-lg font-extrabold text-white">
                Servi<span className="text-cyan-300">House</span>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      >
        {children}
      </motion.div>
    </>
  )
}

export default function App() {
  return (
    <LoadingGate>
      <MagneticCursor />
      <Nav />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Gallery />
        <Videos />
        <Process />
        <Team />
        <FAQ />
        <CTA />
      </main>
      <Footer />

      {/* Floating WhatsApp FAB */}
      <motion.a
        href="https://wa.me/593939195170"
        target="_blank"
        rel="noopener"
        data-magnetic
        data-cursor-label="Chat"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 text-2xl shadow-[0_10px_30px_-6px_rgba(16,185,129,0.6)]"
      >
        💬
      </motion.a>
    </LoadingGate>
  )
}
