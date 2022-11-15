import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'
import { motion } from 'framer-motion';

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const CabinSample = dynamic(() => import('@/components/canvas/CabinSample'), { ssr: false })
// Dom components go here
export default function Page(props) {
  return (
    <motion.div initial="hidden" animate="visible"variants={{
        hidden: {
          scale: .8,
          opacity: 0
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 2.25
          }
        },
      }}
    >
      <div
        className='absolute w-[80vw] md:w-[50vw] px-[20px] py-[15px] text-sm rounded-lg shadow-xl md:text-base top-[60px] md:top-[30px] left-1/2 transform -translate-x-1/2'
        style={{ maxWidth: 'calc(100% - 28px)' }}>

        <div className='tracking-wider text-white text-4xl md:text-2xl relative'>

            <motion.div initial="hidden" animate="visible"variants={{
                hidden: {
                  scale: .8,
                  opacity: 0
                },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: {
                    delay: 4
                  }
                },
              }}
            >
              <motion.div whileHover={{
              position: 'relative',
              zIndex: 1,

              scale: 1.025,
              transition: {
                duration: .3
              }
              }}>
                <a href="https://nickgu.vercel.app/projects">
                  <button
                    className='absolute w-[50px] md:w-[60px] px-[0px] py-[0px] md:px-[2px] md:py-[2px] rounded-2xl md:rounded-2xl shadow-xl top-[125px] md:top-[70px] right-[0px] md:right-[20px] bg-gradient-to-r from-green-200 text-[20px] md:text-[20px] text-indigo-500 font-bold'
                    >
                    📔
                  </button>
                </a>
              </motion.div>
              <motion.div whileHover={{
              position: 'relative',
              zIndex: 1,

              scale: 1.025,
              transition: {
                duration: .3
              }
              }}>
                <a href="https://www.linkedin.com/in/nickgulikhang/" target="_blank" rel="noreferrer">
                <button
                  className='absolute w-[50px] md:w-[60px] px-[0px] py-[0px] md:px-[2px] md:py-[2px] rounded-2xl md:rounded-2xl shadow-xl top-[125px] md:top-[20px] right-[60px] md:right-[20px] bg-gradient-to-r from-green-200 text-[20px] md:text-[20px] text-indigo-500 font-bold'
                  >
                  📃
                </button>
                </a>
              </motion.div>
            </motion.div>

          I&#39;m <span className='text-green-200 text-[36px] md:text-[26px] font-bold'>Nick Gu</span>.
          <br />
          <span className='text-3xl md:text-xl'>UI/ UX Designer, </span>

          <br />
          <span className='text-3xl md:text-xl'>Fullstack Developer </span>
          <br />
          <span className='text-green-200 text-3xl md:text-xl'> & more</span>.

        </div>
      </div>
    </motion.div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <CabinSample scale={0.5} route='/' position-y={-1} />

export async function getStaticProps() {
  return { props: { title: 'UI/ UX Designer & Fullstack Developer' } }
}
