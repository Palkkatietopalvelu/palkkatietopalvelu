// (Generoi palkkatietolomakkeesta csv-tiedoston)
import { addFile } from '../reducers/fileReducer'

function convertToCSV(objArray, clientDetails, date) {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
  console.log('convertToCSV array: ', array)
  let str = 'PALKKATIEDOT \r\n'
  str += 'Raportti lähetetty  ,  ' + date + '\r\n'

  // Append client details
  str += 'Yritys,' + clientDetails.clientName + '\r\n'
  str += 'Sähköposti,' + clientDetails.clientEmail + '\r\n'
  str += 'Puhelinnumero,' + clientDetails.clientNumber + '\r\n'
  str += 'Y-tunnus,' + clientDetails.clientCode + '\r\n'
  str += 'Palkkakausi,' + clientDetails.clientPeriod + '\r\n'

  // Add an empty row
  str += '\r\n'

  // Extract headers
  str += 'Palkansaaja,Palkkajakso,\
Tuntimäärä,Sunnuntaitunnit,Tuntipalkka €,Kk-palkat,Asuntoetu,Autoetu,\
Puh.etu,Bruttopalkka yhteensä,Lounarimäärä,Lounarihinta,Liikuntasetelit,Liikuntasetelin arvo\
Km-korvaus (km),Kotimaan päiväraha,Kotimaan osapäivä,Ulkomaan päivärahat (maa ja päivien määrä),Lisäinfo\n'

  // Initialize totals
  let totals = {
    total_hours_weekdays: 0,
    total_hours_sundays: 0,
    wage_hourly: 0,
    wage_monthly: 0,
    flat_benefit: 0,
    car_benefit: 0,
    phone_benefit: 0,
    wage_total_gross: 0,
    lunch_benefit: 0,
    lunch_benefit_value: 0,
    lunch_benefit_total: 0,
    sport_benefit: 0,
    sport_benefit_value: 0,
    mileage_allowance: 0,
    daily_allowance_domestic: 0,
    daily_allowance_domestic_part_time: 0,
    daily_allowance_foreign: 0,
    absence_reason_1: '',
    absence_reason_2: '',
    absence_reason_3: '',
    absence_reason_4: '',
    absence_reason_5: '',
    absence_reason_6: '',
    absence_reason_7: '',
    absence_reason_8: '',
    absence_reason_9: '',
    absence_reason_10: '',
  }

  for (let i = 0; i < array.length; i++) {
    let line = ''
    line += `"${array[i].employee_name}",`
    line += `"${array[i].month}",`
    //line += `"${array[i].salary_type}",`
    //line += `"${array[i].absences ? formatAbsencesDates(array[i].absences).join('|') : ''}",`

    totals.total_hours_weekdays += Number(array[i].total_hours_weekdays || 0)
    totals.total_hours_sundays += Number(array[i].total_hours_sundays || 0)
    totals.wage_hourly += Number(array[i].wage_hourly || 0)
    totals.wage_monthly += Number(array[i].wage_monthly || 0)
    totals.flat_benefit += Number(array[i].flat_benefit || 0)
    totals.car_benefit += Number(array[i].car_benefit || 0)
    totals.phone_benefit += Number(array[i].phone_benefit || 0)
    totals.wage_total_gross += Number(array[i].wage_total_gross || 0)
    totals.lunch_benefit += Number(array[i].lunch_benefit || 0)
    totals.lunch_benefit_value += Number(array[i].lunch_benefit_value || 0)
    totals.lunch_benefit_total += Number(array[i].lunch_benefit_total || 0)
    totals.sport_benefit += Number(array[i].sport_benefit || 0)
    totals.sport_benefit_value += Number(array[i].sport_benefit_value || 0)
    totals.mileage_allowance += Number(array[i].mileage_allowance || 0)
    totals.daily_allowance_domestic += Number(array[i].daily_allowance_domestic || 0)
    totals.daily_allowance_domestic_part_time += Number(array[i].daily_allowance_domestic_part_time || 0)
    totals.daily_allowance_foreign += Number(array[i].daily_allowance_foreign || 0)

    line += `"${array[i].total_hours_weekdays || ''}",`
    line += `"${array[i].total_hours_sundays || ''}",`
    line += `"${array[i].wage_hourly || ''}",`
    line += `"${array[i].wage_monthly || ''}",`
    line += `"${array[i].flat_benefit || ''}",`
    line += `"${array[i].car_benefit || ''}",`
    line += `"${array[i].phone_benefit || ''}",`
    line += `"${array[i].wage_total_gross || ''}",`
    line += `"${array[i].lunch_benefit || ''}",`
    line += `"${array[i].lunch_benefit_value || ''}",`
    line += `"${array[i].sport_benefit || ''}",`
    line += `"${array[i].sport_benefit_value || ''}",`
    line += `"${array[i].mileage_allowance || ''}",`
    line += `"${array[i].daily_allowance_domestic || ''}",`
    line += `"${array[i].daily_allowance_domestic_part_time || ''}",`
    line += `"${array[i].daily_allowance_foreign || ''}",`
    line += `"${array[i].extra || ''}"`
    str += line + '\r\n'
  }

  // Add 2 empty rows
  str += '\r\n'
  str += '\r\n'

  // Add totals row and two empty rows after that
  str += ',,,,,,,,"Yhteensä",'
  str += `"${totals.wage_total_gross} €",`
  str += '\r\n'
  str += '\r\n'

  str += ',,,,,,,,"Tarkistusrivit",\n'
  str += ',,,,,,,,"Rahapalkka",'
  str += `"${totals.wage_total_gross}",\n`
  str += ',,,,,,,,"Luontoisedut",'
  const totalBenefits = totals.flat_benefit + totals.car_benefit + totals.phone_benefit
  str += `"${totalBenefits}",\n`
  str += ',,,,,,,,"Vähennykset",-'
  str += `${totals.lunch_benefit_total},\n`

  str += 'POISSAOLOT' + '\r\n'
  str += 'Palkansaaja,Syy,Palkallinen,Ajalta\n'

  // Loop through each employee
  array.forEach(employee => {
    let hasAbsences = false
    let employeeLines = ''

    // Loop through each possible absence
    for (let i = 1; i <= 10; i++) {
      const reason = employee[`absence_reason_${i}`]
      const compensated = employee[`absence_compensated_${i}`]
      const period = employee[`absence_time_period_${i}`]

      if (reason !== undefined && compensated !== undefined && period !== undefined) {
        hasAbsences = true
        // Update totals
        totals[`absence_reason_${i}`] += (reason || '')
        totals[`absence_compensated_${i}`] += (compensated || '')
        totals[`absence_time_period_${i}`] += (period || '')

        employeeLines += `"${employee.employee_name}",`
        employeeLines += `"${reason || ''}",`
        employeeLines += `"${compensated || ''}",`
        employeeLines += `"${period || ''}",\n`
      }
    }

    if (!hasAbsences) {
      employeeLines += `"${employee.employee_name}","Ei syötettyjä poissaoloja",,,\n`
    }

    str += employeeLines
  })
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
