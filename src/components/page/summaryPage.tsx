/* eslint-disable @next/next/no-async-client-component */

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import SummaryContent, { SummaryProps } from './summaryContent'

import { pacientSubmitProps } from './pacientPage'
import { companionSubmitProps } from './companionPage'
import { cirurgySubmitProps } from './cirurgyPage'

export interface doctorProps {
  avatar_url: string
  name: string
  state: string
  city: string
  user_link: string
}

interface SummaryPageProps extends SummaryProps {
  doctor: doctorProps
}

const SummaryPage = ({
  doctor,
  pacientData,
  companionData,
  cirurgyData,
  setObservationsData,
  getSummaryData,
}: SummaryPageProps) => {
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

      <SummaryContent
        cirurgyData={cirurgyData}
        companionData={companionData}
        pacientData={pacientData}
        setObservationsData={setObservationsData}
        getSummaryData={getSummaryData}
        doctorLink={doctor.user_link}
      />
    </div>
  )
}

export default SummaryPage
