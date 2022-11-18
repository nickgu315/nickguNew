import { useRef, forwardRef } from 'react'
import { mergeRefs } from 'react-merge-refs'

const Layout = forwardRef(({ children, ...props }, ref) => {
  const localRef = useRef()
  return (
    <div
      ref={mergeRefs([ref, localRef])}
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom bg-gradient-to-b from-[#001833] to-[#003166] text-gray-50 overflow-y-auto'>
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
