import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { MagButton } from './UI'
import ParticleField from './ParticleField'

const HeroOrb = lazy(() => import('./HeroOrb'))

const stats = [
  ['12+', 'Categorías de servicio'],
  ['1 año', 'Garantía en originales'],
  ['14+', 'Marcas atendidas'],
  ['Mismo día', 'Respuesta en Quito'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] } }),
}

export default function Hero() {
  return (
    <header id="top" className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <ParticleField density={70} />
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            'radial-gradient(900px 600px at 12% -6%, rgba(11,63,166,0.25), transparent 60%),' +
            'radial-gradient(760px 620px at 100% 18%, rgba(0,194,255,0.16), transparent 60%),' +
            'radial-gradient(900px 700px at 50% 108%, rgba(16,70,199,0.22), transparent 60%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <motion.div
            variants={fadeUp} custom={0} initial="hidden" animate="show"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-cyan-300"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_10px_#00e5ff]" />
            Servicio técnico autorizado en Quito
          </motion.div>

          <motion.h1
            variants={fadeUp} custom={1} initial="hidden" animate="show"
            className="font-display text-[clamp(36px,5.4vw,60px)] font-extrabold leading-[1.03] text-white"
          >
            Tu hogar funcionando, con <span className="text-gradient">tecnología e ingeniería</span> de verdad.
          </motion.h1>

          <motion.p
            variants={fadeUp} custom={2} initial="hidden" animate="show"
            className="mt-6 max-w-md text-[17px] leading-relaxed text-slate-400"
          >
            Reparación e instalación de línea blanca, electrónica, aires acondicionados, cuartos fríos y energía renovable. Técnicos certificados, el mismo día, con garantía por escrito.
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show" className="mt-9 flex flex-wrap gap-4">
            <MagButton href="https://wa.me/593939195170" target="_blank" rel="noopener" variant="primary" label="Chat">
              💬 Agendar por WhatsApp
            </MagButton>
            <MagButton href="#servicios" variant="ghost">
              Ver todos los servicios →
            </MagButton>
          </motion.div>

          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="show" className="mt-12 flex flex-wrap gap-x-9 gap-y-5">
            {stats.map(([n, l]) => (
              <div key={l}>
                <b className="block font-display text-2xl font-extrabold text-white">{n}</b>
                <span className="text-[11px] uppercase tracking-wide text-slate-500">{l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[480px]"
        >
          <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-sm text-slate-500">Cargando escena 3D…</div>}>
            <HeroOrb />
          </Suspense>

          <div className="glass absolute -right-4 top-4 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-right-8 sm:top-6">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-[9px] bg-gradient-to-br from-blue-500 to-cyan-400 text-sm">🛡️</span>
            <span className="font-display text-xs font-bold text-white">Garantía por escrito</span>
          </div>
          <div className="glass absolute -left-4 bottom-10 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-left-8">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-[9px] bg-gradient-to-br from-blue-500 to-cyan-400 text-sm">⚡</span>
            <span className="font-display text-xs font-bold text-white">Atención el mismo día</span>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
