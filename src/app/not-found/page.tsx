'use client'

const NotFound = () => {
  return (
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

export default NotFound
