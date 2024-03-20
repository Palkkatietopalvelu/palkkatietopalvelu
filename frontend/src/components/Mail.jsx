// ./reminders (Manuaaliset muistutukset)
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import mailService from '../services/mail'
import smsService from '../services/sms'
import Notification from './Notification'
import { format } from 'date-fns'
import { notify } from '../reducers/notificationReducer'
import { Table, Form, Button } from 'react-bootstrap'
import CheckBox from './CheckBox'
import reminderInfoModule from './ReminderInfo'

const { defaultremindertext } = reminderInfoModule

const ClientReminder = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [clients, setClients] = useState([])
  const [emailinputs, setEmailinputs] = useState([])
  const [smsinputs, setSmsinputs] = useState([])
  const [remindertext, setRemindertext] = useState(defaultremindertext)
  const [isSending, setIsSending] = useState(false)

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
    setIsSending(true)
    if (emailinputs.length === 0 && smsinputs.length === 0) {
      dispatch(notify('Valitse vähintään yksi vastaanottaja', 'danger'))
      setIsSending(false)
      return
    }
    if (emailinputs.length > 0) {
      try {
        await mailService.send({ recipients: emailinputs, message: remindertext })
        dispatch(notify('Sähköpostimuistutukset lähetetty'))
      } catch (error) {
        console.error('An error occurred while sending emails:', error)
        const errorMessage = error.response?.data?.error || 'Sähköpostimuistutusten lähetys epäonnistui'
        dispatch(notify(errorMessage, 'danger'))
      }
    }
    if (smsinputs.length > 0) {
      try {
        await smsService.send({ recipients: smsinputs, message: remindertext })
        dispatch(notify('Tekstiviestimuistutukset lähetetty'))
      } catch (error) {
        console.error('An error occurred while sending SMS messages:', error)
        const errorMessage = error.response?.data?.error || 'Tekstiviestimuistutusten lähetys epäonnistui'
        dispatch(notify(errorMessage, 'danger'))
      }
    }
    setIsSending(false)
  }

  return (
    <div>
      {user.role === 1 && <div>
        <br /><h2>Valitse asiakkaat, joille muistutus lähetetään</h2>
        <Notification />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label style={{ marginTop: '20px' }}>Muistutusviestin teksti (Max. 160 merkkiä)</Form.Label>
            <Form.Control
              id='remindertext'
              as="textarea"
              rows={5}
              required
              value={remindertext}
              maxLength={160}
              onChange={(e) => setRemindertext(e.target.value.slice(0, 160))}
            />
            <span>{`${remindertext ? remindertext.length : 0}/160`}</span>
            <Table striped>
              <thead>
                <tr>
                  <th>Sähköpostimuistustus</th>
                  <th>Tekstiviestimuistustus</th>
                  <th>Yritys</th>
                  <th>Seuraava eräpäivä</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td><CheckBox name={client.id}
                      inputs={emailinputs}
                      setInputs={setEmailinputs}
                    /></td>
                    <td><CheckBox name={client.id}
                      inputs={smsinputs}
                      setInputs={setSmsinputs}
                    /></td>
                    <td>{client.company}</td>
                    <td>{format(new Date(client.deadline), 'dd.MM.yyyy')}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button type="submit" disabled={isSending}>{isSending ? 'Lähetetään...' : 'Lähetä'}</Button>
          </Form.Group>
        </Form>
      </div>}
    </div>
  )
}

export default ClientReminder
