import * as THREE from 'three'
import { useState, useRef, useMemo, Suspense } from 'react'
import { useRouter } from 'next/router'
import { Text3D, Center, useGLTF, useScroll, ScrollControls, Environment, Merged, Text, MeshReflectorMaterial, Line, useCursor, MeshDistortMaterial, softShadows } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'


softShadows()

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)
const ballsize = 0.4
const xOffset = -2
const content1 = `Test\nTest`

export default function CabinSample({ route, ...props }) {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  const [hovered2, hover2] = useState(false)
  const mesh = useRef(null)
  const [goUp, setGoUp] = useState(true)
  const [newCycleTime, SetNewCycleTime] = useState(0)
  const [xCorValue, xCorSet] = useState(null)
  const [yCorValue, yCorSet] = useState(null)
  const { viewport } = useThree()
  // viewport = canvas in 3d units (meters)

  useFrame(({ mouse }) => {
     const xCorSetv2 = (mouse.x * viewport.width) / 2
     const yCorSetv2 = (mouse.y * viewport.height) / 2
     mesh.current.position.set(xCorSetv2, yCorSetv2, 0)
     //console.log(mesh.current.position.x)
  })
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])
  useCursor(hovered)

  function Sphere({ position = [0, 0, 0], ...props }) {
    const ref = useRef()

    const factor = useMemo(() => 0.5 + Math.random(), [])
    useFrame((state) => {
      const t = easeInOutCubic((1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2)
      //console.log("time",state.clock.getElapsedTime())
      if (state.clock.getElapsedTime() - newCycleTime > 22){

        SetNewCycleTime(state.clock.getElapsedTime())
      }
      if (state.clock.getElapsedTime() - newCycleTime > 2.5 && state.clock.getElapsedTime() - newCycleTime < 12){
        ref.current.position.y = ref.current.position.y + t/6

      } else if (state.clock.getElapsedTime() - newCycleTime > 12 && state.clock.getElapsedTime() - newCycleTime < 22){
        ref.current.position.y = (ref.current.position.y - t/3)<0 ? 0 : ref.current.position.y - t/3
      }




    })
    return (
      <mesh ref={ref} position={position} {...props} castShadow receiveShadow>
        <sphereBufferGeometry attach="geometry" args={[ballsize, 32, 32]} />

        <meshStandardMaterial attach="material" color="lightblue" roughness={0} metalness={0.1} />

      </mesh>
    )
  }

  function Spheres({ number = 9 }) {
    const ref = useRef()
    const positions = [
    [-ballsize*4+xOffset,0,0],[-ballsize*4+xOffset,0,ballsize*2],[-ballsize*4+xOffset,0,ballsize*4],[-ballsize*4+xOffset,0,ballsize*6],[-ballsize*4+xOffset,0,ballsize*8], [-ballsize*4+xOffset,0,ballsize*10], [-ballsize*4+xOffset,0,ballsize*12],
    [-ballsize*2+xOffset,0,ballsize*6],[0+xOffset,0,ballsize*6],[ballsize*2+xOffset,0,ballsize*6],
    [ballsize*4+xOffset,0,0],[ballsize*4+xOffset,0,ballsize*2],[ballsize*4+xOffset,0,ballsize*4],[ballsize*4+xOffset,0,ballsize*6],[ballsize*4+xOffset,0,ballsize*8], [ballsize*4+xOffset,0,ballsize*10], [ballsize*4+xOffset,0,ballsize*12],
    [ballsize*8+xOffset,0,ballsize*4],[ballsize*8+xOffset,0,ballsize*8], [ballsize*8+xOffset,0,ballsize*10], [ballsize*8+xOffset,0,ballsize*12],
    //[ballsize*13,0,0],
    [ballsize*13+xOffset,0,ballsize*2],[ballsize*13+xOffset,0,ballsize*4],[ballsize*13+xOffset,0,ballsize*6],[ballsize*13+xOffset,0,ballsize*8], [ballsize*13+xOffset,0,ballsize*12]
    ]

    return (
      <group ref={ref}>
        {positions.map((pos, index) => (
          <Sphere key={index} position={pos} />
        ))}
      </group>
    )
  }


  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}

      <mesh receiveShadow castShadow>
        <meshStandardMaterial attach="material" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </mesh>
      <Spheres />




    </group>

  )
}


/*
<Center rotation={[-1.5, 0, 0]} position={[-ballsize*4+xOffset, 0, 8]}>
  <Text3D
    curveSegments={32}
    bevelEnabled
    bevelSize={0.04}
    bevelThickness={0.1}
    height={0.5}
    lineHeight={0.5}
    letterSpacing={-0.06}
    size={1.5}
    font="/Inter_Bold.json">
    {content1}
    <meshNormalMaterial />
  </Text3D>
</Center>

function Train() {
  const ref = useRef()
  const scroll = useScroll()
  const [cabin, seat] = useGLTF(['/cabin-transformed.glb', '/seat-transformed.glb'])
  const meshes = useMemo(() => ({ Cabin: cabin.nodes.cabin_1, Seat: seat.nodes.seat }), [cabin, seat])
  useFrame(() => (ref.current.position.z = scroll.offset * 120))
  // Merged creates THREE.InstancedMeshes out of the meshes you feed it
  // All in all we end up with just 5 draw-calls for the entire scene
  return (
    <Merged castShadow receiveShadow meshes={meshes}>
      {(models) => (
        <group ref={ref}>
          <Cabin models={models} color="#252525" seatColor="sandybrown" name="1A" position={[0, 0, -6]} />
          <Cabin models={models} color="#454545" seatColor="gray" name="2B" position={[0, 0, -32]} />
          <Cabin models={models} color="#252525" seatColor="lightskyblue" name="3A" position={[0, 0, -58]} />
          <Cabin models={models} color="#454545" seatColor="gray" name="4B" position={[0, 0, -84]} />
          <Cabin models={models} color="#252525" seatColor="sandybrown" name="5B" position={[0, 0, -110]} />
        </group>
      )}
    </Merged>
  )
}

const Quarter = ({ models, color, ...props }) => (
  <group {...props}>
    <models.Seat color={color} position={[-0.35, 0, 0.7]} />
    <models.Seat color={color} position={[0.35, 0, 0.7]} />
    <models.Seat color={color} position={[-0.35, 0, -0.7]} rotation={[0, Math.PI, 0]} />
    <models.Seat color={color} position={[0.35, 0, -0.7]} rotation={[0, Math.PI, 0]} />
  </group>
)

const Row = ({ models, color, ...props }) => (
  <group {...props}>
    <Quarter models={models} color={color} position={[-1.2, -0.45, 9.75]} />
    <Quarter models={models} color={color} position={[1.2, -0.45, 9.75]} />
  </group>
)

const Cabin = ({ models, color = 'white', seatColor = 'white', name, ...props }) => (
  <group {...props}>
    <Text fontSize={4} color="#101020" position={[0, 6, 4]} rotation={[-Math.PI / 2, 0, 0]}>
      {name}
    </Text>
    <models.Cabin color={color} />
    <Row models={models} color={seatColor} />
    <Row models={models} color={seatColor} position={[0, 0, -1.9]} />
    <Row models={models} color={seatColor} position={[0, 0, -6.6]} />
    <Row models={models} color={seatColor} position={[0, 0, -8.5]} />
    <Row models={models} color={seatColor} position={[0, 0, -11]} />
    <Row models={models} color={seatColor} position={[0, 0, -12.9]} />
    <Row models={models} color={seatColor} position={[0, 0, -17.6]} />
    <Row models={models} color={seatColor} position={[0, 0, -19.5]} />
  </group>
)

export default function App() {
  return (
    <Canvas dpr={[1, 1.5]} shadows camera={{ position: [-15, 15, 18], fov: 35 }} gl={{ alpha: false }}>
      <fog attach="fog" args={['#17171b', 30, 40]} />
      <color attach="background" args={['#17171b']} />
      <ambientLight intensity={0.25} />
      <directionalLight castShadow intensity={2} position={[10, 6, 6]} shadow-mapSize={[1024, 1024]}>
        <orthographicCamera attach="shadow-camera" left={-20} right={20} top={20} bottom={-20} />
      </directionalLight>
      <Suspense fallback={null}>
        <ScrollControls pages={3}>
          <Train />
        </ScrollControls>
        <mesh onClick={() => router.push(route)} position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#151515"
            metalness={0.6}
            roughness={1}
          />
        </mesh>
        <Environment preset="dawn" />
      </Suspense>
    </Canvas>
  )
}
*/
