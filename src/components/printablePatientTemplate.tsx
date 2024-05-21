/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Patient } from '@/app/dashboard/columns'
import logoPDF from '@/images/LogoPDF.png'
import { getAgeFromDate } from '@/utils/calculate-years'
import Image from 'next/image'
import React from 'react'
import { roboto } from '../app/fonts'
import {
  CreateCirurgiesString,
  CreateMedicinesString,
  CreatePhysicalActivitiesString,
  PatientSmokeString,
} from './pdfFunctions'

interface Props {
  patient: Patient
}

const PrintablePatientTemplate = React.forwardRef<HTMLDivElement, Props>(
  ({ patient }, ref) => {
    return (
      <div className="h-0 hidden">
        <style type="text/css" media="print">
          {`@page { size: portrait, title: 'title' }`}
        </style>
        <div ref={ref} className={`${roboto.className} "w-full"`}>
          <div className="p-0 w-full">
            <div className="flex flex-col items-center mb-4">
              <Image src={logoPDF} width={200} alt="AnestOn" />
            </div>
            <div className="text-center text-xl font-bold mb-4">
              INFORMAÇÕES DO PACIENTE
            </div>
            <p className="font-bold text-xl mb-2">Identificação do Paciente</p>
            <div className="border border-gray-900 p-4 mb-4">
              <div className="flex justify-between mb-2">
                <p>Nome: {patient.pacient_name}</p>
                <p>
                  Data de Nascimento: {patient.pacient_birthdate} - (
                  {getAgeFromDate(patient.pacient_birthdate)})
                </p>
              </div>
              <p className="mb-2">Sexo: {patient.pacient_gender}</p>
              <div className="flex justify-between mb-2">
                <p>E-mail: {patient.pacient_email}</p>
                <p>Número de Celular: {patient.pacient_number}</p>
              </div>
              <div className="flex justify-between">
                <p>
                  Plano de Saúde:{' '}
                  {patient.pacient_healthInsurance === 'Sim'
                    ? patient.pacient_healthInsuranceName
                    : 'Nenhum'}
                </p>
                <p>
                  {patient.pacient_healthInsurance === 'Sim'
                    ? 'Número de Matrícula: ' +
                      patient.pacient_healthInsuranceId
                    : ''}
                </p>
              </div>
            </div>

            <p className="font-bold text-xl mb-2">
              Identificação do Familiar / Acompanhante
            </p>
            <div className="border border-gray-900 p-4 mb-4">
              <p className="mb-2">Nome: {patient.companion_name}</p>
              <p className="mb-2">
                Grau de Parentesco: {patient.companion_kinship}
              </p>
              <div className="flex justify-between">
                <p>E-mail: {patient.companion_email}</p>
                <p>Número de Celular: {patient.companion_number}</p>
              </div>
            </div>

            <p className="font-bold text-xl mb-2">Informações do Paciente</p>
            <div className="border border-gray-900 p-4 mb-4">
              <div className="flex justify-between mb-2">
                <p>Cirurgia: {patient.cirurgy_name}</p>
                <p>Nome do Cirurgião: {patient.cirurgy_physician}</p>
              </div>
              <div className="flex mb-2">
                <p className="mr-12">Peso: {patient.pacient_weight}</p>
                <p className="mr-12">Altura: {patient.pacient_height}</p>
                <p>
                  IMC:{' '}
                  {(
                    Number(patient.pacient_weight) /
                    (parseFloat(patient.pacient_height!.replace(',', '.')) *
                      parseFloat(patient.pacient_height!.replace(',', '.')))
                  ).toFixed(2)}
                </p>
              </div>
              <p className="mb-2">
                Alergias alimentares e/ou farmacológicas:{' '}
                {patient.pacient_allergy === 'Sim'
                  ? patient.pacient_allergy_names?.join(', ')
                  : 'Nenhuma'}
              </p>
              <p>
                Condições cardíacas:{' '}
                {patient.pacient_heart_conditions
                  ? patient.pacient_heart_conditions.join(', ')
                  : 'Nenhuma'}
              </p>
              <p>
                {patient.pacient_heart_conditions
                  ? 'Descrição: ' + patient.pacient_heart_conditions_observation
                  : ''}
              </p>
              <p className="mt-2 mb-2">
                Outras Comorbidades:{' '}
                {patient.pacient_disease === 'Sim'
                  ? patient.pacient_disease_names?.join(', ')
                  : 'Nenhuma'}
              </p>
              <p className="mb-2">
                Medicamentos de uso contínuo: {CreateMedicinesString(patient)}
              </p>
              <p className="mb-2">
                Antibióticos usados nos últimos 6 meses:{' '}
                {patient.pacient_antibiotic
                  ? patient.pacient_antibiotics_names?.join(', ')
                  : 'Nenhum'}
              </p>
              <p className="mb-2">
                Cirurgias Prévias: {CreateCirurgiesString(patient)}
              </p>
              <p className="mb-2">
                Histórico de Tabagismo: {PatientSmokeString(patient)}
              </p>
              <p className="mb-2">
                Atividade física: {CreatePhysicalActivitiesString(patient)}
              </p>
              <p>
                Complicações anestésicas:{' '}
                {patient.pacient_has_anesthetic_complication
                  ? patient.pacient_anesthetic_complications?.join(', ')
                  : 'Nenhuma'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

PrintablePatientTemplate.displayName = 'PrintablePatientTemplate'

export { PrintablePatientTemplate }
