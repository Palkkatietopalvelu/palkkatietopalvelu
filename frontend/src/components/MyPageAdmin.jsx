import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { format } from 'date-fns'

const MyPageAdmin = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients).filter(c => c.user_id === user.id)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      {user.role === 1 && <div>
        <h4 style={{ marginTop: '20px' }}>Omat asiakkaat</h4>
        <Table striped>
          <thead>
            <tr>
              <th>Yritys</th>
              <th>Eräpäivä</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => {
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
      </div>}
    </div>
  )
}

export default MyPageAdmin
