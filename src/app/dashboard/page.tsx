'use client'
import { useEffect } from 'react'
import DashboardPage from './dashboardPage'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (
      session.status === 'authenticated' &&
      !session.data?.user.user_link &&
      !session.data?.user.doctor_id
    ) {
      console.log(session)
      router.push('/register/update-informations')
    }
  }, [
    session.data?.user.user_link,
    session.data?.user.doctor_id,
    router,
    session,
  ])

  return <DashboardPage />
}

export default Dashboard
