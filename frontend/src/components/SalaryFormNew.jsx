// ./client/{client.id}/salaryform (Palkkatietolomake, vain asiakkaille)
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useField } from '../hooks'
import { DateSelect } from '../hooks/DatePicker'
import SalaryFormContentNew from './SalaryFormContentNew'
import { generatePDF, uploadGeneratedPDF } from './PdfGenerator'
import { generateCSV, uploadGeneratedCSV } from './CsvGenerator'

const SalaryForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { id: ParamClientId } = useParams()
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients)
  const client = clients.find(c => c.email === user.username)
  const {
    clientId,
    clientName,
    clientEmail,
    clientNumber,
    clientCode,
    clientPeriod,
  } = location.state || {}
  const urlClientId = Number(ParamClientId)
  const [employees, setEmployees] = useState([])
  const [formType, setFormType] = useState('monthly')

  const employee_name = useField()
  const month = useField()
  const total_hours_weekdays = useField()
  const total_hours_sundays = useField()
  const wage_hourly = useField()
  const wage_monthly = useField()
  const wage_total_gross = useField()
  const flat_benefit = useField()
  const car_benefit = useField()
  const phone_benefit = useField()
  const lunch_benefit = useField()
  const sport_benefit = useField()
  const mileage_allowance = useField()
  const daily_allowance_domestic = useField()
  const daily_allowance_domestic_part_time = useField()
  const daily_allowance_foreign = useField()
  const absence_reason_1 = useField()
  const absence_compensated_1 = useField()
  const absence_time_period_1 = useField()
  const absence_reason_2 = useField()
  const absence_compensated_2 = useField()
  const absence_time_period_2 = useField()
  const absence_reason_3 = useField()
  const absence_compensated_3 = useField()
  const absence_time_period_3 = useField()
  const extra = useField()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else if (!client || client.id !== urlClientId) {
      console.error('Unauthorized access or client not found.')
      navigate('/')
    }
  }, [user, client, urlClientId, navigate])

  const formatDate = (date) => {
    const d = new Date(date),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear()
    return [(day.length < 2 ? '0' : '') + day, (month.length < 2 ? '0' : '') + month, year].join('.')
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
    const currentDate = formatDate(new Date())
    try {
      const pdfBlob = await generatePDF(formData, { clientName, clientEmail, clientNumber, clientCode, clientPeriod })
      const csvBlob = await generateCSV(formData, { clientName, clientEmail, clientNumber, clientCode, clientPeriod }, currentDate)
      uploadGeneratedPDF(dispatch, pdfBlob, clientId, clientName)
      uploadGeneratedCSV(dispatch, csvBlob, clientId, clientName)
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
    if (month.value) employeeData.month = month.value
    if (total_hours_weekdays.value) employeeData.total_hours_weekdays = total_hours_weekdays.value
    if (total_hours_sundays.value) employeeData.total_hours_sundays = total_hours_sundays.value
    if (wage_hourly.value) employeeData.wage_hourly = wage_hourly.value
    if (wage_monthly.value) employeeData.wage_monthly = wage_monthly.value
    if (wage_total_gross.value) employeeData.wage_total_gross = wage_total_gross.value
    if (flat_benefit.value) employeeData.flat_benefit = flat_benefit.value
    if (car_benefit.value) employeeData.car_benefit = car_benefit.value
    if (phone_benefit.value) employeeData.phone_benefit = phone_benefit.value
    if (lunch_benefit.value) employeeData.lunch_benefit = lunch_benefit.value
    if (sport_benefit.value) employeeData.sport_benefit = sport_benefit.value
    if (mileage_allowance.value) employeeData.mileage_allowance = mileage_allowance.value
    if (daily_allowance_domestic.value) employeeData.daily_allowance_domestic = daily_allowance_domestic.value
    if (daily_allowance_domestic_part_time.value) employeeData.daily_allowance_domestic_part_time = daily_allowance_domestic_part_time.value
    if (daily_allowance_foreign.value) employeeData.daily_allowance_foreign = daily_allowance_foreign.value
    if (absence_reason_1.value) employeeData.absence_reason_1 = absence_reason_1.value
    if (absence_compensated_1.value) employeeData.absence_compensated_1 = absence_compensated_1.value
    if (absence_time_period_1.value) employeeData.absence_time_period_1 = absence_time_period_1.value
    if (absence_reason_2.value) employeeData.absence_reason_2 = absence_reason_2.value
    if (absence_compensated_2.value) employeeData.absence_compensated_2 = absence_compensated_2.value
    if (absence_time_period_2.value) employeeData.absence_time_period_2 = absence_time_period_2.value
    if (absence_reason_3.value) employeeData.absence_reason_3 = absence_reason_3.value
    if (absence_compensated_3.value) employeeData.absence_compensated_3 = absence_compensated_3.value
    if (absence_time_period_3.value) employeeData.absence_time_period_3 = absence_time_period_3.value
    if (extra.value) employeeData.extra = extra.value
    setEmployees([...employees, employeeData])
    employee_name.onReset()
    month.onReset()
    total_hours_weekdays.onReset()
    total_hours_sundays.onReset()
    wage_hourly.onReset()
    wage_monthly.onReset()
    wage_total_gross.onReset()
    flat_benefit.onReset()
    car_benefit.onReset()
    phone_benefit.onReset()
    lunch_benefit.onReset()
    sport_benefit.onReset()
    mileage_allowance.onReset()
    daily_allowance_domestic.onReset()
    daily_allowance_domestic_part_time.onReset()
    daily_allowance_foreign.onReset()
    absence_reason_1.onReset()
    absence_reason_2.onReset()
    absence_reason_3.onReset()
    absence_compensated_1.onReset()
    absence_compensated_2.onReset()
    absence_compensated_3.onReset()
    absence_time_period_1.onReset()
    absence_time_period_2.onReset()
    absence_time_period_3.onReset()
    extra.onReset()
  }

  const deleteEmployee = (index) => {
    const newEmployees = [...employees]
    newEmployees.splice(index, 1)
    setEmployees(newEmployees)
  }

  return (
    <>
      <SalaryFormContentNew
        client={client}
        employee_name={employee_name}
        month={month}
        total_hours_weekdays={total_hours_weekdays}
        total_hours_sundays={total_hours_sundays}
        wage_hourly={wage_hourly}
        wage_monthly={wage_monthly}
        wage_total_gross={wage_total_gross}
        flat_benefit={flat_benefit}
        car_benefit={car_benefit}
        phone_benefit={phone_benefit}
        lunch_benefit={lunch_benefit}
        sport_benefit={sport_benefit}
        mileage_allowance={mileage_allowance}
        daily_allowance_domestic={daily_allowance_domestic}
        daily_allowance_domestic_part_time={daily_allowance_domestic_part_time}
        daily_allowance_foreign={daily_allowance_foreign}
        absence_reason_1={absence_reason_1}
        absence_compensated_1={absence_compensated_1}
        absence_time_period_1={absence_time_period_1}
        absence_reason_2={absence_reason_2}
        absence_compensated_2={absence_compensated_2}
        absence_time_period_2={absence_time_period_2}
        absence_reason_3={absence_reason_3}
        absence_compensated_3={absence_compensated_3}
        absence_time_period_3={absence_time_period_3}
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
