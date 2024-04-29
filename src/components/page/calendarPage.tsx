/* eslint-disable @next/next/no-async-client-component */
'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import CalendarIntermediary from './calendarIntermediary'

export interface doctorProps {
  avatar_url: string
  name: string
  state: string
  city: string
  user_link: string
}

const CalendarPage = ({ doctor }: { doctor: doctorProps }) => {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="max-w-[852px] py-0 px-4 my-4 mx-20">
        <div className="flex flex-col items-center">
          {doctor?.avatar_url && (
            <Avatar className="w-[64px] h-[64px]">
              <AvatarImage src={doctor.avatar_url} />
            </Avatar>
          )}

          <p className="mt-2 text-2xl font-bold text-white">{doctor?.name}</p>
          <div className="flex gap-1 justify-center">
            <p className="text-gray-200">
              Anestesista - {doctor?.city}/{doctor?.state}
            </p>
          </div>
        </div>
      </div>

      <div className="flex relative my-6 mx-0 p-0 bg-gray-900 border rounded-lg border-solid border-gray-600">
        <CalendarIntermediary />
      </div>
    </div>
  )
}

export default CalendarPage
