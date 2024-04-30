// ./ (admin) Tilitoimistokäyttäjän etusivu
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Notification from './Notification'
import { Table, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { format, isPast } from 'date-fns'
import DueDateBadge from './DueDateBadge'
import { ClientsOrder, ClientsFilter } from './SorterClients'
import useCheckLogin from '../hooks/CheckLogin'

const HomeAdmin = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients)
  const [filteredCompanies, setFilteredCompanies] = useState([])  // mitkä asiakkaat näytetään
  const [sortedBy, setSortedBy] = useState('Aakkosjärjestys')     // dropdown menu filtterin teksti, filtterikategoria
  const [sortingCriteria, setSortingCriteria] = useState('company')  // ei näy käyttäjälle, järjestelee asiakkaat (jat.)
  // (jat.)  company = aakkosjärjestykseen tai date = eräpäivän mukaan
  const [filterByUser, setFilterByUser] = useState(true)  // omat / kaikki asiakkaat
  const englishToDigitsMonths = { 'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
    'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12' }

  useEffect(() => {
    if (!clients) {
      return
    } else {
      setFilteredCompanies(clients.filter(c => c.active))
    }
  }, [clients])

  if (!useCheckLogin()) {
    return ('Et ole kirjautunut sisään')
  }

  const handleCompanySearch = (event) => {
    event.target.value === ''
    // jos textbox filtteri on tyhjä, filtteröidään asiakkaat dropdown menu filtterin mukaisesti
      ? setFilteredCompanies(clients.filter(client => matchesFilter(client)))
    // jos textbox filtterillä yritetään etsiä asiakasta, tarkastetaan mikä filtteri dropdown menussa on
    // ja etsitään asiakasta niistä vaihtoehdoista
      : setFilteredCompanies(clients.filter(client => matchesFilter(client) &&
        client.company.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleDateSearch = (event) => {
    // sama käytäntö kuin handleCompanySearchissa
    event.target.value === ''
      ? setFilteredCompanies(clients.filter(client => matchesFilter(client)))
      : setFilteredCompanies(clients.filter(client => matchesFilter(client) &&
        deadlineChecker(client, event.target.value)))
  }

  const deadlineChecker = (client, searchword) => {
    const dlExists = client.deadlines.map(dl => duedateFormater(dl.toLowerCase()).includes(searchword.toLowerCase()))
    if(dlExists.includes(true)) {
      return client
    }
  }

  const duedateFormater = (duedate) => {
    const parts = duedate.split(' ')
    const duedateFinnish = parts[1] + '.' + englishToDigitsMonths[parts[2]] + '.' + parts[3]
    return duedateFinnish
  }

  const matchesFilter = (client) => {
    // tarkistaa mikä filtteröinti dropdown menussa on ja
    // palauttaa asiakkaat sen mukaisesti takaisin handleCompanySearchille ja handleDateSearchille
    if (sortedBy === 'Aakkosjärjestys') return client.active
    if (sortedBy === 'Eräpäivä') return client.deadlines[0]
    if (sortedBy === 'Myöhässä') return client.deadlines[0] && isPast(client.deadlines[0])
    if (sortedBy === 'Ei myöhässä') return client.deadlines[0] && !isPast(client.deadlines[0])
    if (sortedBy === 'Epäaktiiviset') return !client.active
  }

  return (
    <div>
      {user.role === 1 &&
        <div>
          <br /><h2>Asiakkaat</h2><hr />
          <Notification />
          <div className="clients-sorters">
            <div className="row">
              <div className="col">
                <ClientsOrder clients={clients} setFilteredCompanies={setFilteredCompanies}
                  setSortingCriteria={setSortingCriteria} sortedBy={sortedBy} setSortedBy={setSortedBy} /></div>
              <div className="col"><ClientsFilter setFilterByUser={setFilterByUser}/></div>
              <br /><br />
            </div>
          </div>
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
                .filter(((c) => filterByUser ? c.user_id === user.id : true)) // filters clients by user only if filterByUser is true
                .sort(sortingCriteria === 'company'
                // alphabetical order, asiakkaat aakkosjärjestyksessä
                  ? ((a,b) => a.company.toLowerCase() > b.company.toLowerCase() ? 1 : -1)
                // order by due date, earlier first. does not show undefined deadlines.
                // asiakkaat eräpäivän mukaan järjestetty
                  : ((a,b) => new Date(a.deadlines[0]) - new Date(b.deadlines[0])))   // sortingCriteria === 'date'
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
                      <DueDateBadge deadline={client.deadlines[0]} /></td>
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
