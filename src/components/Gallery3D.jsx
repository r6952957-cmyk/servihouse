import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Reveal, SectionTag } from './UI'

const items = [
  ['local-comercial.jpg', 'Instalación comercial'],
  ['aire-techo-1.jpg', 'Aire en azotea'],
  ['generadores.jpg', 'Generadores instalados'],
  ['galeria-24.jpg', 'Equipos Samsung en azotea'],
  ['soldadura.jpg', 'Trabajo de soldadura'],
  ['galeria-16.jpg', 'Equipos de aire acondicionado'],
  ['descarga-generador.jpg', 'Descarga de generador'],
  ['galeria-19.jpg', 'Reparación de televisor'],
  ['cuarto-frio.jpg', 'Cuarto frío industrial'],
  ['galeria-03.jpg', 'Montaje de equipos'],
  ['galeria-05.jpg', 'Instalación en local comercial'],
  ['refrigeracion.jpg', 'Mantenimiento de refrigeración'],
]

const COUNT = items.length
const SPACING = 230
const IDLE_SPEED = 0.085 // "items" per second — the wheel's own constant drift

function CarouselItem({ angle, index, img, alt, onSelect }) {
  const diff = useTransform(angle, (a) => {
    let d = index - a
    d = ((d % COUNT) + COUNT) % COUNT
    if (d > COUNT / 2) d -= COUNT
    return d
  })
  const abs = useTransform(diff, (d) => Math.abs(d))
  const x = useTransform(diff, (d) => d * SPACING)
  const rotateY = useTransform(diff, (d) => d * -28)
  const z = useTransform(abs, (a) => -a * 160)
  const scale = useTransform(abs, (a) => Math.max(1 - a * 0.12, 0.4))
  const opacity = useTransform(abs, (a) => Math.max(1 - a * 0.26, 0))
  const zIndex = useTransform(abs, (a) => Math.round(100 - a * 10))
  const dim = useTransform(abs, (a) => (a < 0.5 ? 0 : 0.4))
  const captionOpacity = useTransform(abs, (a) => (a < 0.5 ? 1 - a * 2 : 0))

  return (
    <motion.div
      onClick={() => onSelect(index)}
      style={{
        x, rotateY, z, scale, opacity, zIndex,
        position: 'absolute',
        inset: 0,
        margin: 'auto',
        width: 'min(78vw, 380px)',
        height: '100%',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[26px] border border-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]">
        <img src={`/assets/${img}`} alt={alt} draggable={false} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#02040a]/80 via-transparent to-transparent" />
        <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-[#02040a]" />
        <motion.span
          style={{ opacity: captionOpacity }}
          className="glass absolute bottom-4 left-4 right-4 rounded-xl px-4 py-2.5 font-display text-sm font-bold text-white"
        >
          {alt}
        </motion.span>
      </div>
    </motion.div>
  )
}

export function Gallery3D() {
  const angle = useMotionValue(0)
  const [nearest, setNearest] = useState(0)
  const drag = useRef({ active: false, lastX: 0, lastT: 0 })
  const velocity = useRef(IDLE_SPEED)
  const transitioning = useRef(false)
  const lastTime = useRef(null)

  useEffect(() => {
    let raf
    const loop = (t) => {
      if (lastTime.current == null) lastTime.current = t
      const dt = Math.min((t - lastTime.current) / 1000, 0.05)
      lastTime.current = t

      if (!drag.current.active && !transitioning.current) {
        angle.set(angle.get() + velocity.current * dt)
        // velocity relaxes back toward the idle drift speed, never fully stopping
        velocity.current += (IDLE_SPEED - velocity.current) * Math.min(dt * 1.6, 1)
      }

      const r = Math.round(angle.get()) % COUNT
      const n = ((r % COUNT) + COUNT) % COUNT
      setNearest((prev) => (prev === n ? prev : n))

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [angle])

  const onPointerDown = (e) => {
    drag.current = { active: true, lastX: e.clientX, lastT: performance.now() }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.current.active) return
    const now = performance.now()
    const dx = e.clientX - drag.current.lastX
    const dt = Math.max(now - drag.current.lastT, 1)
    const delta = (-dx / 180)
    angle.set(angle.get() + delta)
    velocity.current = (delta / (dt / 1000)) * 0.3
    drag.current.lastX = e.clientX
    drag.current.lastT = now
  }
  const endDrag = () => { drag.current.active = false }

  const nudge = useCallback((dir) => {
    velocity.current = IDLE_SPEED + dir * 2.1
  }, [])

  const goTo = useCallback((index) => {
    let target = index
    const current = angle.get()
    while (target - current > COUNT / 2) target -= COUNT
    while (target - current < -COUNT / 2) target += COUNT
    transitioning.current = true
    animate(angle, target, {
      type: 'spring',
      stiffness: 90,
      damping: 18,
      onComplete: () => { transitioning.current = false },
    })
  }, [angle])

  return (
    <section id="trabajos" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-4 max-w-xl text-center">
          <SectionTag>Trabajos realizados</SectionTag>
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">Arrastra y explora en 3D</h2>
          <p className="mt-3 text-[15px] text-slate-400">Climatización, cuartos fríos, generadores y energía solar para hogares y negocios.</p>
        </Reveal>

        <div
          className="relative mt-10 h-[340px] touch-none select-none sm:h-[380px]"
          style={{ perspective: '1400px' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
        >
          <div className="absolute inset-0 cursor-grab active:cursor-grabbing" style={{ transformStyle: 'preserve-3d' }}>
            {items.map(([img, alt], i) => (
              <CarouselItem key={img} angle={angle} index={i} img={img} alt={alt} onSelect={goTo} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() => nudge(-1)}
            data-magnetic
            aria-label="Anterior"
            className="glass grid h-11 w-11 place-items-center rounded-full text-lg text-white transition-transform hover:scale-105"
          >
            ‹
          </button>
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === nearest ? 'w-6 bg-cyan-300' : 'w-1.5 bg-white/25'}`}
              />
            ))}
          </div>
          <button
            onClick={() => nudge(1)}
            data-magnetic
            aria-label="Siguiente"
            className="glass grid h-11 w-11 place-items-center rounded-full text-lg text-white transition-transform hover:scale-105"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
