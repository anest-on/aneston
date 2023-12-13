'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react'

import { Button } from './ui/button'

interface carouselProps {
  children: any
}

export default function Carousel({ children: slides }: carouselProps) {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))

  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))
  return (
    <>
      <div className="text-clip overflow-hidden relative">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
        </div>
      </div>
      <Button
        className="w-10 relative"
        onClick={() => prev()}
        variant={'circle'}
      >
        <ChevronLeft className="absolute" size={30} />
      </Button>
      <Button className="w-10 relative" variant={'circle'}>
        <ChevronRight
          className="absolute"
          onClick={() => console.log('teste')}
          size={30}
        />
      </Button>
    </>
  )
}
