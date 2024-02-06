import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
      <h1>Asiakkaat</h1>
      <table>
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
                <td>{client.deadline}</td>
              </tr>
            )}
          )}
        </tbody>
      </table>
    </div>
  )
}
export default ClientsList
