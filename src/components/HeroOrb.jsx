import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'

function Orb() {
  const mesh = useRef()
  const [target, setTarget] = useState({ x: 0, y: 0 })
  const pointer = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    // smooth-follow the pointer (magnetic feel) + idle rotation
    pointer.current.x += (target.x - pointer.current.x) * 0.04
    pointer.current.y += (target.y - pointer.current.y) * 0.04
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.18 + pointer.current.x * 0.01
      mesh.current.rotation.x += delta * 0.06
      mesh.current.position.x = pointer.current.x * 0.6
      mesh.current.position.y = pointer.current.y * 0.4
    }
  })

  const handleMove = (e) => {
    setTarget({ x: (e.clientX / window.innerWidth) * 2 - 1, y: -((e.clientY / window.innerHeight) * 2 - 1) })
  }

  return (
    <group onPointerMove={handleMove}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={mesh} scale={1.7}>
          <icosahedronGeometry args={[1, 10]} />
          <MeshDistortMaterial
            color="#2e8bff"
            emissive="#0a3a8a"
            emissiveIntensity={0.6}
            distort={0.42}
            speed={1.6}
            roughness={0.15}
            metalness={0.85}
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>
      <Sparkles count={70} scale={4.2} size={2.4} speed={0.35} color="#7fdfff" opacity={0.7} />
    </group>
  )
}

function RigLights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={60} color="#2e8bff" />
      <pointLight position={[-4, -2, -3]} intensity={40} color="#00e5ff" />
      <pointLight position={[0, 4, -4]} intensity={25} color="#8b5cf6" />
    </>
  )
}

export default function HeroOrb() {
  const dpr = useMemo(() => Math.min(window.devicePixelRatio || 1, 2), [])
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      frameloop="always"
    >
      <RigLights />
      <Orb />
      <fog attach="fog" args={['#02040a', 5, 10]} />
    </Canvas>
  )
}
