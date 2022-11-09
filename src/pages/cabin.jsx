import dynamic from 'next/dynamic'
import Instructions from '@/components/dom/Instructions'

const CabinSample = dynamic(() => import('@/components/canvas/CabinSample'), { ssr: false })

export default function Page(props) {
  return (
    <div>
      by Nick
    </div>
  )
}

Page.canvas = (props) => <CabinSample route='/blob' position-y={-0.75} />

export async function getStaticProps() {
  return { props: { title: 'CabinSample' } }
}
