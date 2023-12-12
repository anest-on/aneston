import { jetBrainsMono, roboto } from './fonts'

import homeImg from '../images/homeImg.png'
import formAutomatizado from '../images/formulario-automatizado.svg'
import rightArrow from '../images/rightArrowVector.svg'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <div className="bg-gray-600 w-full h-[80px] absolute">Header</div>

      <main className=" h-full w-full justify-center flex flex-col bg-gray-900  text-base text-white">
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

        <div className="flex h-screen self-center items-center justify-center max-w-[80%] p-10 flex-col">
          <h2 className={`${jetBrainsMono.className} flex text-[1.8rem] `}>
            <b>
              Agilize seus atendimentos de consulta&nbsp;
              <span className={`${jetBrainsMono.className} text-green-500`}>
                automatizando sua agenda
              </span>
            </b>
          </h2>
          <div className="pt-10 flex flex-row max-w-[85%] items-center ">
            <div className="flex w-full">
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

        <div className="flex h-screen self-center items-center justify-center max-w-[80%] p-10 flex-col">
          <h2 className={`${jetBrainsMono.className} flex text-[1.8rem] `}>
            <b>
              Porque &nbsp;
              <span className={`${jetBrainsMono.className} text-green-500`}>
                digitalizar
              </span>{' '}
              o seu trabalho?
            </b>
          </h2>
        </div>
      </main>
    </>
  )
}
