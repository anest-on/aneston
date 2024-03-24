/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { User } from '@prisma/client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Button } from './ui/button'
import { auth } from '@/auth'
import { Pencil, Trash } from 'lucide-react'

const updateUserSchema = z.object({
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

export type UpdateUserData = z.infer<typeof updateUserSchema>

export type DeleteUserData = {
  email: string
  doctorId: string
}

interface ThirdPartyUserProps {
  thirdPartyUser: User
  handleSubmit: (data: UpdateUserData) => void
  handleDelete: (data: DeleteUserData) => void
}

export function ThirdPartyUserForm({
  thirdPartyUser,
  handleSubmit,
  handleDelete,
}: ThirdPartyUserProps) {
  const [userEmailAlreadyTakenMessage, setUserEmailAlreadyTakenMessage] =
    useState<string | null>(null)

  const [passwordDoesNotMatchMessage, setPasswordDoesNotMatchMessage] =
    useState<string | null>(null)

  const [openUpdateUser, setOpenUpdateUser] = useState(false)

  const updateForm = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: thirdPartyUser.name,
      email: thirdPartyUser.email,
      password: '',
      confirmPassword: '',
      doctorId: thirdPartyUser.doctor_id!,
      accessType: thirdPartyUser.access_type!,
    },
  })

  const { isSubmitting } = updateForm.formState

  const onSubmit = (values: z.infer<typeof updateUserSchema>) => {
    handleSubmit && handleSubmit(values)
  }

  const onDelete = () => {
    handleDelete &&
      handleDelete({
        email: thirdPartyUser.email,
        doctorId: thirdPartyUser.doctor_id!,
      })
  }

  return (
    <TableRow className="border-b border-gray-600">
      <TableCell className="hidden items-center md:flex">
        {thirdPartyUser.name}
      </TableCell>
      <TableCell>{thirdPartyUser.email}</TableCell>
      {thirdPartyUser.access_type === 'FULL_ACCESS' && (
        <TableCell className="hidden items-center md:flex">
          Acesso Completo
        </TableCell>
      )}
      {thirdPartyUser.access_type === 'DASHBOARD_ACCESS' && (
        <TableCell className="hidden items-center md:flex">
          Acesso Dashboard
        </TableCell>
      )}
      <TableCell>
        <div className="flex gap-4 justify-end">
          <Dialog open={openUpdateUser} onOpenChange={setOpenUpdateUser}>
            <DialogTrigger asChild>
              <Pencil className="w-4 h-4 hover:text-green-500 hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-600">
              <DialogHeader>
                <DialogTitle className="flex justify-center">
                  Informações do Usuários
                </DialogTitle>
              </DialogHeader>
              <Form {...updateForm}>
                <form
                  onSubmit={updateForm.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  <div className="flex flex-col w-full mr-4">
                    <FormField
                      control={updateForm.control}
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
                      control={updateForm.control}
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
                      control={updateForm.control}
                      name="accessType"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Acesso:</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={thirdPartyUser.access_type || ''}
                            >
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
                        control={updateForm.control}
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
                        control={updateForm.control}
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

                      {passwordDoesNotMatchMessage && (
                        <p className="text-sm mt-2 text-[#F75A68]">
                          {passwordDoesNotMatchMessage}
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
          <Dialog>
            <DialogTrigger asChild>
              <Trash className="w-4 h-4 hover:text-red-500 hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-600">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Tem certeza que deseja deletar este usuário?
                </DialogTitle>
                <p className="text-center text-white pt-2">
                  Usuário: {thirdPartyUser.name}
                </p>
                <div className="flex justify-between pt-5 px-16">
                  <DialogClose>
                    <Button
                      className="w-[150px] border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                      variant={'outline'}
                      type="button"
                    >
                      Cancelar
                    </Button>
                  </DialogClose>
                  <DialogClose>
                    <Button
                      className="w-[150px] border-red-500 text-white bg-red-500 hover:bg-red-500/90"
                      onClick={() => {
                        onDelete()
                      }}
                    >
                      Deletar
                    </Button>
                  </DialogClose>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  )
}
