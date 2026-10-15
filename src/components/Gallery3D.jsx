import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
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
const MAX_VISIBLE = 4

function shortestDiff(i, active) {
  let d = i - active
  if (d > COUNT / 2) d -= COUNT
  if (d < -COUNT / 2) d += COUNT
  return d
}

export function Gallery3D() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const dragX = useRef(0)

  const go = useCallback((dir) => {
    setActive((a) => (a + dir + COUNT) % COUNT)
  }, [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => go(1), 4200)
    return () => clearInterval(t)
  }, [paused, go])

  const onDragEnd = (_, info) => {
    const threshold = 70
    if (info.offset.x < -threshold || info.velocity.x < -500) go(1)
    else if (info.offset.x > threshold || info.velocity.x > 500) go(-1)
    dragX.current = 0
  }

  return (
    <section id="trabajos" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-4 max-w-xl text-center">
          <SectionTag>Trabajos realizados</SectionTag>
          <h2 className="font-display text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">Arrastra y explora en 3D</h2>
          <p className="mt-3 text-[15px] text-slate-400">Climatización, cuartos fríos, generadores y energía solar para hogares y negocios.</p>
        </Reveal>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mt-10 h-[340px] select-none sm:h-[380px]"
          style={{ perspective: '1400px' }}
        >
          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={onDragEnd}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {items.map(([img, alt], i) => {
              const diff = shortestDiff(i, active)
              const abs = Math.abs(diff)
              if (abs > MAX_VISIBLE) return null
              const isActive = diff === 0
              const x = diff * SPACING
              const rotateY = diff * -32
              const z = -abs * 170
              const scale = isActive ? 1 : 1 - abs * 0.1
              const opacity = abs > MAX_VISIBLE - 1 ? 0 : 1 - abs * 0.22

              return (
                <motion.div
                  key={img}
                  onClick={() => !isActive && setActive(i)}
                  animate={{ x, rotateY, z, scale, opacity }}
                  transition={{ type: 'spring', stiffness: 260, damping: 32 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    margin: 'auto',
                    width: 'min(78vw, 380px)',
                    height: '100%',
                    zIndex: MAX_VISIBLE - abs,
                    transformStyle: 'preserve-3d',
                  }}
                  className={isActive ? '' : 'cursor-pointer'}
                >
                  <div className="group relative h-full w-full overflow-hidden rounded-[26px] border border-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]">
                    <img
                      src={`/assets/${img}`}
                      alt={alt}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02040a]/80 via-transparent to-transparent" />
                    {isActive && (
                      <span className="glass absolute bottom-4 left-4 right-4 rounded-xl px-4 py-2.5 font-display text-sm font-bold text-white">
                        {alt}
                      </span>
                    )}
                    {!isActive && <div className="absolute inset-0 bg-[#02040a]/35" />}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() => go(-1)}
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
                onClick={() => setActive(i)}
                aria-label={`Ir a la foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-cyan-300' : 'w-1.5 bg-white/25'}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
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
