import * as THREE from 'three'
import { useState, useRef, useMemo, Suspense } from 'react'
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router'
import { Text3D, Center, useGLTF, useScroll, ScrollControls, Environment, Merged, Text, MeshReflectorMaterial, Line, useCursor, MeshDistortMaterial, softShadows } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'


export default function ProjectCard({disableHi, title, description, imageLink, websiteLink, projectImageLinks, imageLinks}) {


  return (
    <motion.div  animate="visible"

      initial={false}
      whileHover={{
      zIndex: 1,
      scale: 1.03,
      transition: {
        duration: 0.15
      }
      }}
    >
    <div className='w-[90vw] lg:w-[22vw] h-auto  md:h-auto lg:h-auto xl:h-auto px-[10px] flex flex-col items-center'>
      <div className='w-[84vw] lg:w-[22vw] h-[14vw] sm:h-[5vw] md:h-[5vw] lg:h-[5.5vw] xl:h-[5vw] 2xl:h-[2.5vw] px-[10px] lg:px-[20px] pt-[0px] flex flex-col items-start mb-[0.25em] sm:mb-[0.5em] lg:mb-[0.5em]'>
        <h3 className='text-[16px] lg:text-[1em]'>
        {title}
        </h3>

        <p className='text-[14px] lg:text-[0.5em] leading-5'>
        {description}
        </p>
      </div>
      <div className='w-[88vw] lg:w-[21vw] h-auto px-[0px] pt-[10px] lg:pt-[0px] pb-[20px]'>

        test

      </div>

    </div>
    </motion.div>
  )
}
