import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { format } from 'date-fns'

const MyPage = () => {
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const clients = useSelector(({ clients }) => clients)
  const filterBy = (c => c.user_id === user.id)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>Omat sivut</h2>
      <h4 style={{ marginTop: '20px' }}>Käyttäjätilin asetukset</h4>
      <p>Käyttäjätunnus: {user.username}</p>
      <p>Salasanan vaihto</p>
      <h4 style={{ marginTop: '20px' }}>Minun yritykset</h4>
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
                  <td>{format(client.deadline, 'dd.MM.yyyy')}</td>
                </tr>
              )}
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default MyPage
