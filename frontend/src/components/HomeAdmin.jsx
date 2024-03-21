// ./ (admin)
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Notification from './Notification'
import { Table, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import DueDateBadge from './DueDateBadge'
import OrderBy from './OrderBy'

const HomeAdmin = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients)
  const filterByUser = (c => c.user_id === user.id)
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [sortingCriteria, setSortingCriteria] = useState('company')  // company, due date, status

  useEffect(() => {
    if (!clients) {
      return
    } else {
      setFilteredCompanies(clients.filter(c => c.active))
    }
  }, [clients])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      {user.role === 1 &&
        <div>
          <br /><h2>Asiakkaat</h2><br />
          <Notification />
          <OrderBy clients={clients} setFilteredCompanies={setFilteredCompanies}
            setSortingCriteria={setSortingCriteria} />
          <Table striped>
            <thead>
              <tr>
                <th>Yritys</th>
                <th>Seuraava eräpäivä</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredCompanies]
                .filter(filterByUser)
                .sort(sortingCriteria === 'company'
                  // alphabetical order
                  ? ((a,b) => a.company.toLowerCase() > b.company.toLowerCase() ? 1 : -1)
                  // order by due date, earlier first. does not show undefined deadlines.
                  : ((a,b) => new Date(a.deadlines[0]) - new Date(b.deadlines[0])))
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
                      <DueDateBadge client={client} /></td>
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

export default HomeAdmin
