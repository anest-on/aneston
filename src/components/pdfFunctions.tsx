import { Patient } from '@/app/dashboard/columns'
import { getAgeFromDate } from '@/utils/calculate-years'

export function CreateMedicinesString(patient: Patient) {
  let medicines = ''

  if (patient.pacient_medicines && patient.pacient_medicines[0].name === '') {
    medicines = 'Nenhum'
    return medicines
  }

  patient.pacient_medicines?.forEach(function (medicine) {
    medicines += `
        ${medicine.name} - ${medicine.dose}mg/mcg - ${medicine.pills} comprimido(s) ao dia | `
  })

  return medicines
}

export function CreateCirurgiesString(patient: Patient) {
  let cirurgies = ''

  if (!patient.pacient_did_cirurgy) {
    cirurgies = 'Nenhuma'
    return cirurgies
  }

  patient.pacient_cirurgies?.forEach(function (cirurgy) {
    cirurgies += `
        ${cirurgy.name} em ${cirurgy.year} | `
  })

  return cirurgies
}

export function PatientSmokeString(patient: Patient) {
  let smoke = ''

  if (!patient.pacient_smoke) {
    smoke = 'Não tabagista'
    return smoke
  }

  if (!patient.pacient_stopped_smoking && patient.pacient_pack_smoke) {
    smoke = `Tabagista, ${(
      (Number(getAgeFromDate(patient.pacient_birthdate)) -
        Number(patient.pacient_started_smoking)) *
      parseFloat(patient.pacient_pack_smoke)
    ).toFixed(0)} maços-ano`

    return smoke
  }

  if (patient.pacient_stopped_smoking && patient.pacient_pack_smoke) {
    smoke = `Ex-tabagista, ${(
      (Number(patient.pacient_when_stop_smoking) -
        Number(patient.pacient_started_smoking)) *
      parseFloat(patient.pacient_pack_smoke)
    ).toFixed(0)} maços-ano`

    return smoke
  }
}

export function CreatePhysicalActivitiesString(patient: Patient) {
  let physicalActivities = ''

  if (!patient.pacient_do_physical_activity) {
    physicalActivities = 'Nenhuma'
    return physicalActivities
  }

  patient.pacient_physical_activity?.forEach(function (physicalActivity) {
    physicalActivities += `
        ${physicalActivity.name} (${physicalActivity.frequency} vezes na semana) | `
  })

  return physicalActivities
}
