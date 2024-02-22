import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'
import { DateSelect } from '../hooks/DatePicker'
import DatePicker from 'react-multi-date-picker'
import Notification from './Notification'

const SalaryForm = ({ clientId }) => {
  const [formType, setFormType] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
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

  const generatePDF = (formData) => {
    const doc = new jsPDF()
    // Add text to PDF based on formData
    doc.text('Some text here', 10, 10)
    // More text based on the form data
    // Save the PDF
    doc.save('salary-information.pdf')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      formType,
      // Collect other form inputs here
    }
    generatePDF(formData)
    navigate(`/client/${clientId}`)
  }

  const style = {
    width: '90vw',
    padding: '0rem',
    color: '#495057',
    border: 0,
    boxShadow: 'none'
  }

  const radioStyle = { margin: '20px 0' }
  const buttonStyle = { margin: '10px 5px 0px' }

  return (
    <Form onSubmit={handleSubmit}>
      <div style={radioStyle}>
        <Form.Check
          type="radio"
          label="Kuukausipalkkalainen"
          name="formType"
          id="monthly"
          onChange={() => setFormType('monthly')}
        />
        <Form.Check
          type="radio"
          label="Tuntipalkkalainen"
          name="formType"
          id="hourly"
          onChange={() => setFormType('hourly')}
        />
      </div>
      <div><Notification /></div>
      {formType === 'monthly' && (
        <div>
          <Form.Group>
            <Form.Label>Poissaolot (pidetyt lomat, sairaslomat, palkattomat vapaat)</Form.Label>
            <div className="form-control">
              <DatePicker id='absences' {...absences} required style={style} multiple/>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Provisiot</Form.Label>
            <Form.Control id='provisions' {...provisions} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lounasetu (kappalemäärä ja kokonaisarvo)</Form.Label>
            <Form.Control id='lunch_allowance' {...lunch_allowance} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ylityöt</Form.Label>
            <Form.Control id='overtime' {...overtime} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Päivärahat</Form.Label>
            <Form.Control id='daily_allowance' {...daily_allowance} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Km-korvaukset</Form.Label>
            <Form.Control id='mileage_allowance' {...mileage_allowance} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lisätiedot</Form.Label>
            <Form.Control as="textarea" rows={5} id='extra' {...extra} required />
          </Form.Group>
        </div>
      )}
      {formType === 'hourly' && (
        <div>
          <Form.Group>
            <Form.Label>Poissaolot (pidetyt lomat, sairaslomat, palkattomat vapaat)</Form.Label>
            <div className="form-control">
              <DatePicker id='absences' {...absences} required style={style} multiple/>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Lounasetu (kappalemäärä ja kokonaisarvo)</Form.Label>
            <Form.Control id='lunch_allowance' {...lunch_allowance} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Päivärahat</Form.Label>
            <Form.Control id='daily_allowance' {...daily_allowance} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Km-korvaukset</Form.Label>
            <Form.Control id='mileage_allowance' {...mileage_allowance} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kokonaistuntimäärä</Form.Label>
            <Form.Control id='total_hours' {...total_hours} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lisätiedot</Form.Label>
            <Form.Control as="textarea" rows={5} id='extra' {...extra} required />
          </Form.Group>
        </div>
      )}
      <Button variant="secondary" style={buttonStyle} onClick={() => navigate(-1)}>Takaisin</Button>
      <Button type="submit" style={buttonStyle} variant="primary">Tallenna tiedot</Button>
    </Form>
  )
}

export default SalaryForm
