// CsvGenerator.jsx
import { addFile } from '../reducers/fileReducer'

function formatAbsencesDates(absences) {
  return absences.map(item => {
    let dateItem = item
    if (!(dateItem instanceof Date)) {
      dateItem = new Date(dateItem)
    }
    const year = dateItem.getFullYear()
    const month = String(dateItem.getMonth() + 1).padStart(2, '0')
    const day = String(dateItem.getDate()).padStart(2, '0')
    return `${day}.${month}.${year}`
  })
}


function convertToCSV(objArray, clientDetails, date) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
  let str = 'palkkatiedot,' + date + '\r\n'

  // Append client details
  str += 'Yritys,' + clientDetails.clientName + '\r\n'
  str += 'Sähköposti,' + clientDetails.clientEmail + '\r\n'
  str += 'Puhelinnumero,' + clientDetails.clientNumber + '\r\n'
  str += 'Y-tunnus,' + clientDetails.clientCode + '\r\n'
  str += 'Palkkakausi,' + clientDetails.clientPeriod + '\r\n'

  // Add an empty row
  str += '\r\n'

  // Extract headers
  str += 'Työntekijän nimi,Palkkatyyppi,Poissaolot,Provisiot,Ylityöt,Lounasetu,Päivärahat,Km-korvaukset,Kokonaistuntimäärä,Lisätiedot\n'

  // Initialize totals
  let totals = {
    provisions: 0,
    overtime: 0,
    lunch_allowance: 0,
    daily_allowance: 0,
    mileage_allowance: 0,
    total_hours: 0,
  }

  for (let i = 0; i < array.length; i++) {
    let line = ''
    line += `"${array[i].employee_name}",`
    line += `"${array[i].salary_type}",`
    line += `"${array[i].absences ? formatAbsencesDates(array[i].absences).join('|') : ''}",`

    totals.provisions += Number(array[i].provisions || 0)
    totals.overtime += Number(array[i].overtime || 0)
    totals.lunch_allowance += Number(array[i].lunch_allowance || 0)
    totals.daily_allowance += Number(array[i].daily_allowance || 0)
    totals.mileage_allowance += Number(array[i].mileage_allowance || 0)
    totals.total_hours += Number(array[i].total_hours || 0)

    line += `"${array[i].provisions || ''}",`
    line += `"${array[i].overtime || ''}",`
    line += `"${array[i].lunch_allowance || ''}",`
    line += `"${array[i].daily_allowance || ''}",`
    line += `"${array[i].mileage_allowance || ''}",`
    line += `"${array[i].total_hours || ''}",`
    line += `"${array[i].extra || ''}"`
    str += line + '\r\n'
  }

  // Add an empty row
  str += '\r\n'

  // Add totals row
  str += '"yhteensä",,,'
  str += `"${totals.provisions}",`
  str += `"${totals.overtime}",`
  str += `"${totals.lunch_allowance}",`
  str += `"${totals.daily_allowance}",`
  str += `"${totals.mileage_allowance}",`
  str += `"${totals.total_hours}",`
  str += '\r\n'

  return str
}

const generateCSV = async (formData, clientDetails, date) => {
  const csvData = convertToCSV(formData.employees, clientDetails, date)
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  return blob
}

function uploadGeneratedCSV(dispatch, csvBlob, clientId, clientName) {
  const formData = new FormData()
  formData.append('file', csvBlob, `${clientName}.csv`)
  formData.append('owner', clientId)
  dispatch(addFile(formData))
}

export { generateCSV, uploadGeneratedCSV }
