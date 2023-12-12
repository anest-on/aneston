import { jetBrainsMono } from './fonts'
import homeImg from '../images/homeImg.png'

import Image from 'next/image'

export default function Home() {
  return (
    <>
      <div className="bg-gray-600 w-full h-[80px] absolute">Header</div>

      <main className=" h-full w-full justify-center flex flex-col bg-gray-900  text-base text-white">
        <div className="flex h-screen self-center justify-center p-10">
          <div className="flex flex-row self-center justify-center w-100 ">
            <div className="flex flex-col max-w-[600px] justify-center ">
              <div className="flex w-full">
                <h1 className={`${jetBrainsMono.className} flex text-[2.5rem]`}>
                  Bem vindo ao&nbsp;
                  <span className={`${jetBrainsMono.className} text-green-500`}>
                    AnestOn!
                  </span>
                </h1>
              </div>
              <p className="text-gray-100 mt-5 w-5/6">
                Uma plataforma para ajudar você, anestesista, a melhor atender
                seus pacientes. Através de um formulário automatizado e um
                sistema de gestão de agenda vamos facilitar seu dia a dia de
                trabalho!
              </p>
              <div className="justify-center flex items-center self-center w-[250px] h-[50px] rounded-lg bg-green-500 text-[1.16rem] mt-[40px]">
                <b>Vamos lá!</b>
              </div>
            </div>
            <Image
              src={homeImg}
              width={500}
              height={10}
              className="self-center"
              alt=""
            />
          </div>
        </div>

        <div className="flex h-screen self-center justify-center p-10">
          <div className="flex flex-row self-center justify-center w-100 ">
            <div className="flex flex-col max-w-[600px] justify-center ">
              <div className="flex w-full">
                <h1 className={`${jetBrainsMono.className} flex text-[2.5rem]`}>
                  Bem vindo ao&nbsp;
                  <span className={`${jetBrainsMono.className} text-green-500`}>
                    AnestOn!
                  </span>
                </h1>
              </div>
              <p className="text-gray-100 mt-5 w-5/6">
                Uma plataforma para ajudar você, anestesista, a melhor atender
                seus pacientes. Através de um formulário automatizado e um
                sistema de gestão de agenda vamos facilitar seu dia a dia de
                trabalho!
              </p>
              <div className="justify-center flex items-center self-center w-[250px] h-[50px] rounded-lg bg-green-500 text-[1.16rem] mt-[40px]">
                <b>Vamos lá!</b>
              </div>
            </div>
            <Image
              src={homeImg}
              width={500}
              height={10}
              className="self-center"
              alt=""
            />
          </div>
        </div>
      </main>
    </>
  )
}
