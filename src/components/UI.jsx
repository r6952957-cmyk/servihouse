import { motion } from 'framer-motion'

export function MagButton({ as: As = 'a', href, onClick, target, rel, variant = 'primary', className = '', children, label }) {
  const base = 'relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-xs font-semibold tracked-up transition-all duration-300 will-change-transform'
  const styles = {
    primary: 'bg-[#ededea] text-[#0b0b0b] hover:bg-white',
    ghost: 'border border-white/20 text-white hover:border-white/50 hover:bg-white/5',
  }
  return (
    <As
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      data-magnetic
      data-cursor-label={label || ''}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </As>
  )
}

export function Reveal({ children, delay = 0, y = 32, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTag({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2.5 font-display text-[11px] font-medium tracked-up text-[#9a9a94]">
      <span className="h-px w-6 bg-[#4a4a46]" />
      {children}
    </div>
  )
}

export function TiltCard({ children, className = '', href, magnetic = false, style }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateZ(0)`
    e.currentTarget.style.setProperty('--mx', `${(e.clientX - r.left)}px`)
    e.currentTarget.style.setProperty('--my', `${(e.clientY - r.top)}px`)
  }
  const onLeave = (e) => { e.currentTarget.style.transform = '' }
  const Tag = href ? 'a' : 'div'
  return (
    <Tag
      href={href}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener' : undefined}
      data-magnetic={magnetic ? true : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141412]/80 transition-transform duration-300 ease-out [transform-style:preserve-3d] ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.1), transparent 70%)' }}
      />
      {children}
    </Tag>
  )
}
