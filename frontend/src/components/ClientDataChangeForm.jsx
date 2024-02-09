import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useReducer } from 'react'
import Notification from './Notification'
import { updateClient, deleteClient } from '../reducers/clientsReducer'
import { format } from 'date-fns'

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
      <hr />
      <h3>{client.company}:n tietojen muuttaminen</h3>
      <Notification />
      <form onSubmit={updateData}>
        <label>Yritys: <input name="company" value={client.company} onChange={handleInputChange} /></label><br />
        <label>Sähköposti: <input name="email" value={client.email} onChange={handleInputChange} /></label><br />
        <label>Puhelinnumero: <input name="phonenumber" value={client.phonenumber} onChange={handleInputChange} /></label><br />
        <label>Y-tunnus: <input name="bi_code" value={client.bi_code} onChange={handleInputChange} /></label><br />
        <label>Eräpäivä: <input name="deadline" value={client.deadline} onChange={handleInputChange} /></label><br />
        <label>Palkkakausi: <input name="payperiod" value={client.payperiod} onChange={handleInputChange} /></label><br />
        <div>
          <button type="submit">Tallenna tiedot</button>
        </div>
      </form><br />
      <button onClick={remove}>Poista asiakas tietokannasta</button>
      <hr />
    </div>
  )
}

export default ClientDataChange
