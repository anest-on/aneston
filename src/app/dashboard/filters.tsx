import { cirurgySubmitProps } from '@/components/page/cirurgyPage'
import { companionSubmitProps } from '@/components/page/companionPage'
import { pacientSubmitProps } from '@/components/page/pacientPage'
import { FilterFn } from '@tanstack/react-table'

enum AppointmentStatusEnum {
  DONE = 'DONE',
  UNDONE = 'UNDONE',
  CANCELED = 'CANCELED',
}

export interface Patient
  extends pacientSubmitProps,
    cirurgySubmitProps,
    companionSubmitProps {
  id: string
  appointment_status: AppointmentStatusEnum
  doctor_id: string
  doctor_url: string
  schedule_date: string
  created_at: string
  updated_at: string
}

export const RangeDateFn: FilterFn<Patient> = (
  row,
  columnId,
  filterValue,
  addMeta,
) => {
  const patient = row.getValue(columnId) as Patient

  const date = new Date(patient.schedule_date)

  const [start, end] = filterValue

  console.log(date, start, end)
  // If one filter defined and date is null filter it
  if ((start || end) && !date) return false
  if (date)
    if (start && !end) {
      return date.getTime() >= start.getTime()
    } else if (!start && end) {
      return date.getTime() <= end.getTime()
    } else if (start && end) {
      return (
        date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
      )
    } else return true

  return true
}
