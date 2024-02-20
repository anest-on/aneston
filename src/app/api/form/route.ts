/* eslint-disable camelcase */
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { auth } from '@/auth'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()
  console.log(body)
  const {
    doctor_url,
    pacient_name,
    pacient_birthdate,
    pacient_gender,
    pacient_email,
    pacient_number,
    pacient_healthInsurance,
    pacient_healthInsuranceName,
    pacient_healthInsuranceId,
    companion_name,
    companion_kinship,
    companion_email,
    companion_number,
    cirurgy_name,
    cirurgy_physician,
    pacient_weight,
    pacient_height,
    pacient_allergy,
    pacient_allergy_names,
    pacient_heart_conditions,
    pacient_heart_conditions_observation,
    pacient_disease,
    pacient_disease_names,
    pacient_medicines,
    pacient_antibiotic,
    pacient_antibiotics_names,
    pacient_did_cirurgy,
    pacient_cirurgies,
    pacient_smoke,
    pacient_started_smoking,
    pacient_stopped_smoking,
    pacient_when_stop_smoking,
    pacient_pack_smoke,
    pacient_do_physical_activity,
    pacient_physical_activity,
    pacient_has_anesthetic_complication,
    pacient_anesthetic_complications,
    pacient_procedure_summary,
  } = body

  // FAZER VERIFICAÇÃO DOS CAMPOS OBRIGATÓRIOS
  if (!doctor_url) {
    return new NextResponse('Complete os campos faltantes', { status: 400 })
  }

  const userExists = await prisma.user.findFirst({
    where: {
      user_link: doctor_url,
    },
  })

  if (!userExists) {
    return new NextResponse('Internal Error', { status: 400 })
  }

  // console.log(userExists)

  const form = await prisma.form.create({
    data: {
      doctor_id: userExists.id,
      pacient_name,
      pacient_birthdate,
      pacient_gender,
      pacient_email,
      pacient_number,
      pacient_healthInsurance,
      pacient_healthInsuranceName,
      pacient_healthInsuranceId,
      companion_name,
      companion_kinship,
      companion_email,
      companion_number,
      cirurgy_name,
      cirurgy_physician,
      pacient_weight,
      pacient_height,
      pacient_allergy,
      pacient_allergy_names,
      pacient_heart_conditions,
      pacient_heart_conditions_observation,
      pacient_disease,
      pacient_disease_names,
      pacient_medicines,
      pacient_antibiotic,
      pacient_antibiotics_names,
      pacient_did_cirurgy,
      pacient_cirurgies,
      pacient_smoke,
      pacient_started_smoking,
      pacient_stopped_smoking,
      pacient_when_stop_smoking,
      pacient_pack_smoke,
      pacient_do_physical_activity,
      pacient_physical_activity,
      pacient_has_anesthetic_complication,
      pacient_anesthetic_complications,
      pacient_procedure_summary,
    },
  })

  return NextResponse.json(form)
}
