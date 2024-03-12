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
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'

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
      `https://aneston.vercel.app/${session.data?.user.user_link}`,
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
    <main className="w-[700px] h-screen mt-10 mx-auto mb-4 py-0 px-4">
      <div className="flex flex-col p-6 rounded-md bg-gray-800 border border-solid border-gray-600">
        <p className="text-white text-center text-2xl font-bold">
          Configurações
        </p>
        <div className="w-full h-[2px] mt-6 px-6 bg-gray-500" />
        <div className="flex flex-col mt-6 gap-2">
          <div className="flex justify-between">
            <p className="text-white font-bold">
              Agendamento de consulta facilitado
            </p>
            <Checkbox disabled />
          </div>
          <p>
            Ao ativar o paciente pode agendar sua consulta ao acessar o
            formulário. Ao final será perguntado o dia e a hora que deseja
            realizar a consulta
          </p>
        </div>

        <div className="flex flex-col mt-12 gap-2">
          <div className="md:flex items-center gap-10 ">
            <p className="text-white font-bold">
              Mensagem de finalização da consulta
            </p>
            <p className="text-sm text-red-500 underline">
              Funcionalidade em desenvolvimento
            </p>
          </div>
          <p>
            Sempre que finalizar uma consulta o sistema enviará automaticamente
            essa mensagem para o paciente por SMS. Junto a mensagem será enviado
            o link do cerficado de realização da consulta para assinatura do
            paciente.
          </p>

          <Textarea disabled />
        </div>

        <Button className="mt-8">Salvar Informações</Button>
      </div>
    </main>
  )
}

export default AccessConfiguration
