import { softShadows, OrbitControls, Preload } from '@react-three/drei'
import { Canvas, useFrame, useThree } from "@react-three/fiber"


export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas shadows camera={{ position: [.5, 8, 5], fov: 60 }} {...props}>

      <fog attach="fog" args={["white", 0, 40]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 0, -20]} color="blue" intensity={3.5} />
      <pointLight position={[0, -10, 0]} color="yellow" intensity={3.5} />
      <pointLight position={[10, 0, 20]} color="red" intensity={3.5} />
      {children}
      <Preload all />
      <OrbitControls enableRotate={false} target={[.5, .5, 0]}/>
    </Canvas>
  )
}
