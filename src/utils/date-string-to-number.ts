const stringDateToNumber = (dateInString: string) => {
  switch (dateInString) {
    case 'domingo':
      return 0

    case 'segunda-feira':
      return 1

    case 'terça-feira':
      return 2

    case 'quarta-feira':
      return 3

    case 'quinta-feira':
      return 4

    case 'sexta-feira':
      return 5

    case 'sábado':
      return 6
  }
}

export default stringDateToNumber
