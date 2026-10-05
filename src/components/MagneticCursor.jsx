import { useEffect, useRef, useState } from 'react'

// Custom magnetic cursor: a small dot + a ring that lags behind,
// and snaps/grows onto any element with [data-magnetic].
export default function MagneticCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(true)
  const state = useRef({
    mx: 0, my: 0, rx: 0, ry: 0, scale: 1, label: '',
  })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFine || reduced) { setEnabled(false); return }

    const dot = dotRef.current
    const ring = ringRef.current
    let magnet = null

    const onMove = (e) => {
      state.current.mx = e.clientX
      state.current.my = e.clientY
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%,-50%)`

      if (magnet) {
        const r = magnet.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const pull = 0.35
        state.current.rx = cx - (cx - e.clientX) * (1 - pull)
        state.current.ry = cy - (cy - e.clientY) * (1 - pull)
        magnet.style.transform = `translate(${(e.clientX - cx) * pull}px, ${(e.clientY - cy) * pull}px)`
      } else {
        state.current.rx = e.clientX
        state.current.ry = e.clientY
      }
    }

    const onOver = (e) => {
      const t = e.target.closest('[data-magnetic]')
      if (t) {
        magnet = t
        const label = t.getAttribute('data-cursor-label')
        ring.dataset.active = 'true'
        ring.style.setProperty('--scale', label ? '2.8' : '1.9')
        ring.textContent = label || ''
      }
    }
    const onOut = (e) => {
      const t = e.target.closest('[data-magnetic]')
      if (t) {
        if (magnet) magnet.style.transform = ''
        magnet = null
        ring.dataset.active = 'false'
        ring.style.setProperty('--scale', '1')
        ring.textContent = ''
      }
    }

    let raf
    const tick = () => {
      const curX = parseFloat(ring.dataset.x || state.current.rx)
      const curY = parseFloat(ring.dataset.y || state.current.ry)
      const nx = curX + (state.current.rx - curX) * 0.18
      const ny = curY + (state.current.ry - curY) * 0.18
      ring.dataset.x = nx
      ring.dataset.y = ny
      ring.style.transform = `translate3d(${nx}px, ${ny}px, 0) translate(-50%,-50%) scale(var(--scale,1))`
      raf = requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-cyan-300 mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        data-active="false"
        className="pointer-events-none fixed left-0 top-0 z-[998] grid h-10 w-10 place-items-center rounded-full border border-cyan-300/70 text-[9px] font-bold uppercase tracking-wider text-cyan-200 transition-[width,height,background-color] duration-200 data-[active=true]:bg-cyan-400/10"
        style={{ willChange: 'transform', ['--scale']: 1 }}
      />
    </>
  )
}
