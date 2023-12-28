import Image from 'next/image'

import { jetBrainsMono } from '@/app/fonts'

import logo from '@/images/logoNameSide.svg'
import FacebookIcon from '@/images/facebook.svg'
import InstagramIcon from '@/images/instagram.svg'
import LinkedinIcon from '@/images/linkiedIn.svg'
import whatsAppIcon from '@/images/whatsApp.svg'
import Link from 'next/link'

export function HomeFooter() {
  return (
    <div className="flex flex-col w-full text-white bg-gray-600 lg:items-center justify-center p-[40px]">
      <div className="flex lg:flex-row max-lg:flex-col justify-between max-w-[50%] w-full">
        <div className="divide-y-2 w-[150px]">
          <h3 className={`${jetBrainsMono.className} text-[1.1rem]`}>
            Páginas
          </h3>
          <div className="flex flex-col text-[1rem] text-gray-100">
            <Link href={'/'} className="mt-[15px]">
              Home page
            </Link>
            <Link href={'/aboutus'} className="mt-[5px]">
              Sobre nós
            </Link>
          </div>
        </div>

        <div className="divide-y-2 w-[150px] max-lg:mt-[20px]">
          <h3 className={`${jetBrainsMono.className} text-[1.1rem]`}>
            Acessos
          </h3>
          <div className="text-[1rem] text-gray-100">
            <p className="mt-[15px]">Conta</p>
            <p className="mt-[5px]">Entre em contato</p>
          </div>
        </div>

        <div className="max-lg:mt-[40px]">
          <div className="text-[0.9rem] text-gray-200">
            <p className="">Políticas de privacidade</p>
            <p className="mt-[5px]">Termos de uso</p>
          </div>
          <p className="text-[1.1rem] mt-[15px]">Siga-nos</p>
          <div className="flex flex-row justify-between mt-[10px]">
            <Image
              src={FacebookIcon}
              width={30}
              height={10}
              className="self-center mr-5"
              alt=""
            />
            <Image
              src={InstagramIcon}
              width={30}
              height={10}
              className="self-center mr-5"
              alt=""
            />
            <Image
              src={LinkedinIcon}
              width={30}
              height={10}
              className="self-center mr-5"
              alt=""
            />
            <Image
              src={whatsAppIcon}
              width={30}
              height={10}
              className="self-center mr-5"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="flex lg:flex-row max-lg:flex-col mt-10 ">
        <Image
          src={logo}
          width={180}
          height={10}
          className="self-center lg:mr-5 "
          alt=""
        />
        <div className="text-gray-100 text-[0.8rem] lg:ml-[15px] max-lg:mt-[30px]">
          <p>contato@aneston.com.br - (xx) 99999-9999</p>
          <p>
            Rua Pais Leme, 136 | salas 1407 e 1408 - Pinheiros, São Paulo - SP,
            05424-010{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

HomeFooter.displayName = 'HomeFooter'
