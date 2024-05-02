// (Generoi palkkatietolomakkeesta pdf-tiedoston)
import { jsPDF } from 'jspdf'
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

function changePDFPage(doc) {
  doc.addPage()
  return 20  // returning new page start position (yPosition = 20)
}

const generatePDF = (formData, clientDetails, date) => {
  return new Promise((resolve, reject) => {
    const { clientName, clientEmail, clientNumber, clientCode, clientPeriod } = clientDetails
    const doc = new jsPDF()
    doc.setFont('helvetica')
    doc.setFontSize(12)
    doc.text(`Palkkatiedot, ${date}`, 105, 10, null, null, 'center') // Document title
    let yPosition = 20 // Initial vertical position
    const clientInfo = `Yritys: ${clientName}\nSähköposti: ${clientEmail}\nPuhelinnumero: ${clientNumber}\nY-tunnus: ${clientCode}\nPalkkakausi: ${clientPeriod}\n`
    doc.text(clientInfo, 10, yPosition)
    yPosition += 30 // Adjust vertical space after adding client info
    formData.employees.forEach((employee, index) => {
      const increment = 7 // Vertical space between lines
      if (yPosition > 280) { // If close to the bottom of the page, create a new one
        doc.addPage()
        yPosition = 10 // Reset position for the new page
      }
      doc.text(`Työntekijä ${index + 1}: ${employee.employee_name}`, 10, yPosition)
      yPosition += increment
      if (employee.month) {
        doc.text(`Palkkajakso: ${employee.month}`, 10, yPosition)
        yPosition += increment
      }
      yPosition += increment
      //yPosition = changePDFPage(doc)
      // Salary inforomation
      doc.text('PALKKATIEDOT', 10, yPosition)
      yPosition += increment
      doc.text('Palkat', 15, yPosition)
      yPosition += increment
      doc.text('Tuntimäärä', 20, yPosition)
      doc.text('Sunnuntaitunnit', 55, yPosition)
      doc.text('Tuntipalkka', 90, yPosition)
      doc.text('Kuukausipalkka', 125, yPosition)
      yPosition += increment
      if (employee.total_hours_weekdays) {
        doc.text(`${employee.total_hours_weekdays}`, 20, yPosition)
      }
      if (employee.total_hours_sundays) {
        doc.text(`${employee.total_hours_sundays}`, 55, yPosition)
      }
      if (employee.wage_hourly) {
        doc.text(`${employee.wage_hourly}`, 90, yPosition)
      }
      if (employee.wage_monthly) {
        doc.text(`${employee.wage_monthly}`, 125, yPosition)
      }
      yPosition += increment
      // Benefit information
      doc.text('Luontoisedut', 15, yPosition)
      yPosition += increment
      doc.text('Asuntoetu', 20, yPosition)
      doc.text('Autoetu', 55, yPosition)
      doc.text('Puhelinetu', 90, yPosition)
      yPosition += increment
      if (employee.flat_benefit) {
        doc.text(`${employee.flat_benefit}`, 20, yPosition)
      }
      if (employee.car_benefit) {
        doc.text(`${employee.car_benefit}`, 55, yPosition)
      }
      if (employee.phone_benefit) {
        doc.text(`${employee.phone_benefit}`, 90, yPosition)
      }
      yPosition += increment
      doc.text('Vähennykset', 15, yPosition)
      yPosition += increment
      doc.text('Lounarit', 20, yPosition)
      doc.text('Liikuntasetelit', 55, yPosition)
      yPosition += increment
      if (employee.lunch_benefit) {
        doc.text(`${employee.lunch_benefit}`, 20, yPosition)
      }
      if (employee.lunch_benefit_value) {
        doc.text(`x  ${employee.lunch_benefit_value} €`, 27, yPosition)
      }
      if (employee.sport_benefit) {
        doc.text(`${employee.sport_benefit}`, 55, yPosition)
      }
      if (employee.sport_benefit_value) {
        doc.text(`x  ${employee.sport_benefit_value} €`, 62, yPosition)
      }
      yPosition += increment
      yPosition += increment
      doc.text('Bruttopalkka yhteensä', 20, yPosition)
      doc.text('Luontoisedut', 90, yPosition)
      doc.text('Vähennykset', 125, yPosition)
      yPosition += increment
      doc.text(`${employee.wage_total_gross} €`, 20, yPosition)
      doc.text(`${employee.benefits_total} €`, 90, yPosition)
      doc.text(`${employee.reductions_total} €`, 125, yPosition)
      yPosition += increment
      yPosition += increment
      doc.text('Korvaukset ja päivärahat', 15, yPosition)
      yPosition += increment
      doc.text('Km-korvaukset', 20, yPosition)
      doc.text('Kotimaan päiväraha', 65, yPosition)
      doc.text('Kotimaan osapäivä', 110, yPosition)
      doc.text('Ulkomaan päiväraha', 155, yPosition)
      yPosition += 5
      doc.text('(maa ja päivien määrä)', 155, yPosition)
      yPosition += increment
      if (employee.mileage_allowance) {
        doc.text(`${employee.mileage_allowance}`, 20, yPosition)
      }
      if (employee.daily_allowance_domestic) {
        doc.text(`${employee.daily_allowance_domestic}`, 65, yPosition)
      }
      if (employee.daily_allowance_domestic_part_time) {
        doc.text(`${employee.daily_allowance_domestic_part_time}`, 110, yPosition)
      }
      if (employee.daily_allowance_foreign) {
        doc.text(`${employee.daily_allowance_foreign}`, 155, yPosition)
      }
      yPosition += increment
      // yPosition = changePDFPage(doc)
      // Absences
      if (employee.absence_reason_1) {
        yPosition += increment
        doc.text('POISSAOLOT', 10, yPosition)
        yPosition += increment
        doc.text('Syy', 15, yPosition)
        doc.text('Palkallinen', 100, yPosition)
        doc.text('Ajalta', 140, yPosition)
        yPosition += increment
      }
      if (employee.absence_compensated_1) {
        doc.text(`${employee.absence_reason_1}`, 15, yPosition)
        doc.text(`${employee.absence_compensated_1}`, 100, yPosition)
        doc.text(`${employee.absence_time_period_1}`, 140, yPosition)
        yPosition += increment
      }
      if (employee.absence_reason_2) {
        doc.text(`${employee.absence_reason_2}`, 15, yPosition)
        doc.text(`${employee.absence_compensated_2}`, 100, yPosition)
        doc.text(`${employee.absence_time_period_2}`, 140, yPosition)
        yPosition += increment
      }
      if (employee.absence_reason_3) {
        doc.text(`${employee.absence_reason_3}`, 15, yPosition)
        doc.text(`${employee.absence_compensated_3}`, 100, yPosition)
        doc.text(`${employee.absence_time_period_3}`, 140, yPosition)
        yPosition += increment
      }
      yPosition += increment
      // Additional information
      if (employee.extra) {
        doc.text(`Lisätiedot: ${employee.extra}`, 10, yPosition)
        yPosition += increment
      }
      // Ensure there's a visual separation between employees
      // yPosition += 5 // Add a little extra space before the next employee
      // If you want to a separate page for each employee, use the line below
      yPosition = changePDFPage(doc)
      // If you do not want a separate page for each employee, use the if statement below
      /*if (yPosition > 280) { // If close to the bottom of the page, create a new one
        doc.addPage()
        yPosition = 10 // Reset position for the new page
      }*/
    })
    const pdfBlob = doc.output('blob')
    resolve(pdfBlob)
  })
}

function uploadGeneratedPDF(dispatch, pdfBlob, clientId, clientName) {
  const formData = new FormData()
  formData.append('file', pdfBlob, `${clientName}.pdf`)
  formData.append('owner', clientId)
  dispatch(addFile(formData))
}

export { generatePDF, uploadGeneratedPDF }
