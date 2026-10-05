import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal, SectionTag, TiltCard, MagButton } from './UI'

/* ---------- Why us ---------- */
const why = [
  ['01', 'Garantía por escrito', '1 año en repuestos originales y 30 días en genéricos, firmada en cada trabajo.'],
  ['02', 'Técnicos certificados', 'Ingeniería en electrónica y línea blanca, identificados con uniforme.'],
  ['03', 'Repuestos originales', 'Compatibles y certificados para cada marca y modelo.'],
  ['04', 'Atención el mismo día', 'Coordinamos la visita técnica en la mayoría de sectores de Quito.'],
]

export function WhyUs() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <SectionTag>Por qué elegirnos</SectionTag>
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">Confianza desde la primera llamada</h2>
          <p className="mt-3 text-[15px] text-slate-400">Procesos claros, técnicos identificados y comunicación directa contigo, de principio a fin.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.08}>
              <div className="glass h-full rounded-2xl p-6">
                <div className="mb-3 font-display text-sm font-bold text-cyan-300">{n}</div>
                <h3 className="mb-1.5 font-display text-base font-bold text-white">{t}</h3>
                <p className="text-[13px] text-slate-400">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Services ---------- */
const services = [
  { img: 'lavadora.jpg', icon: '🧺', title: 'Línea blanca', desc: 'Refrigeradores, lavadoras, secadoras, cocinas y hornos de todas las marcas.', big: true, q: 'l%C3%ADnea%20blanca' },
  { img: 'aire-instalacion.jpg', icon: '❄️', title: 'Aires acondicionados', desc: 'Instalación, carga y mantenimiento.', q: 'aires%20acondicionados' },
  { img: 'cuarto-frio.jpg', icon: '🧊', title: 'Cuartos fríos', desc: 'Construcción e instalación industrial.', q: 'cuartos%20fr%C3%ADos' },
  { img: 'galeria-25.jpg', icon: '💻', title: 'Electrónica y cómputo', desc: 'TV, laptops, placas e impresoras.', q: 'electr%C3%B3nica' },
  { img: 'generador.jpg', icon: '🔌', title: 'Generadores', desc: 'Diésel y gasolina, mantenimiento.', q: 'generadores' },
  { img: 'solar.jpg', icon: '☀️', title: 'Energía renovable', desc: 'Paneles solares y soluciones sustentables.', q: 'energ%C3%ADa%20solar' },
]

export function Services() {
  return (
    <section id="servicios" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <SectionTag>Catálogo completo</SectionTag>
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">Soluciones técnicas integrales</h2>
          <p className="mt-3 text-[15px] text-slate-400">Línea blanca, electrónica, climatización, refrigeración industrial, energía renovable y seguridad.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ gridAutoRows: '230px' }}>
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className={s.big ? 'sm:col-span-2 sm:row-span-2' : ''}>
              <TiltCard
                href={`https://wa.me/593939195170?text=Hola%20ServiHouse%2C%20quiero%20cotizar%20${s.q}`}
                magnetic
                className={`h-full ${s.big ? 'sm:row-span-2' : ''}`}
                style={{ height: '100%' }}
              >
                <img src={`/assets/${s.img}`} alt={s.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/10 to-transparent" />
                <div className="relative z-10 flex h-full flex-col justify-end p-5">
                  <span className="mb-2.5 grid h-9 w-9 place-items-center rounded-[11px] bg-gradient-to-br from-blue-500 to-cyan-400 text-lg shadow-[0_6px_18px_rgba(46,139,255,0.5)]">{s.icon}</span>
                  <h3 className={`font-display font-bold text-white ${s.big ? 'text-xl' : 'text-[15px]'}`}>{s.title}</h3>
                  <p className="mt-1 text-xs leading-snug text-slate-300">{s.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Gallery ---------- */
const gallery = [
  ['local-comercial.jpg', 'Instalación comercial', true],
  ['aire-techo-1.jpg', 'Aire en azotea'],
  ['generadores.jpg', 'Generadores instalados'],
  ['galeria-24.jpg', 'Equipos Samsung en azotea', true],
  ['soldadura.jpg', 'Trabajo de soldadura'],
  ['galeria-16.jpg', 'Equipos de aire acondicionado'],
  ['descarga-generador.jpg', 'Descarga de generador', true],
  ['galeria-19.jpg', 'Reparación de televisor'],
]

export function Gallery() {
  return (
    <section id="trabajos" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <SectionTag>Trabajos realizados</SectionTag>
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">Más allá de la línea blanca</h2>
          <p className="mt-3 text-[15px] text-slate-400">Climatización, cuartos fríos, generadores y energía solar para hogares y negocios.</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" style={{ gridAutoRows: '150px' }}>
          {gallery.map(([img, alt, tall], i) => (
            <Reveal key={img} delay={i * 0.04} className={tall ? 'row-span-2' : ''}>
              <a href={`/assets/${img}`} target="_blank" rel="noopener" data-magnetic className="group relative block h-full overflow-hidden rounded-2xl border border-white/10">
                <img src={`/assets/${img}`} alt={alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040aee] via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Videos ---------- */
const videos = [
  ['video-1.mp4', 'poster-1.jpg', 'Aires en azotea'],
  ['video-6.mp4', 'poster-6.jpg', 'Condensadora'],
  ['video-9.mp4', 'poster-9.jpg', 'Reparación de refrigeración'],
]

export function Videos() {
  const [playing, setPlaying] = useState(null)
  return (
    <section id="videos" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <SectionTag>Videos de servicio</SectionTag>
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">Míranos trabajar</h2>
          <p className="mt-3 text-[15px] text-slate-400">Clips reales de diagnóstico y reparación, directo desde el trabajo en campo.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {videos.map(([src, poster, label], i) => (
            <Reveal key={src} delay={i * 0.1}>
              <div
                data-magnetic
                onClick={(e) => { e.currentTarget.querySelector('video').play(); setPlaying(src) }}
                className="relative aspect-[9/13] cursor-pointer overflow-hidden rounded-3xl border border-white/10"
              >
                <video src={`/assets/${src}`} poster={`/assets/${poster}`} muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
                {playing !== src && (
                  <div className="absolute inset-0 grid place-items-center bg-[#02040a]/35">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-white/60 bg-black/40 text-xl backdrop-blur-sm">▶</span>
                  </div>
                )}
                <span className="glass absolute bottom-3 left-3 rounded-full px-3 py-1.5 font-display text-xs font-bold text-white">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Process ---------- */
const steps = [
  ['01', 'Agenda tu visita', 'Escríbenos por WhatsApp contándonos la falla. Coordinamos horario el mismo día.'],
  ['02', 'Diagnóstico en casa', 'Un técnico certificado revisa el equipo y te entrega un presupuesto claro antes de reparar.'],
  ['03', 'Reparación con garantía', 'Repuestos originales y garantía por escrito en cada trabajo.'],
]

export function Process() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <SectionTag>Cómo funciona</SectionTag>
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">Tu reparación en 3 pasos</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.1}>
              <div className="glass h-full rounded-2xl p-7">
                <div className="mb-3 font-display text-4xl font-extrabold text-transparent" style={{ WebkitTextStroke: '1.5px rgba(46,139,255,0.5)' }}>{n}</div>
                <h3 className="mb-2 font-display text-lg font-bold text-white">{t}</h3>
                <p className="text-sm text-slate-400">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Team + brands marquee ---------- */
const brands = ['Samsung', 'LG', 'Whirlpool', 'Sony', 'Electrolux', 'Montero', 'TEKA', 'Mabe', 'Indurama', 'Carrier']

export function Team() {
  return (
    <section id="equipo" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <SectionTag>Quién te atiende</SectionTag>
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">Ingeniería detrás de cada reparación</h2>
        </Reveal>
        <Reveal className="mx-auto max-w-2xl">
          <div className="glass flex flex-wrap items-center gap-7 rounded-2xl p-7">
            <img src="/assets/elvis.jpg" alt="Ing. Elvis Sevilla" className="h-28 w-28 flex-none rounded-2xl border border-white/10 object-cover" />
            <div>
              <h3 className="mb-1.5 font-display text-lg font-bold text-white">Ing. Elvis Sevilla</h3>
              <p className="text-sm text-slate-400">Fundador de ServiHouse, especializado en electrónica y línea blanca, con banco de pruebas propio para diagnósticos de precisión. Coordina personalmente cada visita técnica.</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="mt-10 overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)' }}>
          <div className="flex w-max gap-3.5 animate-[marquee_28s_linear_infinite]">
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="glass whitespace-nowrap rounded-xl px-5 py-3 font-display text-sm font-bold text-slate-300">{b}</span>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`@keyframes marquee { to { transform: translateX(-50%); } }`}</style>
    </section>
  )
}

/* ---------- FAQ ---------- */
const faqs = [
  ['¿Cobran por la visita técnica?', 'Sí, cobramos una tarifa de revisión que se descuenta por completo del valor final si decides aceptar el presupuesto de reparación.'],
  ['¿Qué garantía tienen las reparaciones?', '1 año de garantía por escrito en repuestos originales, y 30 días en repuestos genéricos.'],
  ['¿En qué zonas dan servicio?', 'Atendemos Quito, los valles aledaños y también fuera de la ciudad, coordinando la visita según disponibilidad.'],
  ['¿Qué formas de pago aceptan?', 'Todas las tarjetas (Visa, Mastercard, Amex, Diners) y transferencias a Banco Pichincha o Banco Guayaquil.'],
  ['¿Cuánto tiempo toma la reparación?', 'Muchas se resuelven en la misma visita. Si se requiere un repuesto especial, te damos un tiempo estimado en el diagnóstico.'],
]

export function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <SectionTag>Preguntas frecuentes</SectionTag>
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">Resolvemos tus dudas</h2>
        </Reveal>
        <div className="space-y-3">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <Reveal key={q} delay={i * 0.05}>
                <div className="glass overflow-hidden rounded-2xl">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    data-magnetic
                    className="flex w-full items-center justify-between px-6 py-5 text-left font-display text-[15px] font-bold text-white"
                  >
                    {q}
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid h-6 w-6 flex-none place-items-center rounded-full border border-white/20 text-sm text-cyan-300">+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-5 text-sm text-slate-400">{a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- CTA + Footer ---------- */
export function CTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-blue-400/40 bg-gradient-to-br from-[#0a2a6b] via-[#07163d] to-[#031029] px-8 py-16 text-center shadow-[0_0_80px_-10px_rgba(46,139,255,0.55)]">
            <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(500px 300px at 50% 0%, rgba(0,229,255,0.15), transparent)' }} />
            <h2 className="font-display text-[clamp(24px,3.4vw,36px)] font-extrabold text-white">¿Tu electrodoméstico falló? Resolvámoslo hoy.</h2>
            <p className="mx-auto mt-3.5 max-w-md text-[#CBD9FF]">Cobertura en Quito y valles aledaños. Escríbenos directo o llámanos.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagButton href="https://wa.me/593939195170" target="_blank" rel="noopener" variant="primary" label="Chat">💬 Escribir por WhatsApp</MagButton>
              <MagButton href="tel:+593939195170" variant="ghost">📞 0939 195 170</MagButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-wrap justify-between gap-8">
          <div className="max-w-xs">
            <a href="#top" className="flex items-center gap-2.5 font-display text-base font-extrabold text-white">
              <img src="/assets/logo-icon.jpg" alt="ServiHouse" className="h-8 w-8 rounded-[10px] object-cover" />
              ServiHouse
            </a>
            <p className="mt-2.5 text-[13px] text-slate-500">Ingeniería en electrónica y línea blanca. Servicio técnico independiente en Quito. No somos servicio autorizado de marca.</p>
          </div>
          <div>
            <h4 className="mb-3.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">Navegación</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <a href="#servicios" className="block hover:text-cyan-300">Servicios</a>
              <a href="#trabajos" className="block hover:text-cyan-300">Trabajos</a>
              <a href="#equipo" className="block hover:text-cyan-300">Equipo</a>
              <a href="#faq" className="block hover:text-cyan-300">FAQ</a>
            </div>
          </div>
          <div>
            <h4 className="mb-3.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">Contacto</h4>
            <div className="space-y-2 text-sm text-slate-300">
              <a href="tel:+593939195170" className="block hover:text-cyan-300">📞 0939 195 170</a>
              <span className="block">📍 Quito, Ecuador</span>
              <span className="block">🕐 Lun–Sáb 8:00–18:00</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 pt-6 text-xs text-slate-500">
          <span>© 2026 ServiHouse. Todos los derechos reservados.</span>
          <span>Servicio técnico independiente.</span>
        </div>
      </div>
    </footer>
  )
}
