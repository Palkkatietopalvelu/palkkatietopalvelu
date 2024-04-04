// ./client/{client.id}/salaryform (Palkkatietolomake, vain asiakkaille, lomakeosa)
import React from 'react'
import { Form, Button, Accordion, Card } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
//import DatePicker from 'react-multi-date-picker'
import Notification from './Notification'

const SalaryFormContent = ({
  client,
  employee_name,
  month,
  total_hours_weekdays,
  total_hours_sundays,
  wage_hourly,
  wage_monthly,
  wage_total_gross,
  flat_benefit,
  car_benefit,
  phone_benefit,
  lunch_benefit,
  sport_benefit,
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

  const style = {
    width: '90vw',
    padding: '0rem',
    color: '#495057',
    border: 0,
    boxShadow: 'none'
  }

  const tableStyle = { margin: '15px'}
  const buttonStyle = { margin: '10px 5px 20px' }
  const buttonStyle2 = { margin: '60px 5px 0px' }

  return (<div><br />
    <h3>Palkkatietolomake</h3> <br />
    <Form onSubmit={handleSubmit}>
      <div><Notification /></div>
      {client ? <p><h5>{client.company}</h5></p> : null} <br />
      <div>
        <h5>PALKKATIEDOT</h5>
        <Table style={tableStyle}>
          <tbody>
            <tr>
              <td>Palkansaaja <Form.Control id='employee name' {...employee_name} /></td>
              <td>Kuukausi <Form.Control id='month' {...month} /></td>
            </tr>
          </tbody>
        </Table>
        <Table style={tableStyle}>
          <tbody>
          <thead><h6><b>Palkat</b></h6></thead>
            <tr>
              <td>Tuntimäärä <Form.Control id='total_hours_weekdays' {...total_hours_weekdays} /></td>
              <td>Sunnuntaitunnit <Form.Control id='total_hours_sundays' {...total_hours_sundays} /></td>
              <td>Tuntipalkka <Form.Control id='wage_hourly' {...wage_hourly} /></td>
              <td>Kk-palkat <Form.Control id='wage_monthly' {...wage_monthly} /></td>
              <td>Bruttopalkka yhteensä <Form.Control id='wage_total_gross' {...wage_total_gross} /></td>
            </tr>
            <thead><h6><b>Luontoisedut</b></h6></thead>
            <tr padding='10rem'>
              <td>Asuntoetu <Form.Control id='flat_benefit' {...flat_benefit} /></td>
              <td>Autoetu <Form.Control id='car_benefit' {...car_benefit} /></td>
              <td>Puhelinetu <Form.Control id='phone_benefit' {...phone_benefit} /></td>
              <td>Lounarit <Form.Control id='lunch_benefit' {...lunch_benefit} /></td>
              <td>Liikuntasetelit <Form.Control id='sport_benefit' {...sport_benefit} /></td>
            </tr>
            <thead><h6><b>Korvaukset ja päivärahat</b></h6></thead>
            <tr>
              <td>Km-korvaus <Form.Control id='mileage_allowance' {...mileage_allowance} /></td>
              <td>Kotimaan päiväraha <Form.Control id='daily_allowance_domestic' {...daily_allowance_domestic} /></td>
              <td>Kotimaan osapäivä <Form.Control id='daily_allowance_domestic_part_time' {...daily_allowance_domestic_part_time} /></td>
              <td>Ulkomaan päivärahat <Form.Control id='daily_allowance_foreign' {...daily_allowance_foreign} /></td>
            </tr>
          </tbody>
        </Table><br/>
        <h5>POISSAOLOT</h5>
        <Table style={tableStyle}>
          <thead>
            <tr>
              <th>Palkansaaja</th>
              <th>Syy</th>
              <th>Palkallinen</th>
              <th>Ajalta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Form.Control id='employee name' {...employee_name} /></td>
              <td><Form.Control id='absence_reason_1' {...absence_reason_1} /></td>
              <td><Form.Control id='absence_compensated_1' {...absence_compensated_1} /></td>
              <td><Form.Control id='absence_time_period_1' {...absence_time_period_1} /></td>
            </tr>
            <tr>
              <td><Form.Control id='employee name' {...employee_name} /></td>
              <td><Form.Control id='absence_reason_2' {...absence_reason_2} /></td>
              <td><Form.Control id='absence_compensated_2' {...absence_compensated_2} /></td>
              <td><Form.Control id='absence_time_period_2' {...absence_time_period_2} /></td>
            </tr>
            <tr>
              <td><Form.Control id='employee name' {...employee_name} /></td>
              <td><Form.Control id='absence_reason_3' {...absence_reason_3} /></td>
              <td><Form.Control id='absence_compensated_3' {...absence_compensated_3} /></td>
              <td><Form.Control id='absence_time_period_3' {...absence_time_period_3} /></td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div>
        <br /><h5>Tarkistusrivit</h5>
          <p>Rahapalkka <br />
          Luontoisedut <br />
          Vähennykset
          </p><br />
      </div>
      <div>
        <Form.Group>
          <Form.Label><h5>Lisätiedot</h5></Form.Label>
          <Form.Control as="textarea" rows={5} id='extra' {...extra} />
        </Form.Group>
      </div>
      <Button variant="info" style={buttonStyle} onClick={addEmployee}>
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
                <p>Työntekijän nimi: {employee.employee_name}</p>
                <p>Palkkatyyppi: {employee.salary_type}</p>
                {employee.absences && employee.absences.length > 0 && (
                  <p>Poissaolot: {employee.absences.map((date, index) => (
                    <span key={index}>{date.toString()}, </span>
                  ))}</p>
                )}
                {employee.month && <p>Kuukausi: {employee.month}</p>}
                {employee.total_hours_weekdays && <p>Tuntimäärä: {employee.total_hours_weekdays}</p>}
                {employee.total_hours_sundays && <p>Sunnuntaitunnit: {employee.total_hours_sundays}</p>}
                {employee.wage_hourly && <p>Tuntipalkka: {employee.wage_hourly}</p>}
                {employee.wage_monthly && <p>Kk-palkat: {employee.wage_monthly}</p>}
                {employee.flat_benefit && <p>Asuntoetu: {employee.flat_benefit}</p>}
                {employee.car_benefit && <p>Autoetu: {employee.car_benefit}</p>}
                {employee.phone_benefit && <p>Puhelinetu: {employee.phone_benefit}</p>}
                {employee.lunch_benefit && <p>Lounarit: {employee.lunch_benefit}</p>}
                {employee.sport_benefit && <p>Liikuntasetelit: {employee.sport_benefit}</p>}
                {employee.mileage_allowance && <p>Km-korvaukset: {employee.mileage_allowance}</p>}
                {employee.daily_allowance_domestic && <p>Kotimaan päiväraha: {employee.daily_allowance_domestic}</p>}
                {employee.daily_allowance_domestic_part_time && <p>Kotimaan osapäivä: {employee.daily_allowance_domestic_part_time}</p>}
                {employee.daily_allowance_foreign && <p>Ulkomaan päiväraha: {employee.daily_allowance_foreign}</p>}
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
      <Button type="submit" style={buttonStyle2} variant="primary" disabled={employees.length === 0}>
        Tallenna lomake
      </Button>
    </Form> <br />
  </div>
  )
}

export default SalaryFormContent
