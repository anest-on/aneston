export const getAgeFromDate = (dateString: string) => {
  const today = new Date()

  const birthDate = new Date(dateString)

  let age = today.getFullYear() - birthDate.getFullYear()

  const m = today.getMonth() - birthDate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  if (age === 0) {
    age = today.getMonth() - birthDate.getMonth()

    if (age < 0 || (age === 1 && today.getDate() < birthDate.getDate())) {
      age--
    }

    if (age <= 0) return 'menos de um mês de idade'

    return age === 1 ? `${age} mês` : `${age} meses`
  }

  return age === 1 ? `${age} ano` : `${age} anos`
}
