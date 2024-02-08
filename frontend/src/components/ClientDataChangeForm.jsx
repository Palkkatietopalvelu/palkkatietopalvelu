import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
//import { useField } from '../hooks/index'
import { useState } from 'react'
//import { notify } from '../reducers/notificationReducer'
//import { addClient } from '../reducers/clientsReducer'
import Notification from './Notification'
import { updateClient } from '../reducers/clientsReducer'

const ClientDataChange = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)
  console.log("client under handling: ", client)
  console.log("client owner user id : ", client.user_id)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const updateData = (event) => {  // async?
    event.preventDefault()
    console.log("updateData event  : ", event)
    console.log("updateData newName: ", newName)
    dispatch(updateClient({
      company_id: client.id,
      user_id: client.user_id,
      company: newName,  // first attempting only name change
      email: client.email,
      phonenumber: client.phonenumber,
      bi_code: client.bi_code,
      deadline: client.deadline,
      payperiod: client.payperiod,
    }))/*.then(result => {
      if (result) {
        setTimeout(() => {
          navigate(`/client/${id}`)
        }, 3000)
      }
    })*/
  }
  const [newName, setNewName] = useState(client.company)
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <hr />
      <h3>{client.company}:n tietojen muuttaminen</h3>
      <Notification />
      <form onSubmit={updateData}>
        <label>Yritys: <input value={newName} onChange={handleNameChange} /></label><br />
        <label>Sähköposti: </label><br />
        <label>Puhelinnumero: </label><br />
        <label>Y-tunnus: </label><br />
        <label>Eräpäivä: </label><br />
        <label>Palkkakausi: </label><br />
        <div>
          <button type="submit">Tallenna tiedot</button>
        </div>
      </form>
      <hr />
    </div>
  )
}

export default ClientDataChange
