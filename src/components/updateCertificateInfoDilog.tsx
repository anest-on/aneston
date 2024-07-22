// CreateCertificateDialog.tsx
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { CalendarShadcn } from '@/components/ui/calendar-shadcn'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FilePlus, FileSignature, FileSymlink } from 'lucide-react'
import { Patient } from '@/app/dashboard/columns'

const updateCertificateSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
  cpf: z.string().min(11, { message: 'Digite um CPF válido.' }),
  date: z.date({
    required_error: 'A data de realização da consulta é obrigatória.',
  }),
})

interface UpdateCertificateDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  updateCertificate: (
    values: z.infer<typeof updateCertificateSchema>,
  ) => Promise<void>
  isSubmitting: boolean
  initialData?: Patient | null
  buttonType: string
}

export const UpdateCertificateInfoDialog: React.FC<
  UpdateCertificateDialogProps
> = ({
  open,
  setOpen,
  updateCertificate,
  isSubmitting,
  initialData,
  buttonType,
}) => {
  const form = useForm<z.infer<typeof updateCertificateSchema>>({
    resolver: zodResolver(updateCertificateSchema),
    defaultValues: {
      name: initialData?.pacient_name || '',
      cpf: initialData?.pacient_cpf || '',
      date: initialData?.schedule_date
        ? new Date(initialData.schedule_date)
        : new Date(),
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="w-full h-full gap-1 flex fles-row justify-start p-2"
          disabled={isSubmitting}
        >
          {buttonType === 'compartilhar' && (
            <>
              <FileSymlink className="w-4 h-4 hover:cursor-pointer" />
              Compartilhar link de assinatura do comprovante
            </>
          )}

          {buttonType === 'assinar' && (
            <>
              <FileSignature className="w-4 h-4 hover:cursor-pointer" />
              Assinar Comprovante
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 border border-solid border-gray-600">
        <DialogHeader>
          <DialogTitle>Atualizar Certificado de Consulta</DialogTitle>
          <DialogDescription>
            Antes de realizar a assinatura do Certificado de Consulta,
            certifique-se de que o Nome e CPF do paciente e a Data de Realização
            de Consulta estejam devidamente preenchidos.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateCertificate)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do paciente</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF do paciente</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de realização da consulta</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <CalendarShadcn
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        className="rounded-md border bg-gray-900"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Gerando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
