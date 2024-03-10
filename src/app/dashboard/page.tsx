'use client'

import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import {
  Calendar,
  Check,
  ChevronDown,
  Copy,
  Link,
  Link2,
  Pencil,
  Phone,
  Printer,
  X,
} from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const session = useSession()

  function copyLinkToClipboard() {
    navigator.clipboard.writeText(
      // TODO: Mudar link quando for para produção
      `http://aneston.com/form/${session.data?.user.user_link}`,
    )
  }

  return (
    // <div className="w-full h-screen bg-gray-900">
    //   <Header />
    //   <div className="mx-20 my-10">
    //     <div className="flex justify-between mb-10">
    //       <Button
    //         variant={'outline'}
    //         type="button"
    //         className="text-white border-white hover:bg-gray-600"
    //         onClick={() => {
    //           copyLinkToClipboard()
    //           toast({
    //             title: 'Link copiado para a área de transferência!',
    //             description: `Seu Link: http://aneston.com/form/${session.data?.user.user_link}`,
    //           })
    //         }}
    //       >
    //         Copiar link do formulário <Copy className="w-4 h-4 ml-2" />
    //       </Button>

    //       <Input
    //         className="w-60 border-gray-400 div:bg-gray-600"
    //         placeholder="Buscar"
    //       />

    //       <div className="flex gap-5">
    //         <Button
    //           variant={'outline'}
    //           className="rounded-full text-gray-100 border-gray-100 hover:bg-gray-600"
    //         >
    //           Status da consulta
    //           <ChevronDown className="w-4 h-4 ml-2" />
    //         </Button>
    //         <Button
    //           variant={'outline'}
    //           className="rounded-full text-gray-100 border-gray-100 hover:bg-gray-600"
    //         >
    //           Calendário
    //         </Button>
    //       </div>
    //     </div>
    //     <div className="mb-10">Data</div>
    //     <div className="flex items-start justify-between text-xs text-gray-100 ">
    //       {/* <div className="flex justify-between rounded-lg min-h-[200px] min-w-[160px] bg-gray-800 pt-2 px-2">
    //         <div className="flex px-2 h-full justify-center rounded-full bg-gray-600">
    //           <p>Domingo</p>
    //         </div>

    //         <p>18/02/2024</p>
    //       </div> */}
    //       <div className="flex flex-col rounded-lg min-h-[200px] min-w-[240px] bg-gray-800 pt-2 px-2 gap-4">
    //         <div className="flex justify-between">
    //           <div className="flex px-2 h-full justify-center rounded-full bg-gray-600">
    //             <p>Segunda</p>
    //           </div>
    //           <p>19/02/2024</p>
    //         </div>
    //         <div className="flex flex-col w-[220px] rounded-lg bg-gray-600 p-2 gap-2 border-l-8 border-l-green-600 mb-4">
    //           <div className="flex justify-between w-full">
    //             <b>Nome do paciente</b>
    //             <Pencil className="w-4 h-4" />
    //           </div>
    //           <div className="flex justify-between w-full">
    //             <p>Cirurgia - Etapa do procedimento</p>
    //             <Printer className="w-4 h-4" />
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <Phone className="w-3 h-3 text-gray-400" />
    //             <p>(xx) 99999-9999</p>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <Link2 className="w-3 h-3 text-gray-400" />
    //             <p>Link da consulta</p>
    //           </div>
    //           <div className="flex items-center gap-2">
    //             <Calendar className="w-3 h-3 text-gray-400" />
    //             <p>18/02/2024</p>
    //           </div>
    //           <div className="flex flex-col justify-between mx-4 gap-2">
    //             <Button className="bg-gray-500 hover:bg-gray-300 text-xs py-0 px-2 h-[25px]">
    //               Consulta Realizada
    //               <Check className="w-3 h-3 ml-2" />
    //             </Button>
    //             <Button className="bg-gray-500 hover:bg-gray-300 text-xs py-0 px-1 h-[25px]">
    //               Cancelar Consulta
    //               <X className="w-3 h-3 ml-2" />
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex justify-between rounded-lg min-h-[200px] min-w-[240px] bg-gray-800 pt-2 px-2">
    //         <div className="flex px-2 h-full justify-center rounded-full bg-gray-600">
    //           <p>Terça</p>
    //         </div>
    //         <p>20/02/2024</p>
    //       </div>
    //       <div className="flex justify-between rounded-lg min-h-[200px] min-w-[240px] bg-gray-800 pt-2 px-2">
    //         <div className="flex px-2 h-full justify-center rounded-full bg-gray-600">
    //           <p>Quarta</p>
    //         </div>
    //         <p>21/02/2024</p>
    //       </div>
    //       <div className="flex justify-between rounded-lg min-h-[200px] min-w-[240px] bg-gray-800 pt-2 px-2">
    //         <div className="flex px-2 h-full justify-center rounded-full bg-gray-600">
    //           <p>Quinta</p>
    //         </div>
    //         <p>22/02/2024</p>
    //       </div>
    //       <div className="flex justify-between rounded-lg min-h-[200px] min-w-[240px] bg-gray-800 pt-2 px-2">
    //         <div className="flex px-2 h-full justify-center rounded-full bg-gray-600">
    //           <p>Sexta</p>
    //         </div>
    //         <p>23/02/2024</p>
    //       </div>
    //       {/* <div className="flex justify-between rounded-lg min-h-[200px] min-w-[160px] bg-gray-800 pt-2 px-2">
    //         <div className="flex px-2 h-full justify-center rounded-full bg-gray-600">
    //           <p>Sábado</p>
    //         </div>
    //         <p>24/02/2024</p>
    //       </div> */}
    //     </div>
    //   </div>
    // </div>
    <main className="max-w-[572px] h-screen w-full items-center justify-center mt-20 mx-auto py-20 px-10">
      <div className="flex flex-col justify-center gap-5">
        <strong className="text-2xl text-white">
          Bem-vindo(a) à Sala de Espera Virtual!
        </strong>
        <p>
          Parece que esta página ainda está em modo de sono induzido, aguardando
          a anestesia certa. Nossos programadores estão trabalhando para
          acordá-la e encher de vida. Enquanto isso, sugerimos que você relaxe,
          respire profundamente e explore outras áreas do site. A página em coma
          agradece pela sua compreensão. Em breve ela estará de pé (ou deitada)
          novamente!
        </p>
      </div>
    </main>
  )
}
