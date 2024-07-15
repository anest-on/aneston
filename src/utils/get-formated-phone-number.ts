export const getFormatedPhoneNumber = (value: string) => {
  if (!value) return ''
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, '($1) $2')
  value = value.replace(/(\d)(\d{4})$/, '$1-$2')
  return value
}

export const getCleanPhoneNumber = (value: string) => {
  if (!value) return ''
  value = value.replace('(', '')
  value = value.replace(')', '')
  value = value.replace(' ', '')
  value = value.replace('-', '')
  return value
}
