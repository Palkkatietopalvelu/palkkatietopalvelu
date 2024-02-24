import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { format } from 'date-fns'

const MyPageAdmin = ({ clients }) => {
  const user = useSelector(({ user }) => user)
  const filterByUser = (c => c.user_id === user.id)
  const [filteredCompanies, setFilteredCompanies] = useState([])

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
    const dlExists = client.deadlines.map(dl => dl.toLowerCase().includes(searchword.toLowerCase()))
    if(dlExists.includes(true)) {
      return client
    }
    return
  }

  return (
    <div>
      <h4 style={{ marginTop: '20px' }}>Omat asiakkaat</h4>
      <Table striped>
        <thead>
          <tr>
            <th>Yritys</th>
            <th>Eräpäivä</th>
          </tr>
          <tr>
            <th><input id="companyFilter" onChange={handleCompanySearch} /></th>
            <th><input id="dateFilter" onChange={handleDateSearch} /></th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies
            .filter(filterByUser)
            .sort((a,b) => a.company > b.company)
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

export default MyPageAdmin