import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useReducer } from 'react'
import Notification from './Notification'
import { updateClient, deleteClient } from '../reducers/clientsReducer'
import { format } from 'date-fns'
import { Table, Form, Button } from 'react-bootstrap'

const ClientDataChange = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  /*
  const initialState = {
    company: client.company,
    email: client.email,
    phonenumber: client.phonenumber,
    bi_code: client.bi_code,
    deadline: format(new Date(client.deadline), 'yyyy-MM-dd'),
    payperiod: client.payperiod,
  }

  function formReducer(state, action) {
    switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return action.newState
    default:
      return state
    }
  }

  const [formState, dispatchForm] = useReducer(formReducer, initialState)*/

  const updateData = (event) => {
    event.preventDefault()
    /*dispatch(updateClient({
      company_id: client.id,
      user_id: client.user_id,
      ...formState,
    }))
    navigate('/')*/
  }

  const handleInputChange = (event) => {
    null
    /*dispatchForm({
      type: 'UPDATE_FIELD',
      field: event.target.name,
      value: event.target.value,
    })*/
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
      <h3>{client.company}:n tietojen muuttaminen</h3>
      <Notification />
      <Form onSubmit={updateData}>
        <Form.Group>
          <Form.Label>Yritys</Form.Label>
          <Form.Control name="company" value={client.company} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sähköposti</Form.Label>
          <Form.Control name="email" value={client.email} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Puhelinnumero</Form.Label>
          <Form.Control name="phonenumber" value={client.phonenumber} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Y-tunnus</Form.Label>
          <Form.Control name="bi_code" value={client.bi_code} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Eräpäivä</Form.Label>
          <Form.Control name="deadline" value={client.deadline} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Palkkakausi</Form.Label>
          <Form.Control name="payperiod" value={client.payperiod} onChange={handleInputChange} />
        </Form.Group>
        <Button variant="primary" onClick={remove}>Tallenna tiedot</Button>
      </Form>
    </div>
  )
}

export default ClientDataChange
