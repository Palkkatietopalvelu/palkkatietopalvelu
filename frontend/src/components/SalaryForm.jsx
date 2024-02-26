import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { useField } from '../hooks'
import { DateSelect } from '../hooks/DatePicker'
import SalaryFormContent from './SalaryFormContent'
import { generatePDF, uploadGeneratedPDF } from './PdfGenerator'

const SalaryForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const user = useSelector(({ user }) => user)
  const {
    clientId,
    clientName,
    clientEmail,
    clientNumber,
    clientCode,
    clientPeriod,
  } = location.state || {}
  const [employees, setEmployees] = useState([])
  const [formType, setFormType] = useState('monthly')

  const employee_name = useField()
  const absences = DateSelect()
  const provisions = useField()
  const lunch_allowance = useField()
  const overtime = useField()
  const daily_allowance = useField()
  const mileage_allowance = useField()
  const total_hours = useField()
  const extra = useField()

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (employees.length === 0) {
      alert('Lisää vähintään yhden työntekijän tiedot ennen lähettämistä.')
      return
    }
    const formData = {
      employees,
    }
    try {
      const pdfBlob = await generatePDF(formData, { clientName, clientEmail, clientNumber, clientCode, clientPeriod })
      uploadGeneratedPDF(dispatch, pdfBlob, clientId, clientName)
      navigate('/')
    } catch (error) {
      console.error('Error generating or uploading PDF:', error)
    }
  }

  const addEmployee = () => {
    if (!employee_name.value.trim()) {
      alert('Työntekijän nimi on pakollinen tieto.')
      return
    }
    let employeeData = {
      employee_name: employee_name.value,
      salary_type: formType === 'monthly' ? 'Kuukausipalkkalainen' : 'Tuntipalkkalainen',
    }
    if (absences.value) employeeData.absences = absences.value
    if (formType === 'monthly' && provisions.value) employeeData.provisions = provisions.value
    if (lunch_allowance.value) employeeData.lunch_allowance = lunch_allowance.value
    if (formType === 'monthly' && overtime.value) employeeData.overtime = overtime.value
    if (daily_allowance.value) employeeData.daily_allowance = daily_allowance.value
    if (mileage_allowance.value) employeeData.mileage_allowance = mileage_allowance.value
    if (formType === 'hourly' && total_hours.value) employeeData.total_hours = total_hours.value
    if (extra.value) employeeData.extra = extra.value
    setEmployees([...employees, employeeData])
    employee_name.onReset()
    absences.onReset()
    provisions.onReset()
    lunch_allowance.onReset()
    overtime.onReset()
    daily_allowance.onReset()
    mileage_allowance.onReset()
    total_hours.onReset()
    extra.onReset()
  }

  const deleteEmployee = (index) => {
    const newEmployees = [...employees]
    newEmployees.splice(index, 1)
    setEmployees(newEmployees)
  }

  return (
    <>
      <SalaryFormContent
        formType={formType}
        setFormType={setFormType}
        employee_name={employee_name}
        absences={absences}
        provisions={provisions}
        lunch_allowance={lunch_allowance}
        overtime={overtime}
        daily_allowance={daily_allowance}
        mileage_allowance={mileage_allowance}
        total_hours={total_hours}
        extra={extra}
        addEmployee={addEmployee}
        employees={employees}
        deleteEmployee={deleteEmployee}
        handleSubmit={handleSubmit}
        navigate={navigate}
      />
    </>
  )
}

export default SalaryForm
