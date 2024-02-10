import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks/index'
import { notify } from '../reducers/notificationReducer'
import { addClient } from '../reducers/clientsReducer'
import Notification from './Notification'
import { Table, Form, Button } from 'react-bootstrap'

const ClientForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const company = useField()
  const email = useField()
  const phonenumber = useField()
  const bicode = useField()
  const deadline = useField()
  const payperiod = useField()

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(addClient({
      user_id: user.id,
      company: company.value,
      email: email.value,
      phonenumber: phonenumber.value,
      bi_code: bicode.value,
      deadline: deadline.value,
      payperiod: payperiod.value
    })).then(result => {
      if (result) {
        resetFields(event)
      }
    })
  }

  const resetFields = (event) => {
    event.preventDefault()
    company.onReset()
    email.onReset()
    phonenumber.onReset()
    bicode.onReset()
    deadline.onReset()
    payperiod.onReset()
  }

  return (
    <div>
      <br /><h2>Lisää asiakas</h2>
      <Notification />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Yritys:</Form.Label>
          <Form.Control {...company} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sähköposti:</Form.Label>
          <Form.Control {...email} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Puhelinnumero:</Form.Label>
          <Form.Control placeholder="+358 451234567" {...phonenumber} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Y-tunnus:</Form.Label>
          <Form.Control placeholder="1234567-8" {...bicode} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Eräpäivä:</Form.Label>
          <Form.Control placeholder="yyyy-mm-dd" {...deadline} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Palkkakausi:</Form.Label>
          <Form.Control {...payperiod} required />
        </Form.Group>
        <Button variant="primary" type="submit">Lisää</Button>
      </Form>
    </div>
  )
}

export default ClientForm
