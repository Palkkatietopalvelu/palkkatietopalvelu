import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Badge, Dropdown } from 'react-bootstrap'
import { format, endOfDay, isPast } from 'date-fns'
import DueDateBadge from './DueDateBadge'

const MyPageAdmin = () => {
  const user = useSelector(({ user }) => user)
  const filterByUser = (c => c.user_id === user.id)
  const clients = useSelector(({ clients }) => clients)
  const [filteredCompanies, setFilteredCompanies] = useState([])
  const [sortingCriteria, setSortingCriteria] = useState('company')  // company, due date
  const [sortedBy, setSortedBy] = useState('Aakkosjärjestyksessä')   // alphabetic, late, not late, due date
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

  const showLate = () => {
    setSortingCriteria('date')
    setSortedBy('Myöhässä')
    setFilteredCompanies(clients.filter(client => isPast(client.deadlines[0])))
  }

  const showNotLate = () => {
    setSortingCriteria('date')
    setSortedBy('Ei myöhässä')
    setFilteredCompanies(clients.filter(client => !isPast(client.deadlines[0])))
  }

  const orderByDate = () => {
    setSortingCriteria('date')
    setSortedBy('Eräpäivä')
    setFilteredCompanies(clients)
  }

  const showAllCompanies = () => {
    setSortingCriteria('company')
    setSortedBy('Kaikki')
    setFilteredCompanies(clients)
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

  const dateToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
      &#x25bc;
    </a>
  ))

  return (
    <div>
      {user.role === 1 && <div> <hr />
        <h4 style={{ marginTop: '20px' }}>Omat asiakkaat</h4> <br />
        <DueDateToggle dateToggle={dateToggle} sortedBy={sortedBy} showLate={showLate}
          showNotLate={showNotLate} orderByDate={orderByDate} showAllCompanies={showAllCompanies} /> <br />
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
              .sort(sortingCriteria === 'company'
                ? ((a,b) => a.company > b.company ? 1 : -1)
                : ((a,b) => a.deadlines[0] > b.deadlines[0] ? 1 : -1))
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

const DueDateToggle = ({ dateToggle, showLate, showNotLate, sortedBy, orderByDate, showAllCompanies }) => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle as={dateToggle} id="dropdown-client-sorter">
          <b>{sortedBy}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" onClick={showLate}>Myöhässä</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={showNotLate}>Ei myöhässä</Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={orderByDate}>Eräpäivän mukaan</Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={showAllCompanies}>Aakkosjärjestyksessä</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default MyPageAdmin
