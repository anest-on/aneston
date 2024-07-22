import { Header } from '@/components/header'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex justify-center w-full h-full bg-gray-900 text-gray-200 text-base">
        {children}
      </div>
    </>
  )
}

export default DashboardLayout
