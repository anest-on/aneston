import { jetBrainsMono } from './fonts'
import homeImg from '../images/homeImg.png'

import Image from 'next/image'

export default function Home() {
  return (
    <main className=" h-screen w-screen flex items-start justify-center bg-gray-900  text-base pt-20 text-white">
      <div className="flex flex-row">
        <div className="flex flex-col max-w-[600px]">
          <div className="flex w-full">
            <h1 className={`${jetBrainsMono.className} flex text-[48px]`}>
              Bem vindo ao&nbsp;
              <span
                className={`${jetBrainsMono.className} text-[48px] text-green-500`}
              >
                AnestOn!
              </span>
            </h1>
          </div>
          <p className="text-gray-100 mt-5 ">
            Uma plataforma para ajudar você, anestesista, a melhor atender seus
            pacientes. Através de um formulário automatizado e um sistema de
            gestão de agenda vamos facilitar seu dia a dia de trabalho!
          </p>
        </div>

        <Image src={homeImg} width={500} height={500} alt="" />
      </div>
    </main>
  )
}
