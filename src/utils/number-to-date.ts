const numberToDate = (dateInNumber: number) => {
  switch (dateInNumber) {
    case 0:
      return 'domingo'

    case 1:
      return 'segunda-feira'

    case 2:
      return 'terça-feira'

    case 3:
      return 'quarta-feira'

    case 4:
      return 'quinta-feira'

    case 5:
      return 'sexta-feira'

    case 6:
      return 'sábado'
  }
}

export default numberToDate
