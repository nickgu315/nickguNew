import * as THREE from 'three'
import { useState, useRef, useMemo, Suspense } from 'react'
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router'
import { Text3D, Center, useGLTF, useScroll, ScrollControls, Environment, Merged, Text, MeshReflectorMaterial, Line, useCursor, MeshDistortMaterial, softShadows } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'


export default function ImCard({infoData}) {


  return (
    <div>
      <div className='relative left-[60px] lg:left-[100px] text-2xl lg:text-[26px]'>
        I&#39;m <span className='text-green-200 text-[34px] lg:text-[30px] font-bold'>Nick Gu</span>.
        <br />
        <span className='text-2xl lg:text-[26px]'>UI/ UX Designer, </span>

        <br />
        <span className='text-2xl lg:text-[26px]'>Fullstack Developer </span>
        <br />
        <span className='text-green-200 text-2xl lg:text-[26px]'> & more</span>.
      </div>
    </div>
  )
}
