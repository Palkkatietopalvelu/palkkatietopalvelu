import { useSelector } from 'react-redux'
import Notification from './Notification'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { format, formatDistanceToNow, endOfDay, isPast } from 'date-fns'
import Badge from 'react-bootstrap/Badge';

const HomeAdmin = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) =>
    clients).filter(c => c.user_id === user.id)

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
                <th>Eräpäivä</th>
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
                        <DueDateStatus client={client} />
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

const DueDateStatus = ({ client }) => {
  const now = endOfDay(new Date())
  const late = isPast(client.deadlines[0])
  
  if (late) {
    return (
      <Badge bg="danger" pill>myöhässä</Badge>
    )
  }

  let days_left = formatDistanceToNow(client.deadlines[0], now).split(" ")
  if (days_left[0] === "about") 
    days_left = "1 päivä"
  else
    days_left = days_left[0] + " päivää"

  return (
    <Badge bg="primary" pill>{days_left}</Badge>
  )
}

export default HomeAdmin
