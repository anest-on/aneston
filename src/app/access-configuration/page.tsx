/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { AxiosError } from 'axios'
import { Copy, Pencil, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import {
  DeleteUserData,
  ThirdPartyUserForm,
  UpdateUserData,
} from '@/components/thirdPartyUserForm'

const createUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
  email: z.string().email({ message: 'Digite um e-mail válido.' }),
  accessType: z.string().min(1, 'Selecione um tipo de acesso.'),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
  doctorId: z.string(),
})

type CreateUserData = z.infer<typeof createUserSchema>

const AccessConfiguration = () => {
  const router = useRouter()

  const session = useSession()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      doctorId: '',
      accessType: '',
    },
  })

  const { isSubmitting } = form.formState

  const [userEmailAlreadyTakenMessage, setUserEmailAlreadyTakenMessage] =
    useState<string | null>(null)

  const [userDoesNotMatchMessage, setUserDoesNotMatchMessage] = useState<
    string | null
  >(null)

  const [thirdPartyUsers, setThirdPartyUsers] = useState<User[]>([])

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(
      // TODO: Mudar link quando for para produção
      `http://aneston.com/form/${session.data?.user.user_link}`,
    )
  }

  const users = useCallback(async () => {
    const response = await api.get('third-party-user')

    setThirdPartyUsers(response.data)
  }, [])

  useEffect(() => {
    users()
  }, [users])

  const [openCreateUser, setOpenCreateUser] = useState(false)
  const [openUpdateUser, setOpenUpdateUser] = useState(false)

  const handleCreateUser = async (data: CreateUserData) => {
    const doctorId = session.data?.user.id
    if (doctorId) data.doctorId = doctorId

    try {
      if (data.password !== data.confirmPassword) {
        setUserDoesNotMatchMessage('As senhas devem ser iguais.')
        return
      }

      await api.post('/third-party-user', data)

      const response = await api.get('third-party-user')

      setThirdPartyUsers(response.data)

      toast({
        title: 'Usuário cadastrado com sucesso!',
        variant: 'success',
      })

      setOpenCreateUser(false)
    } catch (err) {
      if (err instanceof AxiosError) {
        setUserEmailAlreadyTakenMessage(
          'Este e-mail já está em uso, registre um usuário com um novo e-mail ou edite as credenciais do usuário já cadastrado com esse e-mail.',
        )
        return
      }
      console.error(err)
    }
  }

  const [emailAlredyTakenMessage, setEmailAlredyTakenMessage] = useState<
    string | null
  >(null)

  const handleUpdateProfile = async (data: UpdateUserData) => {
    const doctorId = session.data?.user.id
    if (doctorId) data.doctorId = doctorId

    try {
      await api.put('/third-party-user', data)

      const response = await api.get('third-party-user')

      setThirdPartyUsers(response.data)

      toast({
        title: 'Dados do usuário modificados com sucesso!',
        variant: 'success',
      })

      setOpenUpdateUser(false)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        setEmailAlredyTakenMessage(
          'Esse e-mail já está em uso por outro usuário.',
        )
        return
      }
      console.error(err)
    }
  }

  const handleDeleteUser = async (data: DeleteUserData) => {
    const doctorId = session.data?.user.id
    if (doctorId) data.doctorId = doctorId

    try {
      await api.delete('/third-party-user', { data })

      const response = await api.get('third-party-user')

      setThirdPartyUsers(response.data)

      toast({
        title: 'Usuário deletado com sucesso!',
        variant: 'destructive',
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className="max-w-[880px] h-screen mt-10 mx-auto mb-4 py-0 px-4">
      <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600">
        <p className="text-white text-center text-2xl font-bold">
          Configuração de Acessos
        </p>
        <div className="w-full h-[2px] mt-6 px-6 bg-gray-500" />
        <div className="flex flex-col rounded-md bg-gray-800 border border-solid border-gray-600 mt-6">
          {thirdPartyUsers.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-600">
                  <TableHead className="hidden items-center md:flex">
                    Nome
                  </TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead className="hidden items-center md:flex">
                    Cargo
                  </TableHead>
                  <TableHead className="text-right w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {thirdPartyUsers.map((thirdPartyUser) => (
                  <ThirdPartyUserForm
                    thirdPartyUser={thirdPartyUser}
                    handleSubmit={handleUpdateProfile}
                    handleDelete={handleDeleteUser}
                    key={thirdPartyUser.email}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="w-full flex justify-center mt-6 gap-20">
          <Dialog open={openCreateUser} onOpenChange={setOpenCreateUser}>
            <DialogTrigger asChild>
              <Button>Criar novo acesso</Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-600">
              <DialogHeader>
                <DialogTitle className="flex justify-center">
                  Informações do Usuário
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleCreateUser)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col w-full mr-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome:</FormLabel>
                          <FormControl>
                            <Input disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail:</FormLabel>
                          <FormControl>
                            <Input disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {userEmailAlreadyTakenMessage && (
                      <p className="text-sm mt-2 text-[#F75A68]">
                        {userEmailAlreadyTakenMessage}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col w-[50%] pr-2">
                    <FormField
                      control={form.control}
                      name="accessType"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Acesso:</FormLabel>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="bg-gray-900 border-none">
                                  <SelectValue placeholder="Nível de acesso" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-gray-800 border-[1px] border-gray-600">
                                <SelectGroup>
                                  <SelectLabel>Nível de acesso</SelectLabel>
                                  <div className="w-full h-[1px] mt-1 mb-2 bg-gray-600" />
                                  <SelectItem value="FULL_ACCESS">
                                    Acesso Completo
                                  </SelectItem>
                                  <SelectItem value="DASHBOARD_ACCESS">
                                    Acesso ao Dashboard
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )
                      }}
                    />
                  </div>

                  <div className="flex">
                    <div className="flex flex-col w-full mr-4">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha:</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                disabled={isSubmitting}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmação da senha:</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                disabled={isSubmitting}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {userDoesNotMatchMessage && (
                        <p className="text-sm mt-2 text-[#F75A68]">
                          {userDoesNotMatchMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full px-12 justify-between">
                    <DialogClose>
                      <Button
                        className="w-[150px] border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        variant={'outline'}
                        type="button"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button className="w-[150px]">Salvar usuário</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <Button
            variant={'outline'}
            className="text-white border-white hover:bg-gray-600"
            onClick={() => {
              copyLinkToClipboard()
              toast({
                title: 'Link copiado para a área de transferência!',
                description: `Seu Link: http://aneston.com/form/${session.data?.user.user_link}`,
              })
            }}
          >
            Link para login
            <Copy className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  )
}

export default AccessConfiguration
