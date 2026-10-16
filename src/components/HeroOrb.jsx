import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

/* Soft radial-gradient glow texture — center bright, fading fully to
   transparent at the edge, so the backing halo reads as light rather
   than a flat tinted panel. */
function useGlowTexture(size = 512) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0, 'rgba(120,190,255,0.9)')
    grad.addColorStop(0.35, 'rgba(70,150,255,0.45)')
    grad.addColorStop(1, 'rgba(20,60,160,0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.needsUpdate = true
    return tex
  }, [size])
}

/* Draws the square logo onto a circular-clipped canvas so it reads as a
   clean coin/medallion face instead of a distorted radial UV map. */
function useCircularLogoTexture(src, size = 512) {
  const [texture, setTexture] = useState(null)
  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      ctx.save()
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      const scale = Math.max(size / img.width, size / img.height)
      const w = img.width * scale
      const h = img.height * scale
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h)
      ctx.restore()
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.needsUpdate = true
      setTexture(tex)
    }
    img.src = src
    return () => { cancelled = true }
  }, [src, size])
  return texture
}

function Medallion() {
  const group = useRef()
  const outerRing = useRef()
  const innerRing = useRef()
  const innerRingMat = useRef()
  const badge = useRef()
  const haloMat = useRef()
  const quickRotY = useRef(null)
  const quickPosX = useRef(null)
  const quickPosY = useRef(null)
  const texture = useCircularLogoTexture('/assets/logo-icon.jpg')
  const glowTex = useGlowTexture()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elastic entrance — pops in with a satisfying overshoot
      gsap.fromTo(
        group.current.scale,
        { x: 0.2, y: 0.2, z: 0.2 },
        { x: 1, y: 1, z: 1, duration: 1.6, ease: 'elastic.out(1, 0.5)' }
      )
      gsap.fromTo(
        group.current.rotation,
        { y: -Math.PI },
        { y: 0, duration: 1.8, ease: 'elastic.out(1, 0.6)' }
      )

      // Outer chrome ring: fast, fluid continuous spin
      gsap.to(outerRing.current.rotation, {
        z: `+=${Math.PI * 2}`,
        duration: 5,
        repeat: -1,
        ease: 'none',
      })
      // Inner accent ring: counter-rotating, slightly faster — reads as mechanical, geared motion
      gsap.to(innerRing.current.rotation, {
        z: `-=${Math.PI * 2}`,
        duration: 3.4,
        repeat: -1,
        ease: 'none',
      })

      // Badge sway with elastic snap at each end, so the logo settles with a little bounce
      gsap.to(badge.current.rotation, {
        y: 0.5,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: 'elastic.out(1, 0.35)',
      })
      gsap.to(badge.current.rotation, {
        x: 0.12,
        duration: 2.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Breathing scale pulse on the whole medallion
      gsap.to(group.current.scale, {
        x: 1.045,
        y: 1.045,
        z: 1.045,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.6,
      })

      // Shimmering glow pulse on the cyan accent ring + halo
      if (innerRingMat.current) {
        gsap.to(innerRingMat.current, {
          emissiveIntensity: 2.6,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      if (haloMat.current) {
        gsap.to(haloMat.current, {
          opacity: 0.75,
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // Smooth, springy pointer-follow using gsap's quickTo (overwrite-safe for rapid updates)
      quickRotY.current = gsap.quickTo(group.current.rotation, 'y', { duration: 0.9, ease: 'power3.out' })
      quickPosX.current = gsap.quickTo(group.current.position, 'x', { duration: 0.9, ease: 'power3.out' })
      quickPosY.current = gsap.quickTo(group.current.position, 'y', { duration: 0.9, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])

  const handleMove = (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1
    const ny = -((e.clientY / window.innerHeight) * 2 - 1)
    quickRotY.current?.(nx * 0.55)
    quickPosX.current?.(nx * 0.55)
    quickPosY.current?.(ny * 0.3)
  }

  // Gentle continuous bob stays on useFrame — cheap, and layers nicely under the gsap tweens
  useFrame((state) => {
    if (group.current) {
      group.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.08
    }
  })

  return (
    <group ref={group} onPointerMove={handleMove}>
      <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.5}>
        {/* soft additive halo behind everything — radial gradient, no hard edge */}
        <mesh position={[0, 0, -0.3]}>
          <planeGeometry args={[4.4, 4.4]} />
          <meshBasicMaterial
            ref={haloMat}
            map={glowTex}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        {/* outer chrome ring */}
        <mesh ref={outerRing} rotation={[Math.PI / 2.25, 0, 0]}>
          <torusGeometry args={[1.56, 0.1, 32, 140]} />
          <meshPhysicalMaterial
            color="#b7cbf2"
            metalness={1}
            roughness={0.14}
            clearcoat={1}
            clearcoatRoughness={0.08}
            reflectivity={1}
            emissive="#0a3a8a"
            emissiveIntensity={0.18}
          />
        </mesh>
        {/* thin glowing accent ring */}
        <mesh ref={innerRing} rotation={[Math.PI / 2.25, 0, 0]}>
          <torusGeometry args={[1.24, 0.024, 16, 140]} />
          <meshStandardMaterial ref={innerRingMat} color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.6} metalness={0.4} roughness={0.3} />
        </mesh>
        {/* medallion face */}
        <group ref={badge}>
          <mesh>
            <circleGeometry args={[1.1, 64]} />
            <meshPhysicalMaterial color="#0d1636" metalness={0.65} roughness={0.32} clearcoat={0.6} />
          </mesh>
          {texture && (
            <mesh position={[0, 0, 0.012]}>
              <planeGeometry args={[1.95, 1.95]} />
              <meshBasicMaterial map={texture} transparent toneMapped={false} />
            </mesh>
          )}
        </group>
      </Float>
      <Sparkles count={120} scale={4.6} size={3} speed={0.55} color="#9df3ff" opacity={0.8} />
    </group>
  )
}

function RigLights() {
  const rim = useRef()
  useEffect(() => {
    if (!rim.current) return
    const tween = gsap.to(rim.current, {
      intensity: 55,
      duration: 1.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    return () => tween.kill()
  }, [])
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={70} color="#2e8bff" />
      <pointLight ref={rim} position={[-4, -2, -3]} intensity={50} color="#00e5ff" />
      <pointLight position={[0, 4, -4]} intensity={24} color="#8b5cf6" />
      <pointLight position={[0, -3, 3]} intensity={16} color="#ffffff" />
      <spotLight position={[0, 6, 6]} angle={0.5} penumbra={1} intensity={38} color="#dbe8ff" />
    </>
  )
}

export default function HeroOrb() {
  const dpr = useMemo(() => Math.min(window.devicePixelRatio || 1, 2), [])
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      frameloop="always"
    >
      <RigLights />
      <Medallion />
      <fog attach="fog" args={['#02040a', 5, 10]} />
    </Canvas>
  )
}
