// ./client/{client.id}/salaryform (Palkkatietolomake, vain asiakkaille, lomakeosa)
import React from 'react'
import { Form, Button, Accordion, Card } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
//import DatePicker from 'react-multi-date-picker'
import Notification from './Notification'
import days from './ReminderInfo'

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
  absence_reason_1, absence_reason_2, absence_reason_3,
  absence_compensated_1, absence_compensated_2, absence_compensated_3,
  absence_time_period_1, absence_time_period_2, absence_time_period_3,

  extra,
  addEmployee,
  employees,
  deleteEmployee,
  handleSubmit,
  navigate
}) => {

  const tableStyle = { margin: '15px' }
  const buttonStyle = { margin: '10px 5px 20px' }
  const buttonStyle2 = { margin: '60px 5px 0px' }

  return (
    <div><br />
      <h3>Palkkatietolomake</h3><hr/>
      <Form onSubmit={handleSubmit}>
        <Notification />
        {client ? <h5>{client.company}</h5> : null} <br />
        <div>
          <h5>PALKKATIEDOT</h5>
          <Table style={tableStyle}>
            <tbody>
              <tr>
                <td>Palkansaaja <Form.Control id='employee name' {...employee_name} /></td>
                <td>Palkkajakso <Form.Control id='month' {...month} /></td>
              </tr>
            </tbody>
          </Table>
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
          </Table><br/>
          <h5>POISSAOLOT</h5>
          <Table style={tableStyle}>
            <thead>
              <tr>
                <th>Syy</th>
                <th>Palkallinen</th>
                <th>Ajalta</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Form.Control id='absence_reason_1' {...absence_reason_1} /></td>
                <td><Form.Control id='absence_compensated_1' {...absence_compensated_1} /></td>
                <td><Form.Control id='absence_time_period_1' {...absence_time_period_1} /></td>
              </tr>
              <tr>
                <td><Form.Control id='absence_reason_2' {...absence_reason_2} /></td>
                <td><Form.Control id='absence_compensated_2' {...absence_compensated_2} /></td>
                <td><Form.Control id='absence_time_period_2' {...absence_time_period_2} /></td>
              </tr>
              <tr>
                <td><Form.Control id='absence_reason_3' {...absence_reason_3} /></td>
                <td><Form.Control id='absence_compensated_3' {...absence_compensated_3} /></td>
                <td><Form.Control id='absence_time_period_3' {...absence_time_period_3} /></td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          <Form.Group>
            <Form.Label><h5>Lisätiedot</h5></Form.Label>
            <Form.Control as="textarea" rows={5} id='extra' {...extra} />
          </Form.Group>
        </div>
        <br></br>
        <Button id={'lisää'} variant="info" style={buttonStyle} onClick={addEmployee}>
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
