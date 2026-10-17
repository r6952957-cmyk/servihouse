import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal, SectionTag, TiltCard, MagButton } from './UI'

const catalog = [
  { id: 'linea-blanca', img: 'lavadora.jpg', icon: '🧺', title: 'Línea blanca', desc: 'Refrigeradores, lavadoras, secadoras y cocinas.' },
  { id: 'aires', img: 'aire-techo-1.jpg', icon: '❄️', title: 'Aires acondicionados', desc: 'Split, inverter y sistemas VRF.' },
  { id: 'cuartos-frios', img: 'cuarto-frio.jpg', icon: '🧊', title: 'Cuartos fríos', desc: 'Paneles, unidades y mantenimiento.' },
  { id: 'electronica', img: 'galeria-25.jpg', icon: '💻', title: 'Electrónica y TV', desc: 'Televisores, laptops y placas.' },
  { id: 'energia', img: 'generador.jpg', icon: '🔌', title: 'Generadores y energía', desc: 'Generadores y paneles solares.' },
]

export function Store() {
  const [quote, setQuote] = useState([])

  const add = (item) => {
    setQuote((q) => (q.find((x) => x.id === item.id) ? q : [...q, item]))
  }
  const remove = (id) => setQuote((q) => q.filter((x) => x.id !== id))

  const waLink = useMemo(() => {
    if (quote.length === 0) return 'https://wa.me/593939195170'
    const lines = quote.map((q) => `• ${q.title}`).join('\n')
    const text = encodeURIComponent(`Hola ServiHouse, quiero cotizar:\n${lines}`)
    return `https://wa.me/593939195170?text=${text}`
  }, [quote])

  return (
    <section id="tienda" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <SectionTag>Tienda</SectionTag>
          <h2 className="font-display text-[clamp(24px,3.2vw,34px)] font-medium tracked-up text-white">Arma tu cotización</h2>
          <p className="mt-3 text-[15px] text-slate-400">Elige los equipos que necesitas y envíanos tu lista directo por WhatsApp.</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((item, i) => {
            const added = quote.some((q) => q.id === item.id)
            return (
              <Reveal key={item.id} delay={i * 0.06}>
                <TiltCard className="h-full" style={{ height: '100%' }}>
                  <div className="relative h-36 overflow-hidden">
                    <img src={`/assets/${item.img}`} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/20 to-transparent" />
                  </div>
                  <div className="relative z-10 p-5">
                    <span className="mb-2.5 inline-grid h-9 w-9 place-items-center rounded-[11px] bg-white/5 border border-white/15 text-lg">{item.icon}</span>
                    <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-[13px] text-slate-400">{item.desc}</p>
                    <button
                      onClick={() => add(item)}
                      disabled={added}
                      data-magnetic
                      className={`mt-4 w-full rounded-full py-2.5 font-display text-xs font-bold transition-colors ${
                        added ? 'glass text-cyan-300' : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-slate-950'
                      }`}
                    >
                      {added ? '✓ Agregado a tu cotización' : 'Agregar a mi cotización'}
                    </button>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Floating quote panel */}
      <AnimatePresence>
        {quote.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass fixed bottom-6 left-1/2 z-40 w-[92vw] max-w-sm -translate-x-1/2 rounded-2xl p-4 sm:left-6 sm:translate-x-0"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="font-display text-sm font-bold text-white">Tu cotización ({quote.length})</span>
            </div>
            <div className="mb-3 max-h-28 space-y-1.5 overflow-y-auto noscrollbar">
              {quote.map((q) => (
                <div key={q.id} className="flex items-center justify-between text-xs text-slate-300">
                  <span>{q.title}</span>
                  <button onClick={() => remove(q.id)} className="text-slate-500 hover:text-red-400">✕</button>
                </div>
              ))}
            </div>
            <MagButton href={waLink} target="_blank" rel="noopener" variant="primary" className="w-full justify-center px-4 py-2.5 text-xs">
              💬 Enviar cotización por WhatsApp
            </MagButton>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
