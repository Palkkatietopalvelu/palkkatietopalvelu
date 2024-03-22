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
      if (employee.absences && employee.absences.length > 0) {
        const absencesString = employee.absences.join(', ')
        doc.text(`Poissaolot: ${absencesString}`, 10, yPosition)
        yPosition += increment
      }
      if (employee.provisions) {
        doc.text(`Provisiot: ${employee.provisions}`, 10, yPosition)
        yPosition += increment
      }
      if (employee.overtime) {
        doc.text(`Ylityöt: ${employee.overtime}`, 10, yPosition)
        yPosition += increment
      }
      if (employee.lunch_allowance) {
        doc.text(`Lounasetu: ${employee.lunch_allowance}`, 10, yPosition)
        yPosition += increment
      }
      if (employee.daily_allowance) {
        doc.text(`Päivärahat: ${employee.daily_allowance}`, 10, yPosition)
        yPosition += increment
      }
      if (employee.mileage_allowance) {
        doc.text(`Km-korvaukset: ${employee.mileage_allowance}`, 10, yPosition)
        yPosition += increment
      }
      if (employee.total_hours) {
        doc.text(`Kokonaistuntimäärä: ${employee.total_hours}`, 10, yPosition)
        yPosition += increment
      }
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
