import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Badge } from 'react-bootstrap'
import { format, endOfDay } from 'date-fns'
import DueDateBadge from './DueDateBadge'

const MyPageAdmin = () => {
  const user = useSelector(({ user }) => user)
  const filterByUser = (c => c.user_id === user.id)
  const clients = useSelector(({ clients }) => clients)
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const now = endOfDay(new Date())
  const englishToDigitsMonths = { 'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
    'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12' }

  useEffect(() => {
    if (!clients) {
      return
    } else {
      setFilteredCompanies(clients)
    }
  }, [clients])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleCompanySearch = (event) => {
    event.target.value === ''
      ? setFilteredCompanies(clients)
      : setFilteredCompanies(clients.filter(
        client => client.company.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleDateSearch = (event) => {
    event.target.value === ''
      ? setFilteredCompanies(clients)
      : setFilteredCompanies(clients.filter(
        client => deadlineChecker(client, event.target.value)))
  }

  const deadlineChecker = (client, searchword) => {
    //const dlExists = client.deadlines.map(dl => dl.toLowerCase().includes(searchword.toLowerCase()))
    const dlExists = client.deadlines.map(dl => duedateFormater(dl.toLowerCase()).includes(searchword.toLowerCase()))
    if(dlExists.includes(true)) {
      return client
    }
    return
  }

  const duedateFormater = (duedate) => {
    const parts = duedate.split(' ')
    const duedateFinnish = parts[1] + '.' + englishToDigitsMonths[parts[2]] + '.' + parts[3]
    return duedateFinnish
  }

  return (
    <div>
      {user.role === 1 && <div>
        <h4 style={{ marginTop: '20px' }}>Omat asiakkaat</h4>
        <Table striped>
          <thead>
            <tr>
              <th>Yritys</th>
              <th>Seuraava eräpäivä</th>
            </tr>
            <tr>
              <th><input id="companyFilter" onChange={handleCompanySearch} /></th>
              <th><input id="dateFilter" onChange={handleDateSearch} /></th>
            </tr>
          </thead>
          <tbody>
            {[...filteredCompanies]
              .filter(filterByUser)
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
                    <DueDateBadge client={client} now={now} />{' '}
                    <Badge bg={client.active ? 'success' : 'warning'} pill>
                      {client.active ? 'aktiivinen' : 'epäaktiivinen'}</Badge>
                    </td>
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
