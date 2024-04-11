// ./client/{client.id}/salaryform (Palkkatietolomake, vain asiakkaille)
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useField } from '../hooks'
import SalaryFormContent from './SalaryFormContent'
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
  const [total_hours_weekdays, setTotalHoursWeekdays] = useState('')
  const [total_hours_sundays, setTotalHoursSundays] = useState('')
  const [wage_hourly, setWageHourly] = useState('')
  const [wage_monthly, setWageMonthly] = useState('')
  const [flat_benefit, setFlatBenefit] = useState('')
  const [car_benefit, setCarBenefit] = useState('')
  const [phone_benefit, setPhoneBenefit] = useState('')
  const [lunch_benefit, setLunchBenefit] = useState('')
  const [lunch_benefit_value, setLunchBenefitValue] = useState('')
  const [sport_benefit, setSportBenefit] = useState('')
  const [sport_benefit_value, setSportBenefitValue] = useState('')
  const [wage_total_gross, setWageTotalGross] = useState('')
  const [benefits_total, setBenefitsTotal] = useState('')
  const [reductions_total, setReductionsTotal] = useState('')
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

  const calculateWageTotalGross = useCallback(() => {
    const toNumber = (value) => {
      const number = Number(value.replace(',', '.'))
      return isNaN(number) ? null : number
    }
    const total = (toNumber(total_hours_weekdays) * toNumber(wage_hourly)) +
                  (2 * toNumber(total_hours_sundays) * toNumber(wage_hourly)) +
                  toNumber(wage_monthly) +
                  toNumber(flat_benefit) +
                  toNumber(car_benefit) +
                  toNumber(phone_benefit)
    setWageTotalGross(total.toFixed(2))
  }, [
    total_hours_weekdays,
    total_hours_sundays,
    wage_hourly,
    wage_monthly,
    flat_benefit,
    car_benefit,
    phone_benefit,
  ])

  const calculateBenefitsTotal = useCallback(() => {
    const toNumber = (value) => {
      const number = Number(value.replace(',', '.'))
      return isNaN(number) ? null : number
    }
    const total = toNumber(flat_benefit) +
                  toNumber(car_benefit) +
                  toNumber(phone_benefit)
    setBenefitsTotal(total.toFixed(2))
  }, [
    flat_benefit,
    car_benefit,
    phone_benefit,
  ])

  const calculateReductionsTotal = useCallback(() => {
    const toNumber = (value) => {
      const number = Number(value.replace(',', '.'))
      return isNaN(number) ? null : number
    }
    const total = (toNumber(lunch_benefit) * toNumber(lunch_benefit_value)) +
                  (toNumber(sport_benefit) * toNumber(sport_benefit_value))
    setReductionsTotal(total.toFixed(2))
  }, [
    lunch_benefit,
    lunch_benefit_value,
    sport_benefit,
    sport_benefit_value,
  ])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else if (!client || client.id !== urlClientId) {
      console.error('Unauthorized access or client not found.')
      navigate('/')
    }
  }, [user, client, urlClientId, navigate])

  useEffect(() => {
    calculateWageTotalGross()
  }, [calculateWageTotalGross])

  useEffect(() => {
    calculateBenefitsTotal()
  }, [calculateBenefitsTotal])

  useEffect(() => {
    calculateReductionsTotal()
  }, [calculateReductionsTotal])

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
      const pdfBlob = await generatePDF(formData, { clientName, clientEmail, clientNumber, clientCode, clientPeriod }, currentDate)
      const csvBlob = await generateCSV(formData, { clientName, clientEmail, clientNumber, clientCode, clientPeriod }, currentDate)
      uploadGeneratedPDF(dispatch, pdfBlob, clientId, clientName)
      uploadGeneratedCSV(dispatch, csvBlob, clientId, clientName)
      navigate('/')
    } catch (error) {
      console.error('Error generating or uploading PDF:', error)
    }
  }

  const addEmployee = () => {
    if (!employee_name.value.trim() || !month.value.trim()) {
      alert('Työntekijän nimi ja palkkajakso ovat pakollisia tietoja.')
      return
    }
    let employeeData = {
      employee_name: employee_name.value,
      salary_type: formType === 'monthly' ? 'Kuukausipalkkalainen' : 'Tuntipalkkalainen',
    }
    if (month.value) employeeData.month = month.value
    if (total_hours_weekdays) employeeData.total_hours_weekdays = total_hours_weekdays
    if (total_hours_sundays) employeeData.total_hours_sundays = total_hours_sundays
    if (wage_hourly) employeeData.wage_hourly = wage_hourly
    if (wage_monthly) employeeData.wage_monthly = wage_monthly
    if (flat_benefit) employeeData.flat_benefit = flat_benefit
    if (car_benefit) employeeData.car_benefit = car_benefit
    if (phone_benefit) employeeData.phone_benefit = phone_benefit
    if (lunch_benefit) employeeData.lunch_benefit = lunch_benefit
    if (lunch_benefit_value) employeeData.lunch_benefit_value = lunch_benefit_value
    if (lunch_benefit && lunch_benefit_value) {
      const lunch_benefit_total = Number(lunch_benefit) * Number(lunch_benefit_value)
      employeeData.lunch_benefit_total = lunch_benefit_total
    }
    if (sport_benefit) employeeData.sport_benefit = sport_benefit
    if (sport_benefit_value) employeeData.sport_benefit_value = sport_benefit_value
    if (sport_benefit && sport_benefit_value) {
      const sport_benefit_total = Number(sport_benefit) * Number(sport_benefit_value)
      employeeData.sport_benefit_total = sport_benefit_total
    }
    if (wage_total_gross) employeeData.wage_total_gross = wage_total_gross
    if (benefits_total) employeeData.benefits_total = benefits_total
    if (reductions_total) employeeData.reductions_total = reductions_total
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
    setTotalHoursWeekdays('')
    setTotalHoursSundays('')
    setWageHourly('')
    setWageMonthly('')
    setFlatBenefit('')
    setCarBenefit('')
    setPhoneBenefit('')
    setLunchBenefit('')
    setLunchBenefitValue('')
    setSportBenefit('')
    setSportBenefitValue('')
    setWageTotalGross('')
    setBenefitsTotal('')
    setReductionsTotal('')
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
      <SalaryFormContent
        client={client}
        employee_name={employee_name}
        month={month}
        total_hours_weekdays={total_hours_weekdays}
        setTotalHoursWeekdays={setTotalHoursWeekdays}
        total_hours_sundays={total_hours_sundays}
        setTotalHoursSundays={setTotalHoursSundays}
        wage_hourly={wage_hourly}
        setWageHourly={setWageHourly}
        wage_monthly={wage_monthly}
        setWageMonthly={setWageMonthly}
        flat_benefit={flat_benefit}
        setFlatBenefit={setFlatBenefit}
        car_benefit={car_benefit}
        setCarBenefit={setCarBenefit}
        phone_benefit={phone_benefit}
        setPhoneBenefit={setPhoneBenefit}
        lunch_benefit={lunch_benefit}
        setLunchBenefit={setLunchBenefit}
        lunch_benefit_value={lunch_benefit_value}
        setLunchBenefitValue={setLunchBenefitValue}
        sport_benefit={sport_benefit}
        setSportBenefit={setSportBenefit}
        sport_benefit_value={sport_benefit_value}
        setSportBenefitValue={setSportBenefitValue}
        wage_total_gross={wage_total_gross}
        setWageTotalGross={setWageTotalGross}
        benefits_total={benefits_total}
        setBenefitsTotal={setBenefitsTotal}
        reductions_total={reductions_total}
        setReductionsTotal={setReductionsTotal}
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
