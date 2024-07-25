import { AppointmentStatusEnum } from '@prisma/client'
import { FilterFn } from '@tanstack/react-table'
import { Patient } from './columns'

export const RangeDateFn: FilterFn<Patient> = (
  row,
  columnId,
  filterValue,
  addMeta,
) => {
  const patient = row.getValue(columnId) as Patient

  const date = new Date(patient.schedule_date)

  const [start, end] = filterValue

  // If one filter defined and date is null filter it
  if ((start || end) && !isNaN(end) && !date) return false
  if (date)
    if (start && (!end || isNaN(end))) {
      return date.getTime() >= start.getTime()
    } else if (!start && end && !isNaN(end)) {
      return date.getTime() <= end.getTime()
    } else if (start && end && !isNaN(end)) {
      return (
        date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
      )
    } else return true

  return true
}

export const StatusFilterFn: FilterFn<Patient> = (
  row,
  columnId,
  filterValue,
  addMeta,
) => {
  const patient = row.getValue(columnId) as Patient

  const status = patient.appointment_status

  const isArchived = patient.archived

  const { done, undone, canceled, archived } = filterValue

  if (done && status === AppointmentStatusEnum.CONCLUDED && !isArchived) {
    return true
  } else if (undone && status === AppointmentStatusEnum.UNDONE && !isArchived) {
    return true
  } else if (
    canceled &&
    status === AppointmentStatusEnum.CANCELED &&
    !isArchived
  ) {
    return true
  } else if (archived && isArchived) {
    return true
  }

  return false
}
