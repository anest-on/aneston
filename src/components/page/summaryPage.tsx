/* eslint-disable @next/next/no-async-client-component */

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import SummaryContent from './summaryContent'

const SummaryPage = ({
  doctor,
}: {
  doctor: { avatar_url: string; name: string; state: string; city: string }
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[852px] py-0 px-4 my-4 mx-20">
        <div className="flex flex-row items-center">
          {doctor?.avatar_url && (
            <Avatar className="w-[64px] h-[64px]">
              <AvatarImage src={doctor.avatar_url} />
            </Avatar>
          )}
          <div className="ml-2">
            <p className="mt-2 text-2xl font-bold text-white">{doctor?.name}</p>
            <div className="flex gap-1 justify-start">
              <p className="text-gray-200">
                Anestesista - {doctor?.city}/{doctor?.state}
              </p>
            </div>
          </div>
        </div>
      </div>

      <SummaryContent />
    </div>
  )
}

export default SummaryPage
