import { motion } from 'framer-motion'
import { MagButton } from './UI'

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#trabajos', label: 'Trabajos' },
  { href: '#tienda', label: 'Tienda' },
  { href: '#garantias', label: 'Garantías' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Nav() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0b0b0b]/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" data-magnetic className="flex items-center gap-2.5 font-display text-[13px] font-medium tracked-up text-white">
          <img src="/assets/logo-icon.jpg" alt="ServiHouse" className="h-7 w-7 rounded-full object-cover" />
          ServiHouse
        </a>
        <div className="hidden items-center gap-8 font-display text-[11px] font-medium tracked-up text-slate-300 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} data-magnetic className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
        <MagButton as="a" href="https://wa.me/593939195170" target="_blank" rel="noopener" variant="ghost" className="px-5 py-2.5 text-[11px]" label="Chat">
          WhatsApp
        </MagButton>
      </div>
    </motion.nav>
  )
}
