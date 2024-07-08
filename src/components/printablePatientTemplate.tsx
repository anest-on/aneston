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
            <div className="flex flex-col items-center mb-8">
              <Image src={logoPDF} width={200} alt="AnestOn" />
            </div>
            <div className="text-center text-2xl font-bold mb-8">
              INFORMAÇÕES DO PACIENTE
            </div>
            <p className="avoid-page-break font-bold text-2xl mb-2">
              Identificação do Paciente
            </p>
            <div className="mb-8 text-lg">
              <div className="flex justify-between mb-2">
                <p className="avoid-page-break">
                  <span className="underline">Nome</span>:{' '}
                  {patient.pacient_name}
                </p>
                <p className="avoid-page-break">
                  <span className="underline">Data de Nascimento</span>:{' '}
                  {patient.pacient_birthdate} - (
                  {getAgeFromDate(patient.pacient_birthdate)})
                </p>
              </div>
              <p className="avoid-page-break mb-2">
                <span className="underline">Sexo</span>:{' '}
                {patient.pacient_gender}
              </p>
              <div className="flex justify-between mb-2">
                <p className="avoid-page-break">
                  <span className="underline">E-mail</span>:{' '}
                  {patient.pacient_email}
                </p>
                <p className="avoid-page-break">
                  <span className="underline">Número de Celular</span>:{' '}
                  {patient.pacient_number}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="avoid-page-break">
                  <span className="underline">Plano de Saúde</span>:{' '}
                  {patient.pacient_healthInsurance === 'Sim'
                    ? patient.pacient_healthInsuranceName
                    : 'Nenhum'}
                </p>
                <p className="avoid-page-break">
                  {patient.pacient_healthInsurance === 'Sim' ? (
                    <>
                      <span className="underline">Número de Matrícula</span>:{' '}
                      {patient.pacient_healthInsuranceId}
                    </>
                  ) : (
                    ''
                  )}
                </p>
              </div>
            </div>

            <p className="avoid-page-break font-bold text-2xl mb-2">
              Identificação do Familiar / Acompanhante
            </p>
            <div className="mb-8 text-lg">
              <p className="avoid-page-break mb-2">
                <span className="underline">Nome</span>:{' '}
                {patient.companion_name}
              </p>
              <p className="avoid-page-break mb-2">
                <span className="underline">Grau de Parentesco</span>:{' '}
                {patient.companion_kinship}
              </p>
              <div className="flex justify-between">
                <p className="avoid-page-break">
                  <span className="underline">E-mail</span>:{' '}
                  {patient.companion_email}
                </p>
                <p className="avoid-page-break">
                  <span className="underline">Número de Celular</span>:{' '}
                  {patient.companion_number}
                </p>
              </div>
            </div>

            <p className="avoid-page-break font-bold text-2xl mb-2">
              Informações do Paciente
            </p>
            <div className="mb-8 text-lg">
              <div className="flex justify-between mb-2">
                <p className="avoid-page-break">
                  <span className="underline">Cirurgia</span>:{' '}
                  {patient.cirurgy_name}
                </p>
                <p className="avoid-page-break">
                  <span className="underline">Nome do Cirurgião</span>:{' '}
                  {patient.cirurgy_physician}
                </p>
              </div>
              <div className="flex mb-2">
                <p className="avoid-page-break mr-12">
                  <span className="underline">Peso</span>:{' '}
                  {patient.pacient_weight}
                </p>
                <p className="avoid-page-break mr-12">
                  <span className="underline">Altura</span>:{' '}
                  {patient.pacient_height}
                </p>
                <p className="avoid-page-break">
                  <span className="underline">IMC</span>::{' '}
                  {(
                    Number(patient.pacient_weight) /
                    (parseFloat(patient.pacient_height!.replace(',', '.')) *
                      parseFloat(patient.pacient_height!.replace(',', '.')))
                  ).toFixed(2)}
                </p>
              </div>
              <p className="avoid-page-break mb-2">
                <span className="underline">
                  Alergias alimentares e/ou farmacológicas
                </span>
                :{' '}
                {patient.pacient_allergy === 'Sim'
                  ? patient.pacient_allergy_names?.join(', ')
                  : 'Nenhuma'}
              </p>
              <p className="avoid-page-break">
                <span className="underline">Condições cardíacas</span>:{' '}
                {patient.pacient_heart_conditions
                  ? patient.pacient_heart_conditions.join(', ')
                  : 'Nenhuma'}
              </p>
              <p className="avoid-page-break">
                {patient.pacient_heart_conditions
                  ? 'Descrição: ' + patient.pacient_heart_conditions_observation
                  : ''}
              </p>
              <p className="avoid-page-break mt-2 mb-2">
                <span className="underline">Outras Comorbidades</span>:{' '}
                {patient.pacient_disease === 'Sim'
                  ? patient.pacient_disease_names?.join(', ')
                  : 'Nenhuma'}
              </p>
              <p className="avoid-page-break mb-2">
                <span className="underline">Medicamentos de uso contínuo</span>:{' '}
                {CreateMedicinesString(patient)}
              </p>
              <p className="avoid-page-break mb-2">
                <span className="underline">
                  Antibióticos usados nos últimos 6 meses
                </span>
                :{' '}
                {patient.pacient_antibiotic
                  ? patient.pacient_antibiotics_names?.join(', ')
                  : 'Nenhum'}
              </p>
              <p className="avoid-page-break mb-2">
                <span className="underline">Cirurgias Prévias</span>:{' '}
                {CreateCirurgiesString(patient)}
              </p>
              <p className="avoid-page-break mb-2">
                <span className="underline">Histórico de Tabagismo</span>:{' '}
                {PatientSmokeString(patient)}
              </p>
              <p className="avoid-page-break mb-2">
                <span className="underline">Atividade física</span>:{' '}
                {CreatePhysicalActivitiesString(patient)}
              </p>
              <p className="avoid-page-break">
                <span className="underline">Complicações anestésicas</span>:{' '}
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
