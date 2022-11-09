import * as THREE from 'three'
import { useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import { Line, useCursor, MeshDistortMaterial } from '@react-three/drei'

export default function Blob({ route, ...props }) {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  const [hovered2, hover2] = useState(false)
  const mesh = useRef(null)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])
  useCursor(hovered)
  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh
        onClick={() => router.push(route)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        {...props}>

        <sphereGeometry args={[1.2, 100, 100]} />
        <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>

      <mesh
        onClick={() => router.push(route)}
        onPointerOver={() => hover2(true)}
        onPointerOut={() => hover2(false)}
        position={[3, 3, 0.5]}
        {...props} >

        <sphereGeometry args={[1.6, 100, 100]} />
        <MeshDistortMaterial distort={1} speed={5} roughness={0.1} color={hovered2 ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>

  )
}
