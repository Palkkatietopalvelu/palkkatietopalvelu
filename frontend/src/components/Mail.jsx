import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import mailService from '../services/mail'
import Notification from './Notification'
import { format } from 'date-fns'
import { notify } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'
import CheckBox from './CheckBox'

const ClientReminder = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [clients, setClients] = useState([])
  const [inputs, setInputs] = useState([])

  useEffect(() => {
    if (user) {
    mailService.get().then(clients => {
      setClients(clients)
    })
  }}, [])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

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
                <tr key={client.deadline}>
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
