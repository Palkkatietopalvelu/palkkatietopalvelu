import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useReducer, useEffect, useState } from 'react'
//import { useField } from '../hooks/index'
//import { notify } from '../reducers/notificationReducer'
//import { addClient } from '../reducers/clientsReducer'
import Notification from './Notification'
import { updateClient } from '../reducers/clientsReducer'
import { format } from 'date-fns'

const ClientDataChange = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

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

  const [formState, dispatchForm] = useReducer(formReducer, initialState)

  const updateData = (event) => {
    event.preventDefault()
    dispatch(updateClient({
      company_id: client.id,
      user_id: client.user_id,
      ...formState,
    }))
  }

  const handleInputChange = (event) => {
    dispatchForm({
      type: 'UPDATE_FIELD',
      field: event.target.name,
      value: event.target.value,
    })
  }

  return (
    <div>
      <hr />
      <h3>{client.company}:n tietojen muuttaminen</h3>
      <Notification />
      <form onSubmit={updateData}>
        <label>Yritys: <input name="company" value={formState.company} onChange={handleInputChange} /></label><br />
        <label>Sähköposti: <input name="email" value={formState.email} onChange={handleInputChange} /></label><br />
        <label>Puhelinnumero: <input name="phonenumber" value={formState.phonenumber} onChange={handleInputChange} /></label><br />
        <label>Y-tunnus: <input name="bi_code" value={formState.bi_code} onChange={handleInputChange} /></label><br />
        <label>Eräpäivä: <input name="deadline" value={formState.deadline} onChange={handleInputChange} /></label><br />
        <label>Palkkakausi: <input name="payperiod" value={formState.payperiod} onChange={handleInputChange} /></label><br />
        <div>
          <button type="submit">Tallenna tiedot</button>
        </div>
      </form>
      <hr />
    </div>
  )
}

export default ClientDataChange
