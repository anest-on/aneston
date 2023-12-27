'use client'

import Image from 'next/image'

import logo from '@/images/logoNameSide.svg'
import googleIcon from '@/images/google.svg'
import Link from 'next/link'
import { Button } from './ui/button'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function HomeHeader() {
  const [homeButton, setHomeButton] = useState('')
  const [aboutUsButton, setaboutUsButton] = useState('')
  const path = usePathname()

  useEffect(() => {
    if (path === '/') {
      setHomeButton(
        () =>
          ' text-green-500 font-bold border-solid border-b-2 border-green-500 h-full',
      )
      setaboutUsButton(() => '')
    } else {
      setHomeButton(() => '')
      setaboutUsButton(
        () =>
          ' text-green-500 font-bold border-solid border-b-2 border-green-500 h-full',
      )
    }
  }, [path])

  return (
    <div className="flex bg-gray-600 items-center justify-center h-[70px] w-full max-lg:hidden">
      <div className="flex flex-row items-center justify-between max-w-[60%] w-full h-full ">
        <Image
          src={logo}
          width={160}
          height={10}
          className="self-center mr-5"
          alt=""
        />
        <div className="text-white  flex  h-full items-center">
          <Link href={'/'} className={`${homeButton} h-full flex items-center`}>
            Produto
          </Link>
          <Link
            href={'/aboutus'}
            className={`ml-10 ${aboutUsButton} h-full flex items-center`}
          >
            Sobre nós
          </Link>
        </div>
        <Button
          className="rounded-full border-none bg-gray-400 text-gray"
          variant={'outline'}
        >
          <Image
            src={googleIcon}
            width={18}
            height={10}
            className="self-center mr-5"
            alt=""
          />
          Login/Cadastro com Google
        </Button>
      </div>
    </div>
  )
}

HomeHeader.displayName = 'HomeHeader'
