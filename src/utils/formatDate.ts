export function formatDate(inputDate: string): string {
  const dateParts = inputDate.split(' ')[0].split('-')
  const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`
  return formattedDate
}
