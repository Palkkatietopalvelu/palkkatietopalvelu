import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { format } from 'date-fns'
import { useState } from "react"
import PasswordChange from './PasswordForm'
import Notification from './Notification'

const MyPage = () => {
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients)
  const filterBy = (c => c.user_id === user.id)
  const [filteredCompanies, setFilteredCompanies] = useState(clients)
  const [filteredDates, setFilteredDates] = useState(clients)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleCompanySearch = (event) => {
    event.target.value === ""
      ? setFilteredCompanies(clients)
      : setFilteredCompanies(clients.filter(
        client => client.company.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const deadlineChecker = (client, searchword) => {
    const dlExists = client.deadlines.map(dl => dl.toLowerCase().includes(searchword.toLowerCase()))
    if(dlExists.includes(true)) {
      return client
    }
    return
  }

  const handleDateSearch = (event) => {
    event.target.value === ""
    ? setFilteredCompanies(clients)
    : setFilteredCompanies(clients.filter(
        client => deadlineChecker(client, event.target.value)))
  }

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>Omat sivut</h2>
      <h4 style={{ marginTop: '20px' }}>Käyttäjätilin asetukset</h4>
      <p>Käyttäjätunnus: {user.username}</p>
      <Notification />
      <PasswordChange />
      <hr />
      <h4 style={{ marginTop: '20px' }}>Asiakkaat</h4>
      <CompanyList filteredCompanies={filteredCompanies} handleCompanySearch={handleCompanySearch}
                    handleDateSearch={handleDateSearch} filterBy={filterBy} />
    </div>
  )
}

const CompanyList = ({ filteredCompanies, handleCompanySearch, handleDateSearch, filterBy }) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Yritys</th>
          <th>Eräpäivä</th>
        </tr>
        <tr>
          <th><input onChange={handleCompanySearch} /></th>
          <th><input onChange={handleDateSearch}/></th>
        </tr>
      </thead>
      <tbody>
        {filteredCompanies.filter(filterBy).sort((a,b) => a.company > b.company)
          .map(client => {
            return (
              <tr key={client.id}>
                <td>
                  <Link to={`/client/${client.id}`}>
                    {client.company}
                  </Link>
                </td>
                <td>{format(client.deadlines[0], 'dd.MM.yyyy')}</td>
              </tr>
            )}
          )}
      </tbody>
    </Table>
  )
}

export default MyPage
