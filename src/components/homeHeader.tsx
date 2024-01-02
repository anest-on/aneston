'use client'

import Image from 'next/image'

import logo from '@/images/logoNameSide.svg'
import googleIcon from '@/images/google.svg'
import Link from 'next/link'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { signIn } from 'next-auth/react'

export function HomeHeader() {
  const [homeButton, setHomeButton] = useState('')
  const [aboutUsButton, setaboutUsButton] = useState('')
  const path = usePathname()

  async function handleConnectCalendar() {
    await signIn('google')
  }

  useEffect(() => {
    if (path === '/') {
      setHomeButton(
        () =>
          ' text-green-500 font-bold lg:border-solid lg:border-b-2 lg:border-green-500 h-full',
      )
      setaboutUsButton(() => '')
    } else {
      setHomeButton(() => '')
      setaboutUsButton(
        () =>
          ' text-green-500 font-bold lg:border-solid lg:border-b-2 lg:border-green-500 h-full',
      )
    }
  }, [path])

  return (
    <div className="flex bg-gray-600 items-center lg:justify-center max-lg:justify-between h-[70px] w-full ">
      <div className="flex flex-row justify-between w-full lg:hidden">
        <Image
          src={logo}
          width={160}
          height={10}
          className="self-center ml-5"
          alt=""
        />
        <Sheet>
          <SheetTrigger className="mr-5">
            <div className="bg-gray-400 rounded-full py-2 px-4">
              <Menu color="white" />
            </div>
          </SheetTrigger>
          <SheetContent className="bg-gray-800 border-gray-600">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="text-white">
              <Link
                href={'/'}
                className={`${homeButton} h-full flex items-center mt-10`}
              >
                Produto
              </Link>

              <Link
                href={'/aboutus'}
                className={`${aboutUsButton} h-full flex items-center mt-5`}
              >
                Sobre nós
              </Link>

              <Button
                className="rounded-full border-none bg-gray-400 text-gray mt-10"
                variant={'outline'}
                onClick={handleConnectCalendar}
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
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-row items-center justify-between max-w-[60%] w-full h-full max-lg:hidden">
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
            href={'/not-found'}
            className={`ml-10 ${aboutUsButton} h-full flex items-center`}
          >
            Sobre nós
          </Link>
        </div>
        <Button
          className="rounded-full border-none bg-gray-400 text-gray"
          variant={'outline'}
          onClick={handleConnectCalendar}
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
