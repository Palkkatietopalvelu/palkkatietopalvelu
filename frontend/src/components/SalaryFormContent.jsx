// ./client/{client.id}/salaryform (Palkkatietolomake, vain asiakkaille, lomakeosa)
import React from 'react'
import { Form, Button, Accordion, Card } from 'react-bootstrap'
import DatePicker from 'react-multi-date-picker'
import Notification from './Notification'

const SalaryFormContent = ({
  formType,
  employee_name,
  absences,
  provisions,
  lunch_allowance,
  overtime,
  daily_allowance,
  mileage_allowance,
  total_hours,
  extra,
  addEmployee,
  employees,
  deleteEmployee,
  handleSubmit,
  setFormType,
  navigate
}) => {

  const style = {
    width: '90vw',
    padding: '0rem',
    color: '#495057',
    border: 0,
    boxShadow: 'none'
  }

  const radioStyle = { margin: '20px 0' }
  const buttonStyle = { margin: '10px 5px 20px' }
  const buttonStyle2 = { margin: '60px 5px 0px' }

  return (<div><br />
    <h3>Palkkatietolomake</h3>
    <Form onSubmit={handleSubmit}>
      <div style={radioStyle}>
        <Form.Check
          type="radio"
          label="Kuukausipalkkalainen"
          name="formType"
          id="monthly"
          onChange={() => setFormType('monthly')}
          checked={formType === 'monthly'}
        />
        <Form.Check
          type="radio"
          label="Tuntipalkkalainen"
          name="formType"
          id="hourly"
          onChange={() => setFormType('hourly')}
          checked={formType === 'hourly'}
        />
      </div>
      <div><Notification /></div>
      <div>
        <Form.Group>
          <Form.Label>Työntekijän nimi</Form.Label>
          <Form.Control id='employee name' {...employee_name} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Poissaolot (pidetyt lomat, sairaslomat, palkattomat vapaat)</Form.Label>
          <div className="form-control">
            <DatePicker id='absences' {...absences} style={style} multiple/>
          </div>
        </Form.Group>
        {formType === 'monthly' && (
          <>
            <Form.Group>
              <Form.Label>Provisiot</Form.Label>
              <Form.Control id='provisions' {...provisions} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ylityöt</Form.Label>
              <Form.Control id='overtime' {...overtime} />
            </Form.Group>
          </>
        )}
        <Form.Group>
          <Form.Label>Lounasetu (kappalemäärä ja kokonaisarvo)</Form.Label>
          <Form.Control id='lunch_allowance' {...lunch_allowance} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Päivärahat</Form.Label>
          <Form.Control id='daily_allowance' {...daily_allowance} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Km-korvaukset</Form.Label>
          <Form.Control id='mileage_allowance' {...mileage_allowance} />
        </Form.Group>
        {formType === 'hourly' && (
          <Form.Group>
            <Form.Label>Kokonaistuntimäärä</Form.Label>
            <Form.Control id='total_hours' {...total_hours} />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Lisätiedot</Form.Label>
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
      )}
      <Accordion defaultActiveKey="">
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
                {employee.provisions && <p>Provisiot: {employee.provisions}</p>}
                {employee.formType === 'monthly' && employee.overtime && <p>Ylityöt: {employee.overtime}</p>}
                {employee.lunch_allowance && <p>Lounasetu: {employee.lunch_allowance}</p>}
                {employee.daily_allowance && <p>Päivärahat: {employee.daily_allowance}</p>}
                {employee.mileage_allowance && <p>Km-korvaukset: {employee.mileage_allowance}</p>}
                {employee.formType === 'hourly' && employee.total_hours && <p>Kokonaistuntimäärä: {employee.total_hours}</p>}
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
    </Form>
  </div>
  )
}

export default SalaryFormContent
