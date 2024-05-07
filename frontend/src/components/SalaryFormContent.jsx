// ./client/{client.id}/salaryform (Palkkatietolomake, vain asiakkaille, lomakeosa)
import React from 'react'
import { useState } from 'react'
import { Container, Form, Button, Accordion, Card } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
//import DatePicker from 'react-multi-date-picker'
import Notification from './Notification'
import days from './ReminderInfo'
//import './Styles.css'

const { weekDays, months } = days
const weekDaysSorted = weekDays.slice(6).concat(weekDays.slice(0, 6))

const SalaryFormContent = ({
  client,
  employee_name,
  month,
  total_hours_weekdays,
  setTotalHoursWeekdays,
  total_hours_sundays,
  setTotalHoursSundays,
  wage_hourly,
  setWageHourly,
  wage_monthly,
  setWageMonthly,
  wage_total_gross,
  benefits_total,
  reductions_total,
  flat_benefit,
  setFlatBenefit,
  car_benefit,
  setCarBenefit,
  phone_benefit,
  setPhoneBenefit,
  lunch_benefit,
  setLunchBenefit,
  lunch_benefit_value,
  setLunchBenefitValue,
  sport_benefit,
  setSportBenefit,
  sport_benefit_value,
  setSportBenefitValue,
  mileage_allowance,
  daily_allowance_domestic,
  daily_allowance_domestic_part_time,
  daily_allowance_foreign,
  absencesTable,
  visibleAbsenceRows,
  setVisibleAbsenceRows,
  extra,
  addEmployee,
  employees,
  deleteEmployee,
  handleSubmit,
  navigate
}) => {

  //const [visibleAbsenceRows, setVisibleAbsenceRows] = useState(3) // manual salary form

  const style = {
    width: '90vw',
    padding: '0rem',
    color: '#495057',
    border: 0,
    boxShadow: 'none'
  }

  const tableStyle = { margin: '15px', width: '67vw' }
  const buttonStyle = { margin: '10px 5px 20px' }
  const buttonStyle2 = { margin: '60px 5px 0px' }

  // creating absences table items in the manual salary form (3 items per row)
  const addAbsenceTableRow = (i) => {
    let reason = 'absence_reason_' + i
    let compensated = 'absence_compensated_' + i
    let period = 'absence_time_period_' + i

    return (
      <tr>
        <td><Form.Control id={reason} {...absencesTable[i-1][0]} /></td>
        <td><Form.Control id={compensated} {...absencesTable[i-1][1]} /></td>
        <td><Form.Control id={period} {...absencesTable[i-1][2]} /></td>
      </tr>
    )
  }

  const handleAddEmployee = () => {
    addEmployee()
    setVisibleAbsenceRows(setVisibleAbsenceRows)
  }

  return (<div><br />
    <h3>Palkkatietolomake</h3> <br />
    <Form onSubmit={handleSubmit}>
      <div><Notification /></div>
      {client ? <h5>{client.company}</h5> : null} <br />
      <div>
        <h5>PALKKATIEDOT</h5>
        <Container>
        <Table style={{margin: '15px'}}>
          <tbody>
            <tr>
              <td>Palkansaaja <Form.Control id='employee name' {...employee_name} /></td>
              <td>Palkkajakso <Form.Control id='month' {...month} /></td>
            </tr>
          </tbody>
        </Table>
        </Container>
        <Container>
          <div className='table-responsive'>
        <Table style={tableStyle}>
          <tbody>
            <tr>
              <th>Palkat</th>
            </tr>
            <tr>
              <td>Tuntimäärä (arkipäivät)
                <Form.Control
                  id='total_hours_weekdays'
                  value={total_hours_weekdays}
                  onChange={(e) => setTotalHoursWeekdays(e.target.value)}
                />
              </td>
              <td>Sunnuntaitunnit
                <Form.Control
                  id='total_hours_sundays'
                  value={total_hours_sundays}
                  onChange={(e) => setTotalHoursSundays(e.target.value)}
                />
              </td>
              <td>Tuntipalkka
                <Form.Control
                  id='wage_hourly'
                  value={wage_hourly}
                  onChange={(e) => setWageHourly(e.target.value)}
                />
              </td>
              <td>Kk-palkat
                <Form.Control
                  id='wage_monthly'
                  value={wage_monthly}
                  onChange={(e) => setWageMonthly(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Luontoisedut</th>
            </tr>
            <tr>
              <td>Asuntoetu
                <Form.Control
                  id='flat_benefit'
                  value={flat_benefit}
                  onChange={(e) => setFlatBenefit(e.target.value)}
                />
              </td>
              <td>Autoetu
                <Form.Control
                  id='car_benefit'
                  value={car_benefit}
                  onChange={(e) => setCarBenefit(e.target.value)}
                />
              </td>
              <td>Puhelinetu
                <Form.Control
                  id='phone_benefit'
                  value={phone_benefit}
                  onChange={(e) => setPhoneBenefit(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Vähennykset</th>
            </tr>
            <tr>
              <td>Lounarimäärä
                <Form.Control
                  id='lunch_benefit'
                  value={lunch_benefit}
                  onChange={(e) => setLunchBenefit(e.target.value)}
                />
              </td>
              <td>Lounarihinta
                <Form.Control
                  id='lunch_benefit_value'
                  value={lunch_benefit_value}
                  onChange={(e) => setLunchBenefitValue(e.target.value)}
                />
              </td>
              <td>Liikuntasetelit
                <Form.Control
                  id='sport_benefit'
                  value={sport_benefit}
                  onChange={(e) => setSportBenefit(e.target.value)}
                />
              </td>
              <td>Liikuntasetelin arvo
                <Form.Control
                  id='sport_benefit_value'
                  value={sport_benefit_value}
                  onChange={(e) => setSportBenefitValue(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Tarkistus</th>
            </tr>
            <tr>
              <td>
                <div>Bruttopalkka yhteensä</div>
                <div>
                  <p><b>{wage_total_gross} €</b></p>
                </div>
              </td>
              <td>
                <div>Luontoisedut</div>
                <div>
                  <p><b>{benefits_total} €</b></p>
                </div>
              </td>
              <td>
                <div>Vähennykset</div>
                <div>
                  <p><b>- {reductions_total} €</b></p>
                </div>
              </td>
            </tr>
            <tr>
              <th>Korvaukset ja päivärahat</th>
            </tr>
            <tr>
              <td>Km-korvaus <Form.Control id='mileage_allowance' {...mileage_allowance} /></td>
              <td>Kotimaan päiväraha <Form.Control id='daily_allowance_domestic' {...daily_allowance_domestic} /></td>
              <td>Kotimaan osapäivä <Form.Control id='daily_allowance_domestic_part_time' {...daily_allowance_domestic_part_time} /></td>
              <td style={{ marginTop: '-25px' }}>
                Ulkomaan päivärahat (maa ja päivien määrä) <Form.Control id='daily_allowance_foreign' {...daily_allowance_foreign} />
              </td>
            </tr>
          </tbody>
        </Table></div></Container><br/>
        <h5>POISSAOLOT</h5>
        <Table style={{margin: '15px'}}>
          <thead>
            <tr>
              <th>Syy</th>
              <th>Palkallinen</th>
              <th>Ajalta</th>
            </tr>
          </thead>
          <tbody>
            {visibleAbsenceRows >= 1 ? addAbsenceTableRow(1) : null}
            {visibleAbsenceRows >= 2 ? addAbsenceTableRow(2) : null}
            {visibleAbsenceRows >= 3 ? addAbsenceTableRow(3) : null}
            {visibleAbsenceRows >= 4 ? addAbsenceTableRow(4) : null}
            {visibleAbsenceRows >= 5 ? addAbsenceTableRow(5) : null}
            {visibleAbsenceRows >= 6 ? addAbsenceTableRow(6) : null}
            {visibleAbsenceRows >= 7 ? addAbsenceTableRow(7) : null}
            {visibleAbsenceRows >= 8 ? addAbsenceTableRow(8) : null}
            {visibleAbsenceRows >= 9 ? addAbsenceTableRow(9) : null}
            {visibleAbsenceRows === 10 ? addAbsenceTableRow(10) : null}
          </tbody>
        </Table>
        {visibleAbsenceRows < 10
          ? <Button className='absence-btn' onClick={() =>
            setVisibleAbsenceRows(visibleAbsenceRows + 1)}>Lisää uusi poissaolorivi</Button>
          : null
        }
      </div> <br />
      <div>
        <Form.Group>
          <Form.Label><h5>LISÄTIEDOT</h5></Form.Label>
          <Form.Control as="textarea" rows={5} id='extra' {...extra} />
        </Form.Group>
      </div>
      <br></br>
      <Button id={'lisää'} variant="info" style={buttonStyle} onClick={handleAddEmployee}>
        Lisää työntekijän tiedot lomakkeelle
      </Button>
      {employees.length > 0 && (
        <div className="accordion-header">
          <h5>Lomakkeelle lisätyt tiedot</h5>
        </div>
      )}     <Accordion defaultActiveKey="">
        {employees.map((employee, index) => (
          <Card key={index}>
            <Accordion.Item eventKey={String(index)}>
              <Accordion.Header>
                {employee.employee_name}
              </Accordion.Header>
              <Accordion.Body>
                <p><b>Työntekijän nimi: {employee.employee_name}</b></p>
                {employee.month && <p>Palkkakausi: {employee.month}</p>}
                {employee.total_hours_weekdays && <p>Tuntimäärä: {employee.total_hours_weekdays}</p>}
                {employee.total_hours_sundays && <p>Sunnuntaitunnit: {employee.total_hours_sundays}</p>}
                {employee.wage_hourly && <p>Tuntipalkka: {employee.wage_hourly}</p>}
                {employee.wage_monthly && <p>Kk-palkat: {employee.wage_monthly}</p>}
                {employee.flat_benefit && <p>Asuntoetu: {employee.flat_benefit}</p>}
                {employee.car_benefit && <p>Autoetu: {employee.car_benefit}</p>}
                {employee.phone_benefit && <p>Puhelinetu: {employee.phone_benefit}</p>}
                {employee.lunch_benefit && <p>Lounarimäärä: {employee.lunch_benefit}</p>}
                {employee.lunch_benefit_value && <p>Lounarihinta: {employee.lunch_benefit_value}</p>}
                {employee.sport_benefit && <p>Liikuntasetelit: {employee.sport_benefit}</p>}
                {employee.sport_benefit_value && <p>Liikuntasetelin arvo: {employee.sport_benefit_value}</p>}
                {<br></br>}
                {<p>Bruttopalkka yhteensä: {employee.wage_total_gross} €</p>}
                {<p>Luontoisedut: {employee.benefits_total} €</p>}
                {<p>Vähennykset: - {employee.reductions_total} €</p>}
                {<br></br>}
                {employee.mileage_allowance && <p>Km-korvaukset: {employee.mileage_allowance}</p>}
                {employee.daily_allowance_domestic && <p>Kotimaan päiväraha: {employee.daily_allowance_domestic}</p>}
                {employee.daily_allowance_domestic_part_time && <p>Kotimaan osapäivä: {employee.daily_allowance_domestic_part_time}</p>}
                {employee.daily_allowance_foreign && <p>Ulkomaan päiväraha: {employee.daily_allowance_foreign}</p>}
                {<br></br>}
                {<p>Poissaolot:</p>}
                {employee.absence_reason_1 && <p>Syy: {employee.absence_reason_1}</p>}
                {employee.absence_compensated_1 && <p>Palkallinen: {employee.absence_compensated_1}</p>}
                {employee.absence_time_period_1 && <p>Ajalta: {employee.absence_time_period_1}</p>}
                {employee.absence_reason_2 && <p>Syy: {employee.absence_reason_2}</p>}
                {employee.absence_compensated_2 && <p>Palkallinen: {employee.absence_compensated_2}</p>}
                {employee.absence_time_period_2 && <p>Ajalta: {employee.absence_time_period_2}</p>}
                {employee.absence_reason_3 && <p>Syy: {employee.absence_reason_3}</p>}
                {employee.absence_compensated_3 && <p>Palkallinen: {employee.absence_compensated_3}</p>}
                {employee.absence_time_period_3 && <p>Ajalta: {employee.absence_time_period_3}</p>}
                {employee.absence_reason_4 && <p>Syy: {employee.absence_reason_4}</p>}
                {employee.absence_compensated_4 && <p>Palkallinen: {employee.absence_compensated_4}</p>}
                {employee.absence_time_period_4 && <p>Ajalta: {employee.absence_time_period_4}</p>}
                {employee.absence_reason_5 && <p>Syy: {employee.absence_reason_5}</p>}
                {employee.absence_compensated_5 && <p>Palkallinen: {employee.absence_compensated_5}</p>}
                {employee.absence_time_period_5 && <p>Ajalta: {employee.absence_time_period_5}</p>}
                {employee.absence_reason_6 && <p>Syy: {employee.absence_reason_6}</p>}
                {employee.absence_compensated_6 && <p>Palkallinen: {employee.absence_compensated_6}</p>}
                {employee.absence_time_period_6 && <p>Ajalta: {employee.absence_time_period_6}</p>}
                {employee.absence_reason_7 && <p>Syy: {employee.absence_reason_7}</p>}
                {employee.absence_compensated_7 && <p>Palkallinen: {employee.absence_compensated_7}</p>}
                {employee.absence_time_period_7 && <p>Ajalta: {employee.absence_time_period_7}</p>}
                {employee.absence_reason_8 && <p>Syy: {employee.absence_reason_8}</p>}
                {employee.absence_compensated_8 && <p>Palkallinen: {employee.absence_compensated_8}</p>}
                {employee.absence_time_period_8 && <p>Ajalta: {employee.absence_time_period_8}</p>}
                {employee.absence_reason_9 && <p>Syy: {employee.absence_reason_9}</p>}
                {employee.absence_compensated_9 && <p>Palkallinen: {employee.absence_compensated_9}</p>}
                {employee.absence_time_period_9 && <p>Ajalta: {employee.absence_time_period_9}</p>}
                {employee.absence_reason_10 && <p>Syy: {employee.absence_reason_10}</p>}
                {employee.absence_compensated_10 && <p>Palkallinen: {employee.absence_compensated_10}</p>}
                {employee.absence_time_period_10 && <p>Ajalta: {employee.absence_time_period_10}</p>}
                {employee.extra && <p>Lisätiedot: {employee.extra}</p>}
                <Button variant="danger" onClick={() => deleteEmployee(index)}>Poista Työntekijä</Button>
              </Accordion.Body>
            </Accordion.Item>
          </Card>
        ))}
      </Accordion>
      <Button variant="danger" style={buttonStyle2} onClick={() => navigate(-1)}>
        Takaisin
      </Button>
      <Button id={'tallenna'} type="submit" style={buttonStyle2} variant="primary" disabled={employees.length === 0}>
        Tallenna lomake
      </Button>
    </Form> <br />
  </div>
  )
}

export default SalaryFormContent