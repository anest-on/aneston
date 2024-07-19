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
import { FilePlus } from 'lucide-react'
import { Patient } from '@/app/dashboard/columns'

const createCertificateSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos três letras.' }),
  cpf: z.string().min(11, { message: 'Digite um CPF válido.' }),
  date: z.date({
    required_error: 'A data de realização da consulta é obrigatória.',
  }),
})

interface CreateCertificateDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  createCertificate: (
    values: z.infer<typeof createCertificateSchema>,
  ) => Promise<void>
  isSubmitting: boolean
  initialData?: Patient | null
}

export const CreateCertificateDialog: React.FC<
  CreateCertificateDialogProps
> = ({ open, setOpen, createCertificate, isSubmitting, initialData }) => {
  const form = useForm<z.infer<typeof createCertificateSchema>>({
    resolver: zodResolver(createCertificateSchema),
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
        <Button>
          Gerar Certificado
          <FilePlus className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 border border-solid border-gray-600">
        <DialogHeader>
          <DialogTitle>Gerar Certificado de Consulta</DialogTitle>
          <DialogDescription>
            Preencha com as informações do paciente para que seja gerado seu
            certificado de realização de consulta.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createCertificate)}
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
                {isSubmitting ? 'Gerando...' : 'Gerar Certificado'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
