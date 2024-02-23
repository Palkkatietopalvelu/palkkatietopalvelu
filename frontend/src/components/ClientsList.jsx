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

  if (!user) {
    return
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
          {clients.filter(filterBy).sort((a,b) => a.company > b.company)
            .map(client => {
              return (
                <tr key={client.id}>
                  <td>
                    <Link to={`/client/${client.id}`}>
                      {client.company}
                    </Link>
                  </td>
                  <td>{client.deadlines != '' &&
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
