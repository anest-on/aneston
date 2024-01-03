import { HomeHeader } from '@/components/homeHeader'

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomeHeader />
      <div className="flex justify-center h-full w-screen bg-gray-900 text-gray-200 text-base">
        {children}
      </div>
    </>
  )
}

export default RegisterLayout
