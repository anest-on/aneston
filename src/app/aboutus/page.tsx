'use client'
import { HomeFooter } from '@/components/homeFooter'
import { HomeHeader } from '@/components/homeHeader'
import SliderModal from '@/components/sliderModal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const AboutUs = () => {
  const [modalState, setModalState] = useState(false)
  return (
    <>
      <HomeHeader />
      <main className="h-screen w-full flex flex-col bg-gray-900  text-base text-white items-center">
        <SliderModal />
      </main>
      <HomeFooter />
    </>
  )
}

export default AboutUs
