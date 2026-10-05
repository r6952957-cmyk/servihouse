import { useEffect, useRef } from 'react'

// Lightweight canvas particle field — no extra dependency, GPU-cheap,
// pauses when the tab is hidden and respects reduced-motion.
export default function ParticleField({ density = 90 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, dpr
    let particles = []
    let raf
    let visible = true

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const init = () => {
      const count = Math.round((w * h) / 18000) + density * 0.3
      particles = Array.from({ length: Math.min(count, 160) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.03 - Math.random() * 0.1,
        a: 0.15 + Math.random() * 0.35,
        hue: Math.random() < 0.6 ? 205 : 190,
      }))
    }

    resize()
    init()

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w }
        if (p.x < -5) p.x = w + 5
        if (p.x > w + 5) p.x = -5
        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      if (visible && !reduced) raf = requestAnimationFrame(draw)
    }

    if (!reduced) raf = requestAnimationFrame(draw)
    else { particles.forEach(p => { ctx.beginPath(); ctx.fillStyle = `hsla(${p.hue},90%,65%,${p.a})`; ctx.arc(p.x,p.y,p.r,0,7); ctx.fill() }) }

    const onResize = () => { resize(); init() }
    const onVis = () => {
      visible = document.visibilityState === 'visible'
      if (visible && !reduced) raf = requestAnimationFrame(draw)
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [density])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
}
