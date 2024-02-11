import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import mailService from '../services/mail'
import Notification from './Notification'
import { format } from 'date-fns'
import { notify } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'

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
      <br /><h2>Valitse asiakkaat, joille muistutus lähetetään</h2>
      <Notification />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Table striped>
            <thead>
              <tr>
                <th>Valitse</th>
                <th>Yritys</th>
                <th>Eräpäivä</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td><CheckBox name={client.id}
                    inputs={inputs}
                    setInputs={setInputs}
                  /></td>
                  <td>{client.company}</td>
                  <td>{format(client.deadline, 'dd.MM.yyyy')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button type="submit">Lähetä</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ClientReminder
