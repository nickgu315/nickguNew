import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const CabinSample = dynamic(() => import('@/components/canvas/CabinSample'), { ssr: false })
// Dom components go here
export default function Page(props) {
  return (
    <div
      className='absolute w-[80vw] md:w-[50vw] px-10 py-8 text-sm rounded-lg shadow-xl md:text-base top-[80px] left-1/2 transform -translate-x-1/2'
      style={{ maxWidth: 'calc(100% - 28px)' }}>

      <div className='tracking-wider text-white text-4xl'>

        I&#39;am <span className='text-green-200 text-[36px]'>Nick Gu</span>.
        <br />
        <span className='text-3xl'>UI/ UX Designer, </span>

        <br />
        <span className='text-3xl'>Fullstack Developer </span>
        <br />
        <span className='text-green-200 text-3xl'> & more. </span>

      </div>
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = (props) => <CabinSample scale={0.5} route='/' position-y={-1} />

export async function getStaticProps() {
  return { props: { title: 'UI/ UX Designer & Fullstack Developer' } }
}
