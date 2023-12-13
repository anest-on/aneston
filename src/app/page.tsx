import { jetBrainsMono, roboto } from './fonts'
import { EmblaOptionsType } from 'embla-carousel-react'

import homeImg from '../images/homeImg.png'
import formAutomatizado from '../images/formulario-automatizado.svg'
import rightArrow from '../images/rightArrowVector.svg'
import wrongVector from '../images/wrongVector.svg'
import rightVector from '../images/rightVector.svg'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Carousel from '@/components/carousel'

export default function Home() {
  const recomendations = [
    'recomendation1',
    'recomendation2',
    'recomendation3',
    'recomendation4',
  ]

  const OPTIONS: EmblaOptionsType = { align: 'start', loop: true }
  const SLIDE_COUNT = 5
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <>
      <div className="bg-gray-600 w-full h-[80px] absolute">Header</div>

      <main className=" h-full w-full justify-center flex flex-col bg-gray-900  text-base text-white">
        {/* PARTE 1 */}

        <div className="flex h-screen self-center justify-center max-w-[80%] p-10">
          <div className="flex flex-row self-center justify-center w-100 ">
            <div className="flex flex-col max-w-[600px] items-center justify-center ">
              <div className="flex w-full items-center justify-center">
                <h1 className={`${jetBrainsMono.className} flex text-[2.5rem]`}>
                  <b>
                    Bem vindo ao&nbsp;
                    <span
                      className={`${jetBrainsMono.className} text-green-500`}
                    >
                      AnestOn!
                    </span>
                  </b>
                </h1>
              </div>
              <p className="text-gray-100 mt-5 w-5/6">
                Uma plataforma para ajudar você, anestesista, a melhor atender
                seus pacientes. Através de um formulário automatizado e um
                sistema de gestão de agenda vamos facilitar seu dia a dia de
                trabalho!
              </p>
              <Button className="mt-[40px] w-[250px]">
                <b>Vamos lá!</b>
              </Button>
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

        {/* PARTE 2 */}

        <div className="flex h-screen self-center items-center justify-center max-w-[80%] p-10 flex-col">
          <h2 className={`${jetBrainsMono.className} flex text-[1.8rem] `}>
            <b>
              Agilize seus atendimentos de consulta&nbsp;
              <span className={`${jetBrainsMono.className} text-green-500`}>
                automatizando sua agenda
              </span>
            </b>
          </h2>
          <div className="pt-10 flex flex-row w-full max-w-[85%] items-center ">
            <div className="flex w-full h-full justify-center ">
              <Button
                variant={'outline'}
                className={`${jetBrainsMono.className} text-[1.3rem] flex flex-col h-full rounded-[20px] border-[2px] w-[200px] mr-4`}
              >
                <Image
                  src={formAutomatizado}
                  width={150}
                  height={10}
                  className="self-center"
                  alt=""
                />
                Formulário <br />
                automatizado
              </Button>
              <Button
                variant={'outline'}
                className={`${jetBrainsMono.className} text-[1.3rem] flex flex-col h-full rounded-[20px] border-[2px] w-[200px] `}
              >
                <Image
                  src={formAutomatizado}
                  width={150}
                  height={10}
                  className="self-center"
                  alt=""
                />
                Formulário <br /> automatizado
              </Button>
            </div>
            <div className="ml-10">
              <p className={`${roboto.className} text-gray-100`}>
                Através da agenda digital você pode gerenciar todas as suas
                consultas. Lá você tem todas as datas, horários e informações do
                paciente em um só lugar.
              </p>
              <Button className="mt-[15px]">
                Começar a usar&nbsp;&nbsp;&nbsp;
                <Image
                  src={rightArrow}
                  width={15}
                  height={10}
                  className="self-center"
                  alt=""
                />
              </Button>
            </div>
          </div>
        </div>

        {/* PARTE 3 */}

        <div className="flex h-screen self-center items-center justify-center w-full flex-col">
          <h2 className={`${jetBrainsMono.className} flex text-[1.8rem] `}>
            <b>
              Porque &nbsp;
              <span className={`${jetBrainsMono.className} text-green-500`}>
                digitalizar
              </span>{' '}
              o seu trabalho?
            </b>
          </h2>

          <div className="flex flex-row mt-20 w-full justify-center ">
            <div className="flex w-full p-10 justify-end ">
              <div className="flex flex-col ">
                <h3 className={`${jetBrainsMono.className} flex text-[1.4rem]`}>
                  <b>Médicos convencionais</b>
                </h3>
                <div className="flex flex-row items-center mt-10 w-[500px]">
                  <Image
                    src={wrongVector}
                    width={60}
                    height={10}
                    className="self-center mr-5"
                    alt=""
                  />
                  <p className="text-gray-100 text-[1.1rem] ">
                    Está limitado aos meios fisicos para realizar a comunicação
                    com o paciente
                  </p>
                </div>
                <div className="flex flex-row items-center mt-10 w-[500px]">
                  <Image
                    src={wrongVector}
                    width={60}
                    height={10}
                    className="self-center mr-5"
                    alt=""
                  />
                  <p className="text-gray-100 text-[1.1rem]">
                    Gestão descentralizada, precisa sempre reunir as informações
                    de diversos locais para cada atendimento
                  </p>
                </div>
                <div className="flex flex-row items-center mt-10 w-[500px]">
                  <Image
                    src={wrongVector}
                    width={60}
                    height={10}
                    className="self-center mr-5"
                    alt=""
                  />
                  <p className="text-gray-100 text-[1.1rem]">
                    Demora para realizar os atendimentos devido as limitações do
                    meios convencionais
                  </p>
                </div>
                <div className="flex flex-row items-center mt-10 w-[500px]">
                  <Image
                    src={wrongVector}
                    width={60}
                    height={10}
                    className="self-center mr-5"
                    alt=""
                  />
                  <p className="text-gray-100 text-[1.1rem]">
                    Correr o risco de perder pacientes para concorrentes que
                    oferecem serviços digitais mais convenientes e eficientes
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center bg-gray-600 p-10 w-full rounded-l-[50px]">
              <h3 className={`${jetBrainsMono.className} flex text-[1.4rem] `}>
                <b>
                  Médicos{' '}
                  <span className={`${jetBrainsMono.className} text-green-500`}>
                    digitais
                  </span>
                </b>
              </h3>
              <div className="flex flex-row items-center mt-10 w-[500px]">
                <Image
                  src={rightVector}
                  width={60}
                  height={10}
                  className="self-center mr-5"
                  alt=""
                />
                <p className="text-gray-100 text-[1.1rem] ">
                  Está limitado aos meios fisicos para realizar a comunicação
                  com o paciente
                </p>
              </div>
              <div className="flex flex-row items-center mt-10 w-[500px]">
                <Image
                  src={rightVector}
                  width={60}
                  height={10}
                  className="self-center mr-5"
                  alt=""
                />
                <p className="text-gray-100 text-[1.1rem]">
                  Gestão descentralizada, precisa sempre reunir as informações
                  de diversos locais para cada atendimento
                </p>
              </div>
              <div className="flex flex-row items-center mt-10 w-[500px]">
                <Image
                  src={rightVector}
                  width={60}
                  height={10}
                  className="self-center mr-5"
                  alt=""
                />
                <p className="text-gray-100 text-[1.1rem]">
                  Demora para realizar os atendimentos devido as limitações do
                  meios convencionais
                </p>
              </div>
              <div className="flex flex-row items-center mt-10 w-[500px]">
                <Image
                  src={rightVector}
                  width={60}
                  height={10}
                  className="self-center mr-5"
                  alt=""
                />
                <p className="text-gray-100 text-[1.1rem]">
                  Correr o risco de perder pacientes para concorrentes que
                  oferecem serviços digitais mais convenientes e eficientes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PARTE 4 */}

        <div className="flex h-screen self-center items-center justify-center max-w-[80%] p-10 flex-col ">
          <div className="flex divide-x-[2px] flex-row">
            <h2 className={`${jetBrainsMono.className} flex text-[1.6rem] `}>
              <b>
                Depoimentos de quem&nbsp;
                <span className={`${jetBrainsMono.className} text-green-500`}>
                  simplificou os seus atendimentos
                </span>{' '}
                com AnestOn
              </b>
            </h2>
            <div className="max-w-[135px] ">
              <Carousel>
                {recomendations.map((i, index) => (
                  <p className="ml-5" key={index}>
                    {i}
                  </p>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
