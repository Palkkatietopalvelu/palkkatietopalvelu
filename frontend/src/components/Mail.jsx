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
      mailService.get().then(fetchedClients => {
        const aggregatedClients = aggregateClients(fetchedClients)
        setClients(aggregatedClients)
      })
    }
  }, [user])

  const aggregateClients = (fetchedClients) => {
    const groupedByCompany = {}

    fetchedClients.forEach((client) => {
      const deadlineDate = new Date(client.deadline)
      if (!groupedByCompany[client.company] || deadlineDate < new Date(groupedByCompany[client.company].deadline)) {
        groupedByCompany[client.company] = {
          ...client,
          deadline: deadlineDate,
        }
      }
    })

    return Object.values(groupedByCompany).map(client => ({
      ...client,
      deadline: client.deadline.toISOString(),
    }))
  }

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
      {user.role === 1 && <div>
        <br /><h2>Valitse asiakkaat, joille muistutus lähetetään</h2>
        <Notification />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Table striped>
              <thead>
                <tr>
                  <th>Valitse</th>
                  <th>Yritys</th>
                  <th>Seuraava eräpäivä</th>
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
                    <td>{format(new Date(client.deadline), 'dd.MM.yyyy')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button type="submit">Lähetä</Button>
          </Form.Group>
        </Form>
      </div>}
    </div>
  )
}

export default ClientReminder
