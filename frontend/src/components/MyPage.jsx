import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { format } from 'date-fns'
import { useState } from "react"
import PasswordChange from './PasswordForm'
import Notification from './Notification'
import MyPageClient from './MyPageClient'
import MyPageAdmin from './MyPageAdmin'

const MyPage = () => {
  const user = useSelector(({ user }) => user)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleSearchword = (event) => {
    event.target.value === ""
      ? setFilteredCompanies(clients)
      : setFilteredCompanies(clients.filter(
        c => c.company.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>Omat sivut</h2>
      <h4 style={{ marginTop: '20px' }}>Käyttäjätilin asetukset</h4>
      <p>Käyttäjätunnus: {user.username}</p>
      <Notification />
      <PasswordChange />
      {user.role === 1
        ? <MyPageAdmin />
        : <MyPageClient />}
    </div>
  )
}

const CompanyList = ({ filteredCompanies, handleSearchword }) => {
  return (
    <Table striped>
      <thead>
        <tr>
          <th>Yritys</th>
          <th>Eräpäivä</th>
        </tr>
        <tr>
          <th><input onChange={handleSearchword} /></th>
        </tr>
      </thead>
      <tbody>
        {filteredCompanies
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
