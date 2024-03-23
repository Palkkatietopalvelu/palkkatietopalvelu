import { jsPDF } from 'jspdf'
import { addFile } from '../reducers/fileReducer'

const generatePDF = (formData, clientDetails) => {
  return new Promise((resolve, reject) => {
    const { clientName, clientEmail, clientNumber, clientCode, clientPeriod } = clientDetails
    const doc = new jsPDF()
    doc.setFont('helvetica')
    doc.setFontSize(12)
    doc.text('Palkkatiedot', 105, 10, null, null, 'center') // Document title
    let yPosition = 20 // Initial vertical position
    const clientInfo = `Yritys: ${clientName}\nSähköposti: ${clientEmail}\nPuhelinnumero: ${clientNumber}\nY-tunnus: ${clientCode}\nPalkkakausi: ${clientPeriod}\n`
    doc.text(clientInfo, 10, yPosition)
    yPosition += 30 // Adjust vertical space after adding client info
    formData.employees.forEach((employee, index) => {
      const increment = 7 // Vertical space between lines
      doc.text(`Työntekijä ${index + 1}: ${employee.employee_name}`, 10, yPosition)
      yPosition += increment
      doc.text(`Palkkatyyppi: ${employee.salary_type}`, 10, yPosition)
      yPosition += increment
      if (employee.month) {
        doc.text(`Kuukausi: ${employee.month}`, 10, yPosition)
        yPosition += increment
      }
      yPosition += increment
      // Salary inforomation
      doc.text('PALKKATIEDOT', 10, yPosition)
      yPosition += increment
      doc.text('Tuntimäärä', 10, yPosition)
      doc.text('Sunnuntaitunnit', 45, yPosition)
      doc.text('Tuntipalkka', 80, yPosition)
      doc.text('Kuukausipalkka', 115, yPosition)
      doc.text('Bruttopalkka', 150, yPosition)
      yPosition += increment
      if (employee.total_hours_weekdays) {
        doc.text(`${employee.total_hours_weekdays}`, 10, yPosition)
      }
      if (employee.total_hours_sundays) {
        doc.text(`${employee.total_hours_sundays}`, 45, yPosition)
      }
      if (employee.wage_hourly) {
        doc.text(`${employee.wage_hourly}`, 80, yPosition)
      }
      if (employee.wage_monthly) {
        doc.text(`${employee.wage_monthly}`, 115, yPosition)
      }
      if (employee.wage_total_gross) {
        doc.text(`${employee.wage_total_gross}`, 150, yPosition)
      }
      yPosition += increment
      // Benefit information
      doc.text('Asuntoetu', 10, yPosition)
      doc.text('Autoetu', 45, yPosition)
      doc.text('Puhelinetu', 80, yPosition)
      doc.text('Lounarit', 115, yPosition)
      doc.text('Liikuntasetelit', 150, yPosition)
      yPosition += increment
      if (employee.flat_benefit) {
        doc.text(`${employee.flat_benefit}`, 10, yPosition)
      }
      if (employee.car_benefit) {
        doc.text(`${employee.car_benefit}`, 45, yPosition)
      }
      if (employee.phone_benefit) {
        doc.text(`${employee.flat_benefit}`, 80, yPosition)
      }
      if (employee.lunch_benefit) {
        doc.text(`${employee.lunch_benefit}`, 115, yPosition)
      }
      if (employee.sport_benefit) {
        doc.text(`${employee.sport_benefit}`, 150, yPosition)
      }
      yPosition += increment
      doc.text('Km-korvaukset', 10, yPosition)
      doc.text('Kotimaan päiväraha', 55, yPosition)
      doc.text('Kotimaan osapäivä', 100, yPosition)
      doc.text('Ulkomaan päiväraha', 145, yPosition)
      yPosition += increment
      if (employee.mileage_allowance) {
        doc.text(`${employee.mileage_allowance}`, 10, yPosition)
      }
      if (employee.daily_allowance_domestic) {
        doc.text(`${employee.daily_allowance_domestic}`, 55, yPosition)
      }
      if (employee.daily_allowance_domestic_part_time) {
        doc.text(`${employee.daily_allowance_domestic_part_time}`, 100, yPosition)
      }
      if (employee.daily_allowance_foreign) {
        doc.text(`${employee.daily_allowance_foreign}`, 145, yPosition)
      }
      yPosition += increment
      // Absences
      if (employee.absence_reason_1) {
        yPosition += increment
        doc.text('POISSAOLOT', 10, yPosition)
        yPosition += increment
        doc.text(`Syy`, 10, yPosition)
        doc.text(`Palkallinen`, 90, yPosition)
        doc.text(`Ajalta`, 140, yPosition)
        yPosition += increment
      }
      if (employee.absence_compensated_1) {
        doc.text(`${employee.absence_reason_1}`, 10, yPosition)
        doc.text(`${employee.absence_compensated_1}`, 90, yPosition)
        doc.text(`${employee.absence_time_period_1}`, 140, yPosition)
        yPosition += increment
      }
      if (employee.absence_reason_2) {
        doc.text(`${employee.absence_reason_2}`, 10, yPosition)
        doc.text(`${employee.absence_compensated_2}`, 90, yPosition)
        doc.text(`${employee.absence_time_period_2}`, 140, yPosition)
        yPosition += increment
      }
      if (employee.absence_reason_3) {
        doc.text(`${employee.absence_reason_3}`, 10, yPosition)
        doc.text(`${employee.absence_compensated_3}`, 90, yPosition)
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
      yPosition += 5 // Add a little extra space before the next employee
      if (yPosition > 280) { // If close to the bottom of the page, create a new one
        doc.addPage()
        yPosition = 10 // Reset position for the new page
      }
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
