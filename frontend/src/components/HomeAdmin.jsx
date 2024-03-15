import { useSelector } from 'react-redux'
import Notification from './Notification'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { format, endOfDay } from 'date-fns'
import DueDateBadge from './DueDateBadge'

const HomeAdmin = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) =>
    clients).filter(c => c.user_id === user.id)
  const now = endOfDay(new Date())

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      {user.role === 1 &&
        <div>
          <br /><h2>Asiakkaat</h2>
          <Notification />
          <Table striped>
            <thead>
              <tr>
                <th>Yritys</th>
                <th>Seuraava eräpäivä</th>
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
                      <td>{client.deadlines != '' &&
                        format(client.deadlines[0], 'dd.MM.yyyy')} {' '}
                      <DueDateBadge client={client} now={now} />
                      </td>
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

export default HomeAdmin
