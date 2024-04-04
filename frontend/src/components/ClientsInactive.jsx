// ./deactivated (Deaktivoidut asiakkaat)
import { useSelector } from 'react-redux'
import Notification from './Notification'
import { Table, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const InactiveClients = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) =>
    clients).filter(c => c.user_id === user.id && c.active === false)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      {user.role === 1 &&
        <div>
          <br /><h2>Deaktivoidut asiakkaat</h2>
          <Notification />
          <Table striped>
            <thead>
              <tr>
                <th>Yritys</th>
                <th>Sähköposti</th>
                <th>Puhelinnumero</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients
                .sort((a,b) => a.company > b.company ? 1 : -1)
                .map(client => {
                  return (
                    <tr key={client.id}>
                      <td>
                        <Link to={`/client/${client.id}`}>
                          {client.company}
                        </Link>
                      </td>
                      <td>{client.email}</td>
                      <td>{client.phonenumber}</td>
                      <td><Badge bg={client.active ? 'success' : 'warning'} pill>
                        {client.active ? 'aktiivinen' : 'epäaktiivinen'}</Badge></td>
                    </tr>
                  )}
                )}
            </tbody>
          </Table>
        </div>
      }
    </div>
  )
}

export default InactiveClients
