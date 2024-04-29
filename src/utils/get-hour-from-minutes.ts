export default function getHourFromMinutes(n: number) {
  // Store the input number of minutes in a variable num
  const num = n
  // Calculate the total hours by dividing the number of minutes by 60
  const hours = num / 60
  // Round down the total hours to get the number of full hours
  const rhours = Math.floor(hours)
  // Calculate the remaining minutes after subtracting the full hours from the total hours
  const minutes = (hours - rhours) * 60
  // Round the remaining minutes to the nearest whole number
  const rminutes = Math.round(minutes)
  // Construct and return a string representing the conversion result
  return [
    String(rhours).length < 2 ? '0' + String(rhours) : String(rhours),
    String(rminutes).length < 2 ? '0' + String(rminutes) : String(rminutes),
  ]
}
