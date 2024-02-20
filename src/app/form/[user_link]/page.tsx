import FormBody from './_components/formBody'
import { prisma } from '@/lib/prisma'

const Form = async ({ params }: { params: { user_link: string } }) => {
  const doctor = await prisma.user.findFirst({
    where: {
      user_link: params.user_link,
    },
  })
  return (
    <FormBody
      doctor={{
        avatar_url: doctor && doctor.avatar_url ? doctor?.avatar_url : '',
        city: doctor && doctor.city ? doctor.city : '',
        name: doctor && doctor.name ? doctor.name : '',
        state: doctor && doctor?.state ? doctor.state : '',
        user_link: params.user_link,
      }}
    />
  )
}

export default Form
