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
import { AxiosError } from 'axios'
import { Copy, Pencil, Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const employees = [
  {
    name: 'Matheus Adorno',
    email: 'teste@gmail.com',
    role: 'Acesso Completo',
  },
  {
    name: 'Matheus Adorno',
    email: 'teste1@gmail.com',
    role: 'Acesso Completo',
  },
  {
    name: 'Matheus Adorno',
    email: 'teste2@gmail.com',
    role: 'Acesso Completo',
  },
]

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

  const handleCreateUser = async (data: CreateUserData) => {
    const doctorId = session.data?.user.id
    if (doctorId) data.doctorId = doctorId

    try {
      if (data.password !== data.confirmPassword) {
        setUserDoesNotMatchMessage('As senhas devem ser iguais.')
        return
      }

      await api.post('/third-party-user', data)

      // router.push(`/register/time-intervals`)
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

  return (
    <main className="max-w-[880px] h-screen mt-20 mx-auto mb-4 py-0 px-4">
      <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600 mt-6">
        <p className="text-white text-center text-2xl font-bold">
          Configuração de Acessos
        </p>
        <div className="w-full h-[2px] mt-6 px-6 bg-gray-500" />
        <div className="flex flex-col rounded-md bg-gray-800 border border-solid border-gray-600 mt-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-600">
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="text-right w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  className="border-b border-gray-600"
                  key={employee.email}
                >
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-4 justify-end">
                      <Pencil className="w-4 h-4 hover:text-green-500 hover:cursor-pointer" />
                      <Trash className="w-4 h-4 hover:text-red-500 hover:cursor-pointer" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-full flex justify-center mt-6 gap-20">
          <Dialog>
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
                                    Acesso completo
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
