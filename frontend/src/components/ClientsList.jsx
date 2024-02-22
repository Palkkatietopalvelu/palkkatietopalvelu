import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Notification from './Notification'
import { Table } from 'react-bootstrap'
import { format } from 'date-fns'

const ClientsList = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) =>
    clients)
  const filterBy = (c => c.user_id === user.id)
  const filterClients = (c => c.email === user.username)

  if (!user) {
    return
  }

  if(user.role === 2) {
    return (
      <div>
        <br /><h2>Tervetuloa palkkatietopalveluun!</h2>
        <br></br>
        <h3>Palautathan palkka-aineiston hyvissä ajoin</h3>
        <br></br>
        <Notification />
        <h4 style={{ marginBottom: '20px' }}>{user.username}</h4>
        <h5 style={{ marginTop: '20px' }}>Yhteystiedot</h5>
        <Table striped>
          {clients.filter(filterClients)
            .map(client => {
              return (
                <tbody key={client.email} >
                  <tr><td>Sähköposti</td><td>{client.email}</td></tr>
                  <tr><td>Puhelinnumero</td><td> {client.phonenumber}</td></tr>
                </tbody>
              )}
            )}
        </Table>
        <h4>Laskutustiedot</h4>
        <Table striped>
          {clients.filter(filterClients)
            .map(client => {
              return (
                <tbody key={client.email}>
                  <tr><td>Y-tunnus</td><td>{client.bi_code}</td></tr>
                  <tr><td>Eräpäivät</td><td>{client.deadlines.map(date => (<div key={date}> {new Date(date).toLocaleString('fi-FI', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })} </div>))}</td></tr>
                  <tr><td>Palkkakausi</td><td>{client.payperiod}</td></tr>
                </tbody>
              )
            })}
        </Table>
      </div>
    )
  }

  return (
    <div>
      <br /><h2>Asiakkaat</h2>
      <Notification />
      <Table striped>
        <thead>
          <tr>
            <th>Yritys</th>
            <th>Eräpäivä</th>
          </tr>
        </thead>
        <tbody>
          {clients.filter(filterBy)
            .map(client => {
              return (
                <tr key={client.id}>
                  <td>
                    <Link to={`/client/${client.id}`}>
                      {client.company}
                    </Link>
                  </td>
                  <td>{client.deadlines !== '' &&
                    format(client.deadlines[0], 'dd.MM.yyyy')}</td>
                </tr>
              )}
            )}
        </tbody>
      </Table>
    </div>
  )
}
export default ClientsList
