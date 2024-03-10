import CalendarPage from '@/components/page/calendarPage'

const Register = async ({ params }: { params: { user_link: string } }) => {
  return <CalendarPage params={params} />
}

export default Register
