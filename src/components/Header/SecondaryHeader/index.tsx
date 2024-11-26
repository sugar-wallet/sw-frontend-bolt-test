import React from 'react'

const SecondaryHeader: React.FC<React.HTMLProps<HTMLDivElement>> = () => {
  return (
    <div className="justify-center relative items-center -mx-4">
      <div className="bg-black h-20 flex-1 z-0 relative"></div>
      <div className="rounded-t-3xl h-10 bg-white absolute w-full -bottom-1 left-0 z-10"></div>
    </div>
  )
}

export { SecondaryHeader }
