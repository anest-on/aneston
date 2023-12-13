'use client'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react'

import { Button } from './ui/button'

interface carouselProps {
  children: any
}

export default function Carousel({ children: slides }: carouselProps) {
  const [curr, setCurr] = useState(0)

  const prev = () => {
    console.log(curr, slides.length - 1)
    setCurr((curr) => (curr === 0 ? pageCounter() : curr - 1))
  }

  const next = () => {
    console.log(curr, slides.length - 1)
    setCurr((curr) => (curr === pageCounter() ? 0 : curr + 1))
  }

  const pageCounter = () => {
    if ((slides.length - 1) % 2 !== 0) return (slides.length - 1) / 2 + 0.5
    else return (slides.length - 1) / 2
  }

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
        className="w-8 h-8 relative mr-[40px]"
        onClick={() => prev()}
        variant={'circle'}
      >
        <ChevronLeft className="absolute" size={30} />
      </Button>
      <Button className="w-8 h-8 relative" variant={'circle'}>
        <ChevronRight className="absolute" onClick={() => next()} size={30} />
      </Button>
    </>
  )
}
