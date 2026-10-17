import { useEffect, useState } from 'react'
import { Reveal, SectionTag, MagButton } from './UI'

const STORAGE_KEY = 'servihouse_warranties'
const DAYS = { original: 365, generico: 30 }

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
function save(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) } catch {}
}
function daysLeft(w) {
  const total = DAYS[w.part] ?? 365
  const start = new Date(w.date)
  const end = new Date(start.getTime() + total * 86400000)
  const diff = Math.ceil((end - new Date()) / 86400000)
  return diff
}

export function Warranty() {
  const [list, setList] = useState([])
  const [equipo, setEquipo] = useState('')
  const [fecha, setFecha] = useState('')
  const [parte, setParte] = useState('original')

  useEffect(() => { setList(load()) }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!equipo || !fecha) return
    const entry = { id: Date.now(), equipo, date: fecha, part: parte }
    const next = [entry, ...list]
    setList(next)
    save(next)
    setEquipo('')
    setFecha('')
    setParte('original')
  }

  const remove = (id) => {
    const next = list.filter((w) => w.id !== id)
    setList(next)
    save(next)
  }

  return (
    <section id="garantias" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <SectionTag>Garantías</SectionTag>
          <h2 className="font-display text-[clamp(24px,3.2vw,34px)] font-medium tracked-up text-white">Registra tu garantía</h2>
          <p className="mt-3 text-[15px] text-slate-400">Guarda el equipo y la fecha de servicio en este dispositivo y calculamos los días que te quedan.</p>
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} className="glass grid grid-cols-1 gap-4 rounded-2xl p-6 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-end">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-400">Equipo</span>
              <input
                value={equipo}
                onChange={(e) => setEquipo(e.target.value)}
                placeholder="Ej. Refrigeradora Samsung"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-white/40"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-400">Fecha de servicio</span>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white/40 [color-scheme:dark]"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-slate-400">Repuesto</span>
              <select
                value={parte}
                onChange={(e) => setParte(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none focus:border-white/40"
              >
                <option value="original" className="bg-[#0a1230]">Original (1 año)</option>
                <option value="generico" className="bg-[#0a1230]">Genérico (30 días)</option>
              </select>
            </label>
            <button
              type="submit"
              data-magnetic
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-2.5 font-display text-xs font-bold text-slate-950 shadow-[0_8px_30px_-6px_rgba(46,139,255,0.6)]"
            >
              Registrar
            </button>
          </form>
        </Reveal>

        {list.length > 0 && (
          <Reveal delay={0.1} className="mt-6 space-y-3">
            {list.map((w) => {
              const left = daysLeft(w)
              const expired = left < 0
              return (
                <div key={w.id} className="glass flex items-center justify-between rounded-2xl p-4 sm:p-5">
                  <div>
                    <h4 className="font-display text-sm font-bold text-white">{w.equipo}</h4>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {w.part === 'original' ? 'Repuesto original' : 'Repuesto genérico'} · desde {new Date(w.date).toLocaleDateString('es-EC')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-display text-xs font-bold ${expired ? 'text-red-400' : 'text-cyan-300'}`}>
                      {expired ? 'Vencida' : `${left} días restantes`}
                    </span>
                    <button onClick={() => remove(w.id)} aria-label="Eliminar" className="text-slate-500 hover:text-red-400">✕</button>
                  </div>
                </div>
              )
            })}
          </Reveal>
        )}

        <Reveal delay={0.15} className="mt-8 text-center">
          <MagButton href="https://wa.me/593939195170?text=Hola%20ServiHouse%2C%20tengo%20una%20consulta%20sobre%20mi%20garant%C3%ADa" target="_blank" rel="noopener" variant="ghost">
            💬 Consultar una garantía
          </MagButton>
        </Reveal>
      </div>
    </section>
  )
}
