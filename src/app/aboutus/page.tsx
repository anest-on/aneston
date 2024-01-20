'use client'
import { HomeFooter } from '@/components/homeFooter'
import { Header } from '@/components/header'
import SliderModal from '@/components/sliderModal'

const AboutUs = () => {
  return (
    <>
      <Header />
      <main className="h-screen w-full flex flex-col bg-gray-900  text-base text-white items-center">
        <SliderModal />
      </main>
      <HomeFooter />
    </>
  )
}

export default AboutUs
