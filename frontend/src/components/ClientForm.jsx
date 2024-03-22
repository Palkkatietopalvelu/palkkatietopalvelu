// ./client (Lisää asiakas)
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/index'
import { addClient } from '../reducers/clientsReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'
import { DateSelect } from '../hooks/DatePicker'
import DatePicker from 'react-multi-date-picker'
import { useState } from 'react'
import days from './ReminderInfo'

const { weekDays, months } = days
const weekDaysSorted = weekDays.slice(6).concat(weekDays.slice(0, 6))

const ClientForm = () => {
  const dispatch = useDispatch()
  const [addButtonText, setAddButtonText] = useState('Lisää')

  const user = useSelector(({ user }) => user)
  const company = useField()
  const email = useField()
  const phonenumber = useField()
  const bicode = useField()
  const deadlines = DateSelect()
  const payperiod = useField()

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setAddButtonText('Lisätään...')
    dispatch(addClient({
      user_id: user.id,
      company: company.value,
      email: email.value,
      phonenumber: phonenumber.value,
      bi_code: bicode.value,
      deadlines: JSON.stringify(deadlines.value),
      payperiod: payperiod.value
    })).then(result => {
      if (result) {
        resetFields(event)
        setAddButtonText('Lisää')
      }
    })
  }

  const resetFields = (event) => {
    event.preventDefault()
    company.onReset()
    email.onReset()
    phonenumber.onReset()
    bicode.onReset()
    deadlines.onReset()
    payperiod.onReset()
  }

  const style = {
    width: '90vw',
    padding: '0rem',
    color: '#495057',
    border: 0,
    boxShadow: 'none'
  }

  return (
    <div>
      {user.role === 1 && <div>
        <br /><h2>Lisää asiakas</h2>
        <Notification />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Yritys:</Form.Label>
            <Form.Control id='company' {...company} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sähköposti:</Form.Label>
            <Form.Control id='email' {...email} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Puhelinnumero:</Form.Label>
            <Form.Control id='phonenumber' placeholder="0451234567" {...phonenumber} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Y-tunnus:</Form.Label>
            <Form.Control id='bicode' placeholder="1234567-8" {...bicode} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Eräpäivät:</Form.Label>
            <div className="form-control">
              <DatePicker id="deadlines" {...deadlines} style={style} multiple months={months} weekDays={weekDaysSorted} weekStartDayIndex={1}/>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Palkkakausi:</Form.Label>
            <Form.Control id='payperiod' {...payperiod} required />
          </Form.Group><br />
          <Button id='lisää' variant="primary" type="submit">{addButtonText}</Button> <br /><br />
        </Form>
      </div>}
    </div>
  )
}

export default ClientForm
