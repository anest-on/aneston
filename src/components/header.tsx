'use client'

import Image from 'next/image'

import logo from '@/images/logoNameSide.svg'
import googleIcon from '@/images/google.svg'
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
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar } from './ui/avatar'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@radix-ui/react-menubar'

export function Header() {
  const [homeButton, setHomeButton] = useState('')
  const [aboutUsButton, setaboutUsButton] = useState('')
  const [patientsButton, setPatientsButton] = useState('')
  const [schedulesButton, setSchedulesButton] = useState('')
  const [profileButton, setProfileButton] = useState('')
  const [accessConfigurationButton, setAccessConfigurationButton] = useState('')
  const [settingsButton, setSettingsButton] = useState('')

  const path = usePathname()
  const session = useSession()
  const router = useRouter()

  const isSignedIn = session.status === 'authenticated'

  async function handleConnectToGoogle() {
    await signIn('google')
  }

  async function logOut() {
    await signOut()
    window.location.href = '/'
  }

  useEffect(() => {
    if (path === '/') {
      setHomeButton(
        () =>
          ' text-green-500 font-bold border-solid border-b-2 border-green-500 h-full',
      )
      setaboutUsButton(() => '')
      setPatientsButton(() => '')
      setSchedulesButton(() => '')
      setProfileButton(() => '')
      setAccessConfigurationButton(() => '')
      setSettingsButton(() => '')
    } else if (path === '/not-found') {
      setHomeButton(() => '')
      setaboutUsButton(
        () =>
          ' text-green-500 font-bold border-solid border-b-2 border-green-500 h-full',
      )
      setPatientsButton(() => '')
      setSchedulesButton(() => '')
      setProfileButton(() => '')
      setAccessConfigurationButton(() => '')
      setSettingsButton(() => '')
    } else if (path === '/dashboard') {
      setHomeButton(() => '')
      setaboutUsButton(() => '')
      setPatientsButton(
        () =>
          ' text-green-500 font-bold border-solid border-b-2 border-green-500 h-full',
      )
      setSchedulesButton(() => '')
      setProfileButton(() => '')
      setAccessConfigurationButton(() => '')
      setSettingsButton(() => '')
    } else if (path === '/time-intervals') {
      setHomeButton(() => '')
      setaboutUsButton(() => '')
      setPatientsButton(() => '')
      setSchedulesButton(
        () =>
          ' text-green-500 font-bold border-solid border-b-2 border-green-500 h-full',
      )
      setProfileButton(() => '')
      setAccessConfigurationButton(() => '')
      setSettingsButton(() => '')
    } else if (path === '/profile') {
      setHomeButton(() => '')
      setaboutUsButton(() => '')
      setPatientsButton(() => '')
      setSchedulesButton(() => '')
      setProfileButton(
        () =>
          ' text-green-500 font-bold border-solid border-b-2 border-green-500 lg:border-none h-full hover:text-green-500 hover:bg-red-500',
      )
      setAccessConfigurationButton(() => '')
      setSettingsButton(() => '')
    } else if (path === '/access-configuration') {
      setHomeButton(() => '')
      setaboutUsButton(() => '')
      setPatientsButton(() => '')
      setSchedulesButton(() => '')
      setProfileButton(() => '')
      setAccessConfigurationButton(
        () =>
          ' text-green-500 font-bold border-solid border-b-2 border-green-500 lg:border-none h-full hover:text-green-500',
      )
      setSettingsButton(() => '')
    } else if (path === '/configuration') {
      setHomeButton(() => '')
      setaboutUsButton(() => '')
      setPatientsButton(() => '')
      setSchedulesButton(() => '')
      setProfileButton(() => '')
      setAccessConfigurationButton(() => '')
      setSettingsButton(
        () =>
          ' text-green-500 font-bold border-solid border-b-2 border-green-500 lg:border-none h-full hover:text-green-500',
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
          <SheetTrigger className="mr-5 p-[5px] rounded-full px-4 bg-gray-400">
            <Menu color="white" />
          </SheetTrigger>
          <SheetContent className="bg-gray-800  border-gray-600">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <div className="text-white">
              {isSignedIn ? (
                <>
                  <div className="flex items-center gap-4 mt-6">
                    {session.data.user.avatar_url ? (
                      <Avatar>
                        {/* <AvatarImage src={session.data.user.avatar_url} /> */}
                        <Image
                          src={session.data.user.avatar_url}
                          alt=""
                          width={150}
                          height={150}
                        />
                      </Avatar>
                    ) : (
                      <></>
                    )}
                    <div>
                      <p>{session.data.user.name}</p>
                      <p className="text-gray-400 text-sm">
                        {session.data.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] mt-4 bg-gray-500" />
                  <Button
                    onClick={() => {
                      router.push('/dashboard')
                    }}
                    variant={'ghost'}
                    className={`${patientsButton} h-full text-md flex justify-start mt-4 p-0 rounded-none font-normal hover:text-green-500`}
                  >
                    Pacientes
                  </Button>

                  {(session.data.user.accessType === '' ||
                    session.data.user.accessType === null ||
                    session.data.user.accessType === undefined ||
                    session.data.user.accessType === 'FULL_ACCESS') && (
                    <Button
                      onClick={() => {
                        router.push('/time-intervals')
                      }}
                      variant={'ghost'}
                      className={`${schedulesButton} h-full text-md flex justify-start mt-4 rounded-none p-0 font-normal hover:text-green-500`}
                    >
                      Meus horários
                    </Button>
                  )}

                  {(session.data.user.accessType === '' ||
                    session.data.user.accessType === null ||
                    session.data.user.accessType === undefined) && (
                    <Button
                      onClick={() => {
                        router.push('/profile')
                      }}
                      variant={'ghost'}
                      className={`${profileButton} h-full text-md flex justify-start mt-4 p-0 rounded-none font-normal hover:text-green-500`}
                    >
                      Meu perfil
                    </Button>
                  )}

                  {(session.data.user.accessType === '' ||
                    session.data.user.accessType === null ||
                    session.data.user.accessType === undefined ||
                    session.data.user.accessType === 'FULL_ACCESS') && (
                    <Button
                      onClick={() => {
                        router.push('/access-configuration')
                      }}
                      variant={'ghost'}
                      className={`${accessConfigurationButton} h-full text-md flex justify-start mt-4 p-0 rounded-none font-normal hover:text-green-500`}
                    >
                      Config. Acessos
                    </Button>
                  )}

                  {(session.data.user.accessType === '' ||
                    session.data.user.accessType === null ||
                    session.data.user.accessType === undefined ||
                    session.data.user.accessType === 'FULL_ACCESS') && (
                    <Button
                      onClick={() => {
                        router.push('/configuration')
                      }}
                      variant={'ghost'}
                      className={`${settingsButton} h-full text-md flex justify-start mt-4 p-0 rounded-none font-normal hover:text-green-500`}
                    >
                      Configurações
                    </Button>
                  )}

                  <div className="w-full h-[1px] mt-4 bg-gray-500" />
                  <Button
                    className="text-gray mt-4 text-md px-0 font-normal hover:text-red-500"
                    variant={'ghost'}
                    onClick={() => logOut()}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      router.push('/')
                    }}
                    variant={'ghost'}
                    className={`${homeButton} h-full text-md flex justify-start mt-4 p-0 rounded-none font-normal hover:text-green-500`}
                  >
                    Produto
                  </Button>

                  <Button
                    onClick={() => {
                      router.push('/not-found')
                    }}
                    variant={'ghost'}
                    className={`${aboutUsButton} h-full text-md flex justify-start mt-4 p-0 rounded-none font-normal hover:text-green-500`}
                  >
                    Sobre nós
                  </Button>
                  <Button
                    className="rounded-full border-none bg-gray-600 text-gray mt-10"
                    variant={'outline'}
                    onClick={handleConnectToGoogle}
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
                </>
              )}
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

        {isSignedIn ? (
          <>
            <div className="text-white  flex  h-full items-center gap-4">
              <Button
                onClick={() => router.push('/')}
                variant={'ghost'}
                className={`${patientsButton} h-full rounded-none flex items-center text-md hover:text-green-500`}
              >
                Pacientes
              </Button>

              {(session.data.user.accessType === '' ||
                session.data.user.accessType === null ||
                session.data.user.accessType === undefined ||
                session.data.user.accessType === 'FULL_ACCESS') && (
                <Button
                  onClick={() => {
                    router.push('/time-intervals')
                  }}
                  variant={'ghost'}
                  className={`${schedulesButton} h-full rounded-none flex items-center text-md hover:text-green-500`}
                >
                  Meus horários
                </Button>
              )}
            </div>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <Button
                    className="rounded-full h-full border-none bg-gray-800 text-gray-100 gap-4"
                    variant={'outline'}
                  >
                    {session.data.user.avatar_url ? (
                      <Avatar className="h-8 w-8">
                        {/* <AvatarImage src={session.data.user.avatar_url} /> */}
                        <Image
                          src={session.data.user.avatar_url}
                          alt=""
                          width={150}
                          height={150}
                        />
                      </Avatar>
                    ) : (
                      <></>
                    )}
                    Minha conta
                  </Button>
                </MenubarTrigger>
                <MenubarContent className="rounded-md w-[220px] bg-gray-800 p-4 mt-6 border border-gray-600">
                  {(session.data.user.accessType === '' ||
                    session.data.user.accessType === null ||
                    session.data.user.accessType === undefined) && (
                    <MenubarItem className="flex justify-center">
                      <Button
                        className={`${profileButton} text-sm w-[180px] justify-start hover:bg-gray-600`}
                        variant={'ghost'}
                        onClick={() => {
                          router.push('/profile')
                        }}
                      >
                        Meu perfil
                      </Button>
                    </MenubarItem>
                  )}

                  {(session.data.user.accessType === '' ||
                    session.data.user.accessType === null ||
                    session.data.user.accessType === undefined ||
                    session.data.user.accessType === 'FULL_ACCESS') && (
                    <MenubarItem className="flex justify-center mt-2">
                      <Button
                        className={`${accessConfigurationButton} text-sm w-[180px] justify-start hover:bg-gray-600`}
                        variant={'ghost'}
                        onClick={() => {
                          router.push('/access-configuration')
                        }}
                      >
                        Config. Acessos
                      </Button>
                    </MenubarItem>
                  )}

                  {(session.data.user.accessType === '' ||
                    session.data.user.accessType === null ||
                    session.data.user.accessType === undefined ||
                    session.data.user.accessType === 'FULL_ACCESS') && (
                    <MenubarItem className="flex justify-center mt-2">
                      <Button
                        className={`${settingsButton} text-sm w-[180px] justify-start hover:bg-gray-600`}
                        variant={'ghost'}
                        onClick={() => {
                          router.push('/configuration')
                        }}
                      >
                        Configurações
                      </Button>
                    </MenubarItem>
                  )}

                  <div className="w-full h-[1px] mt-2 bg-gray-500" />

                  <MenubarItem className="flex justify-center mt-2 border-none">
                    <Button
                      className="text-sm w-[180px] justify-start hover:bg-gray-600 hover:text-red-500"
                      variant={'ghost'}
                      onClick={() => logOut()}
                    >
                      Sair
                    </Button>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </>
        ) : (
          <>
            <div className="text-white flex h-full items-center gap-4">
              <Button
                onClick={() => router.push('/')}
                variant={'ghost'}
                className={`${homeButton} h-full rounded-none flex items-center text-md hover:text-green-500`}
              >
                Produto
              </Button>
              <Button
                onClick={() => router.push('/not-found')}
                variant={'ghost'}
                className={`${aboutUsButton} h-full rounded-none flex items-center text-md hover:text-green-500`}
              >
                Sobre nós
              </Button>
            </div>
            <Button
              className="rounded-full border-none bg-gray-800 text-gray-100"
              variant={'outline'}
              onClick={handleConnectToGoogle}
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
          </>
        )}
      </div>
    </div>
  )
}

Header.displayName = 'Header'
