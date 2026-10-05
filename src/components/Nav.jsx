import { motion } from 'framer-motion'
import { MagButton } from './UI'

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#trabajos', label: 'Trabajos' },
  { href: '#videos', label: 'Videos' },
  { href: '#equipo', label: 'Equipo' },
  { href: '#faq', label: 'FAQ' },
]

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 pl-4 sm:px-4">
        <a href="#top" data-magnetic className="flex items-center gap-2.5 font-display text-[15px] font-extrabold text-white">
          <img src="/assets/logo-icon.jpg" alt="ServiHouse" className="h-8 w-8 rounded-[10px] object-cover shadow-[0_0_14px_rgba(46,139,255,0.6)]" />
          Servi<span className="text-cyan-300">House</span>
        </a>
        <div className="hidden items-center gap-7 font-display text-[13px] font-semibold text-slate-300 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} data-magnetic className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <MagButton as="a" href="tel:+593939195170" variant="ghost" className="px-4 py-2.5 text-xs">
              📞 Llamar
            </MagButton>
          </div>
          <MagButton as="a" href="https://wa.me/593939195170" target="_blank" rel="noopener" variant="primary" className="px-4 py-2.5 text-xs sm:px-5 sm:text-sm" label="Chat">
            WhatsApp
          </MagButton>
        </div>
      </div>
    </motion.nav>
  )
}
