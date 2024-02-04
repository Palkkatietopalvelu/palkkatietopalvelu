import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import mailService from '../services/mail'
import Notification from './Notification'
import { format } from 'date-fns'
import { notify } from '../reducers/notificationReducer'

const CheckBox = ({ name, inputs, setInputs }) => {

  const handleCheckChange = () => {
    if (inputs.includes(name)) {
      setInputs(inputs.filter((input) => input !== name))
    }
    else {
      setInputs(inputs.concat(name))
    }
  }

  return (
    <input
      type='checkbox'
      name={name}
      onChange={handleCheckChange}
    />
  )
}

const ClientReminder = () => {
  const dispatch = useDispatch()
  const [clients, setClients] = useState([])
  const [inputs, setInputs] = useState([])

  useEffect(() => {
    mailService.get().then(clients => {
      setClients(clients)
    })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    mailService.send(inputs)
    dispatch(notify('Muistutukset lähetetty'))
  }

  return (
    <div>
      <Notification />
      <p>Valitse asiakkaat, joille muistutus lähetetään</p>
      <form onSubmit={handleSubmit}>
        <div>
          {clients.map((client) => (
            <div key={client.id}>
              {client.company} {format(client.deadline, 'yyyy-MM-dd')}
              <CheckBox name={client.id}
                inputs={inputs}
                setInputs={setInputs}
              />
            </div>
          ))}
        </div>
        <button type="submit">Lähetä</button>
      </form>
    </div>
  )
}

export default ClientReminder