'use client'

import { useEffect, useState } from 'react'

import { jetBrainsMono, roboto } from './fonts'

import homeImg from '../images/homeImg.png'
import formAutomatizado from '../images/formulario-automatizado.svg'
import rightArrow from '../images/rightArrowVector.svg'
import wrongVector from '../images/wrongVector.svg'
import rightVector from '../images/rightVector.svg'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { HomeFooter } from '@/components/homeFooter'
import { HomeHeader } from '@/components/homeHeader'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Home() {
  const recomendations = [
    {
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu urna tincidunt, ultricies diam vitae, commodo lorem. In non orci in justo gravida ultrices sagittis in ex. Nulla dui ipsum, ornare cursus ipsum eget, scelerisque tincidunt tortor. In semper arcu metus, lobortis finibus ante efficitur id. Sed nec molestie eros. Cras ac lacinia est. Sed vestibulum dui arcu, vestibulum euismod purus molestie id.”',
      name: 'Ricardo Alvorada',
      role: 'Anestesista',
      city: 'Sao Paulo',
      state: 'SP',
    },
    {
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu urna tincidunt, ultricies diam vitae, commodo lorem. In non orci in justo gravida ultrices sagittis in ex. Nulla dui ipsum, ornare cursus ipsum eget, scelerisque tincidunt tortor. In semper arcu metus, lobortis finibus ante efficitur id. Sed nec molestie eros. Cras ac lacinia est. Sed vestibulum dui arcu, vestibulum euismod purus molestie id.”',
      name: 'Ricardo Alvorada',
      role: 'Anestesista',
      city: 'Sao Paulo',
      state: 'SP',
    },
    {
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu urna tincidunt, ultricies diam vitae, commodo lorem. In non orci in justo gravida ultrices sagittis in ex. Nulla dui ipsum, ornare cursus ipsum eget, scelerisque tincidunt tortor. In semper arcu metus, lobortis finibus ante efficitur id. Sed nec molestie eros. Cras ac lacinia est. Sed vestibulum dui arcu, vestibulum euismod purus molestie id.”',
      name: 'Ricardo Alvorada',
      role: 'Anestesista',
      city: 'Sao Paulo',
      state: 'SP',
    },
    {
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu urna tincidunt, ultricies diam vitae, commodo lorem. In non orci in justo gravida ultrices sagittis in ex. Nulla dui ipsum, ornare cursus ipsum eget, scelerisque tincidunt tortor. In semper arcu metus, lobortis finibus ante efficitur id. Sed nec molestie eros. Cras ac lacinia est. Sed vestibulum dui arcu, vestibulum euismod purus molestie id.”',
      name: 'Ricardo Alvorada',
      role: 'Anestesista',
      city: 'Sao Paulo',
      state: 'SP',
    },
    {
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu urna tincidunt, ultricies diam vitae, commodo lorem. In non orci in justo gravida ultrices sagittis in ex. Nulla dui ipsum, ornare cursus ipsum eget, scelerisque tincidunt tortor. In semper arcu metus, lobortis finibus ante efficitur id. Sed nec molestie eros. Cras ac lacinia est. Sed vestibulum dui arcu, vestibulum euismod purus molestie id.”',
      name: 'Ricardo Alvorada',
      role: 'Anestesista',
      city: 'Sao Paulo',
      state: 'SP',
    },
    {
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu urna tincidunt, ultricies diam vitae, commodo lorem. In non orci in justo gravida ultrices sagittis in ex. Nulla dui ipsum, ornare cursus ipsum eget, scelerisque tincidunt tortor. In semper arcu metus, lobortis finibus ante efficitur id. Sed nec molestie eros. Cras ac lacinia est. Sed vestibulum dui arcu, vestibulum euismod purus molestie id.”',
      name: 'Ricardo Alvorada',
      role: 'Anestesista',
      city: 'Sao Paulo',
      state: 'SP',
    },
    {
      text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu urna tincidunt, ultricies diam vitae, commodo lorem. In non orci in justo gravida ultrices sagittis in ex. Nulla dui ipsum, ornare cursus ipsum eget, scelerisque tincidunt tortor. In semper arcu metus, lobortis finibus ante efficitur id. Sed nec molestie eros. Cras ac lacinia est. Sed vestibulum dui arcu, vestibulum euismod purus molestie id.”',
      name: 'Ricardo Alvorada',
      role: 'Anestesista',
      city: 'Sao Paulo',
      state: 'SP',
    },
  ]

  const session = useSession()
  const isSignedIn = session.status === 'authenticated'

  useEffect(() => {
    if (isSignedIn) {
      if (
        session.data.user.user_link === '' ||
        session.data.user.user_link === null ||
        session.data.user.user_link === undefined
      ) {
        router.push('/register/update-informations')
      } else {
        // router.push('/not-found')
      }
    }
  })

  const router = useRouter()

  const [sessionTwoText, setSessionTwoText] = useState(
    'Com o formulário automatizado basta enviar um link para os pacientes que eles respondem todas as perguntas pré operatórias e agendam a consulta. Você ainda tem acesso a todas as respostas de forma dinâmica no seu painel de pacientes.',
  )

  const [formButton, setFormButton] = useState(['bg-green-600 text-white', ''])

  const formActionButton = () => {
    setFormButton(() => ['bg-green-600 text-white', ''])
    setSessionTwoText(
      () =>
        'Com o formulário automatizado basta enviar um link para os pacientes que eles respondem todas as perguntas pré operatórias e agendam a consulta. Você ainda tem acesso a todas as respostas de forma dinâmica no seu painel de pacientes.',
    )
  }

  const agendaActionButton = () => {
    setFormButton(() => ['', 'bg-green-600 text-white'])
    setSessionTwoText(
      () =>
        'Através da agenda digital você pode gerenciar todas as suas consultas. Lá você tem todas as datas, horários e informações do paciente em um só lugar.',
    )
  }

  return (
    <>
      <HomeHeader />
      <main className=" h-full w-full justify-center flex flex-col bg-gray-900  text-base text-white">
        {/* PARTE 1 */}

        <div className="flex h-screen self-center justify-center lg:p-10 max-w-[80%] ">
          <div className="flex flex-row self-center justify-center gap-5">
            <div className="flex flex-col lg:max-w-[60%] max-lg:max-w- items-center justify-center ">
              <div className="flex flex-col items-start">
                <h1
                  className={`${jetBrainsMono.className} flex lg:text-[3rem] max-lg:text-[2.5rem] max-lg:leading-10 lg:leading-10`}
                >
                  <b>
                    Bem vindo ao&nbsp;
                    <span
                      className={`${jetBrainsMono.className} text-green-500`}
                    >
                      AnestOn!
                    </span>
                  </b>
                </h1>

                <p className="text-gray-100 lg:text-[1.2rem] max-lg:text[0.5rem] mt-5">
                  Uma plataforma para ajudar você, anestesista, a melhor atender
                  seus pacientes. Através de um formulário automatizado e um
                  sistema de gestão de agenda vamos facilitar seu dia a dia de
                  trabalho!
                </p>
              </div>
              <Button
                className="mt-[40px] w-[250px]"
                onClick={() => router.push('/register')}
              >
                <b>Vamos lá!</b>
              </Button>
            </div>
            <Image
              src={homeImg}
              width={700}
              height={10}
              className="self-center max-lg:hidden xl:max-w-[600px] md:max-w-[500px]"
              alt=""
            />
          </div>
        </div>

        {/* PARTE 2 */}

        <div className="flex h-screen self-center items-center justify-center max-w-[80%] max-lg:pr-[10px] max-lg:pl-[10px] flex-col">
          <h2
            className={`${jetBrainsMono.className} flex lg:text-[1.8rem] max-lg:text-[1.5rem] text-center `}
          >
            <b>
              Agilize seus atendimentos de consulta&nbsp;
              <span className={`${jetBrainsMono.className} text-green-500`}>
                automatizando sua agenda
              </span>
            </b>
          </h2>
          <div className="pt-10 flex flex-row w-full items-center justify-center max-lg:flex-col">
            <div className="flex w-full h-full justify-center max-lg:mb-[40px] ">
              <Button
                variant={'outline'}
                onClick={() => formActionButton()}
                className={`${jetBrainsMono.className} lg:text-[1.3rem] flex flex-col h-full rounded-[20px] border-[2px] lg:w-[200px] mr-4 ${formButton[0]}`}
              >
                <Image
                  src={formAutomatizado}
                  width={120}
                  height={10}
                  className="self-center max-lg:max-w-[80px]"
                  alt=""
                />
                Formulário <br />
                automatizado
              </Button>
              <Button
                variant={'outline'}
                onClick={() => agendaActionButton()}
                className={`${jetBrainsMono.className} lg:text-[1.3rem] flex flex-col h-full rounded-[20px] border-[2px] lg:w-[200px] ${formButton[1]}`}
              >
                <Image
                  src={formAutomatizado}
                  width={120}
                  height={10}
                  className="self-center max-lg:max-w-[80px]"
                  alt=""
                />
                Agenda <br /> digital
              </Button>
            </div>
            <div className="flex flex-col items-center ml-10 max-lg:ml-0 ">
              <p
                className={`${roboto.className} max-lg:text-center text-gray-100`}
              >
                {sessionTwoText}
              </p>
              <Button
                className="mt-[15px]"
                onClick={() => router.push('/register')}
              >
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

        <div className="flex lg:h-screen self-center items-center justify-center w-full flex-col ">
          <h2
            className={`${jetBrainsMono.className} flex max-w-[80%] lg:text-[1.8rem] max-lg:text-[1.5rem] text-center`}
          >
            <b>
              Porque &nbsp;
              <span className={`${jetBrainsMono.className} text-green-500`}>
                digitalizar
              </span>{' '}
              o seu trabalho?
            </b>
          </h2>

          <div className="flex flex-row max-lg:flex-col mt-20 w-full justify-center ">
            <div className="flex w-full lg:p-10 lg:justify-end max-lg:pl-5 max-lg:pr-5 ">
              <div className="flex flex-col ">
                <h3
                  className={`${jetBrainsMono.className} flex text-[1.4rem] max-lg:text-center max-lg:justify-center`}
                >
                  <b>Médicos convencionais</b>
                </h3>
                <div className="flex flex-row items-center mt-10 lg:w-[500px]">
                  <Image
                    src={wrongVector}
                    width={60}
                    height={10}
                    className="self-center mr-5 max-lg:max-w-[30px]"
                    alt=""
                  />
                  <p className="text-gray-100 text-[1.1rem] ">
                    Está limitado aos meios fisicos para realizar a comunicação
                    com o paciente
                  </p>
                </div>
                <div className="flex flex-row items-center mt-10 lg:w-[500px]">
                  <Image
                    src={wrongVector}
                    width={60}
                    height={10}
                    className="self-center mr-5 max-lg:max-w-[30px]"
                    alt=""
                  />
                  <p className="text-gray-100 text-[1.1rem]">
                    Gestão descentralizada, precisa sempre reunir as informações
                    de diversos locais para cada atendimento
                  </p>
                </div>
                <div className="flex flex-row items-center mt-10 lg:w-[500px]">
                  <Image
                    src={wrongVector}
                    width={60}
                    height={10}
                    className="self-center mr-5 max-lg:max-w-[30px]"
                    alt=""
                  />
                  <p className="text-gray-100 text-[1.1rem]">
                    Demora para realizar os atendimentos devido as limitações do
                    meios convencionais
                  </p>
                </div>
                <div className="flex flex-row items-center mt-10 lg:w-[500px]">
                  <Image
                    src={wrongVector}
                    width={60}
                    height={10}
                    className="self-center mr-5 max-lg:max-w-[30px]"
                    alt=""
                  />
                  <p className="text-gray-100 text-[1.1rem]">
                    Correr o risco de perder pacientes para concorrentes que
                    oferecem serviços digitais mais convenientes e eficientes
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center bg-gray-600 max-lg:pl-5 max-lg:pr-5 lg:p-10 max-lg:pt-10 max-lg:pb-10 w-full lg:rounded-l-[50px] max-lg:mt-[40px]">
              <h3
                className={`${jetBrainsMono.className} flex text-[1.4rem] max-lg:text-center max-lg:justify-center`}
              >
                <b>
                  Médicos{' '}
                  <span className={`${jetBrainsMono.className} text-green-500`}>
                    digitais
                  </span>
                </b>
              </h3>
              <div className="flex flex-row items-center mt-10 lg:w-[500px] ">
                <Image
                  src={rightVector}
                  width={60}
                  height={10}
                  className="self-center mr-5 max-lg:max-w-[30px]"
                  alt=""
                />
                <p className="text-gray-100 text-[1.1rem] ">
                  Está limitado aos meios fisicos para realizar a comunicação
                  com o paciente
                </p>
              </div>
              <div className="flex flex-row items-center mt-10 lg:w-[500px]">
                <Image
                  src={rightVector}
                  width={60}
                  height={10}
                  className="self-center mr-5 max-lg:max-w-[30px]"
                  alt=""
                />
                <p className="text-gray-100 text-[1.1rem]">
                  Gestão descentralizada, precisa sempre reunir as informações
                  de diversos locais para cada atendimento
                </p>
              </div>
              <div className="flex flex-row items-center mt-10 lg:w-[500px]">
                <Image
                  src={rightVector}
                  width={60}
                  height={10}
                  className="self-center mr-5 max-lg:max-w-[30px]"
                  alt=""
                />
                <p className="text-gray-100 text-[1.1rem]">
                  Demora para realizar os atendimentos devido as limitações do
                  meios convencionais
                </p>
              </div>
              <div className="flex flex-row items-center mt-10 lg:w-[500px]">
                <Image
                  src={rightVector}
                  width={60}
                  height={10}
                  className="self-center mr-5 max-lg:max-w-[30px]"
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

        <div className="flex h-screen self-center justify-center lg:max-w-[70%] max-lg:max-w-[100%] p-10 lg:divide-x-[2px] items-center max-lg:flex-col lg:flex-row ">
          <h2
            className={`${jetBrainsMono.className} flex max-w-[80%] lg:text-[1.5rem] max-lg:text-[1.5rem] lg:text-right max-lg:text-center pr-10`}
          >
            <b>
              Depoimentos de quem&nbsp;
              <span className={`${jetBrainsMono.className} text-green-500`}>
                simplificou os seus atendimentos
              </span>{' '}
              com a AnestOn
            </b>
          </h2>
          <Carousel className="w-full p-10 max-w-sms ">
            <CarouselContent>
              {recomendations.map((i, index) => (
                <CarouselItem
                  className="flex flex-col max-w-[400px] mb-[50px] max-lg:mr-[100px] xl:basis-1/2 lg:basis-1/1 "
                  key={index}
                >
                  <p className=" lg:w-[350px] text-gray-100">{i.text}</p>
                  <h4 className=" w-full mt-[20px] text-white">
                    <b>{i.name}</b>
                  </h4>
                  <span className=" w-full text-white">
                    {i.role} - {i.city}/{i.state}
                  </span>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant={'circle'} className="static mr-[80px]" />
            <CarouselNext variant={'circle'} className="static" />
          </Carousel>
        </div>

        {/* FOOTER */}
      </main>
      <HomeFooter />
    </>
  )
}
