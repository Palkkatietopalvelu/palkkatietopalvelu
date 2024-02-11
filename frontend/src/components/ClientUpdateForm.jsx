import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useReducer } from 'react'
import Notification from './Notification'
import { updateClient, deleteClient } from '../reducers/clientsReducer'
import { format } from 'date-fns'
import { Table, Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'

const ClientDataChange = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)

  const company = useField(client ? client.company : '')
  const email = useField(client ? client.email : '')
  const phonenumber = useField(client ? client.phonenumber : '')
  const bicode = useField(client ? client.bi_code : '')
  const deadline = useField(client ? format(new Date(client.deadline), 'yyyy-MM-dd') : '')
  const payperiod = useField(client ? client.payperiod : '')

  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  const updateData = async (event) => {
    event.preventDefault()
    const clientObject = {
      id: id,
      user_id: user.id,
      company: company.value,
      email: email.value,
      phonenumber: phonenumber.value,
      bi_code: bicode.value,
      deadline: deadline.value,
      payperiod: payperiod.value,
    }
    const result = await dispatch(updateClient(clientObject))
    if (result) {
      navigate(`/client/${client.id}`)
    }
  }

  const remove = () => {
    if (window.confirm(`Haluatko varmasti poistaa asiakkaan ${client.company}?`)) {
      dispatch(deleteClient(client)).then(result => {
        if (result) {
          navigate('/')
        }
      })
    }
  }

  return (
    <div>
      <br /><h2>{client.company}:n tietojen muuttaminen</h2>
      <Notification />
      <Form onSubmit={updateData}>
        <Form.Group>
          <Form.Label>Yritys</Form.Label>
          <Form.Control {...company} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sähköposti</Form.Label>
          <Form.Control {...email} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Puhelinnumero</Form.Label>
          <Form.Control {...phonenumber} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Y-tunnus</Form.Label>
          <Form.Control {...bicode} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Eräpäivä</Form.Label>
          <Form.Control {...deadline} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Palkkakausi</Form.Label>
          <Form.Control {...payperiod} required style={{ marginBottom: '20px' }} />
        </Form.Group>
        <Button variant="primary" onClick={updateData} style={{ marginRight: '10px' }}>Tallenna tiedot</Button>
        <Button variant="primary" onClick={remove}>Poista asiakas</Button>
      </Form>
    </div>
  )
}

export default ClientDataChange
