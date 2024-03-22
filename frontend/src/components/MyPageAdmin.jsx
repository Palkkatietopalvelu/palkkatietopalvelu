// ./mypage (Omat sivut, admin)
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Badge, Dropdown } from 'react-bootstrap'
import { format, endOfDay, isPast } from 'date-fns'
import DueDateBadge from './DueDateBadge'
import OrderBy from './OrderBy'

const MyPageAdmin = () => {
  const user = useSelector(({ user }) => user)
  const filterByUser = (c => c.user_id === user.id)
  const clients = useSelector(({ clients }) => clients)
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [sortingCriteria, setSortingCriteria] = useState('company')  // company, due date, status
  const now = endOfDay(new Date())
  const englishToDigitsMonths = { 'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
    'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12' }

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
      {user.role === 1 && <div> <hr />
        <h4 style={{ marginTop: '20px' }}>Omat asiakkaat</h4> <br />
        <OrderBy clients={clients} setFilteredCompanies={setFilteredCompanies}
          setSortingCriteria={setSortingCriteria} />
        <Table striped>
          <thead>
            <tr>
              <th>Yritys</th>
              <th>Seuraava eräpäivä</th>
              <th>Status</th>
            </tr>
            <tr>
              <th><input id="companyFilter" onChange={handleCompanySearch} /></th>
              <th><input id="dateFilter" onChange={handleDateSearch} /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...filteredCompanies]
              .filter(filterByUser)
              .sort(sortingCriteria === 'company'
                ? ((a,b) => a.company.toLowerCase() > b.company.toLowerCase() ? 1 : -1) // alphabetical order
                : ((a,b) => new Date(a.deadlines[0]) - new Date(b.deadlines[0]))) // order by due date, earlier first
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
                    <DueDateBadge client={client} now={now} />{' '}</td>
                    <td><Badge bg={client.active ? 'success' : 'warning'} pill>
                      {client.active ? 'aktiivinen' : 'epäaktiivinen'}</Badge></td>
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
