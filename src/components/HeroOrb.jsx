import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'

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
  const badge = useRef()
  const [target, setTarget] = useState({ x: 0, y: 0 })
  const pointer = useRef({ x: 0, y: 0 })
  const texture = useCircularLogoTexture('/assets/logo-icon.jpg')

  useFrame((state, delta) => {
    pointer.current.x += (target.x - pointer.current.x) * 0.04
    pointer.current.y += (target.y - pointer.current.y) * 0.04

    // the chrome rings spin continuously, like a slow turning wheel/noria
    if (outerRing.current) outerRing.current.rotation.z += delta * 0.55
    if (innerRing.current) innerRing.current.rotation.z -= delta * 0.35

    // the logo face sways gently so the artwork stays legible
    if (badge.current) {
      badge.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.4
      badge.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.08
    }

    if (group.current) {
      group.current.rotation.y += delta * 0.1 + pointer.current.x * 0.012
      group.current.position.x = pointer.current.x * 0.5
      group.current.position.y = pointer.current.y * 0.3
    }
  })

  const handleMove = (e) => {
    setTarget({ x: (e.clientX / window.innerWidth) * 2 - 1, y: -((e.clientY / window.innerHeight) * 2 - 1) })
  }

  return (
    <group ref={group} onPointerMove={handleMove}>
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.55}>
        {/* outer chrome ring */}
        <mesh ref={outerRing} rotation={[Math.PI / 2.25, 0, 0]}>
          <torusGeometry args={[1.56, 0.095, 32, 140]} />
          <meshPhysicalMaterial
            color="#aec3ec"
            metalness={1}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
            emissive="#0a3a8a"
            emissiveIntensity={0.12}
          />
        </mesh>
        {/* thin glowing accent ring */}
        <mesh ref={innerRing} rotation={[Math.PI / 2.25, 0, 0]}>
          <torusGeometry args={[1.22, 0.022, 16, 140]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.5} metalness={0.4} roughness={0.3} />
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
      <Sparkles count={90} scale={4.3} size={2.6} speed={0.3} color="#9df3ff" opacity={0.7} />
    </group>
  )
}

function RigLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={70} color="#2e8bff" />
      <pointLight position={[-4, -2, -3]} intensity={50} color="#00e5ff" />
      <pointLight position={[0, 4, -4]} intensity={24} color="#8b5cf6" />
      <pointLight position={[0, -3, 3]} intensity={16} color="#ffffff" />
      <spotLight position={[0, 6, 6]} angle={0.5} penumbra={1} intensity={35} color="#dbe8ff" />
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
