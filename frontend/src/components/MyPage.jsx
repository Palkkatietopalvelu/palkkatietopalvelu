// ./mypage (Omat asetukset ja tiedot, admin ja asiakas)
import { useSelector } from 'react-redux'
import PasswordChange from './PasswordForm'
import RegisterForm from './RegisterForm'
import React from 'react'
import { Table } from 'react-bootstrap'
import DueDateBadge from './DueDateBadge'
import Notification from './Notification'
import useCheckLogin from '../hooks/CheckLogin'
import TwoFactor from './TwoFactor'

const MyPage = () => {
  const user = useSelector(({ user }) => user)
  const client = useSelector(({ clients }) => clients).find(c => c.email === user.username)

  if (!useCheckLogin()) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>Omat sivut</h2><hr />
      <Notification />
      <h4 style={{ marginTop: '20px' }}>Käyttäjätilin asetukset</h4>
      <p>Käyttäjätunnus: {user.username}</p>
      <TwoFactor />
      <br />
      <PasswordChange />
      {user.role === 1 && <div>
        <RegisterForm /> </div>}
      {user.role === 2 && client && <div> <hr />
        <h5 style={{ marginTop: '20px' }}>Yhteystiedot</h5>
        <Table striped>
          <tbody key={client.email} >
            <tr><td>Sähköposti</td><td>{client.email}</td></tr>
            <tr><td>Puhelinnumero</td><td>{client.phonenumber}</td></tr>
          </tbody>
        </Table>
        <h5>Laskutustiedot</h5>
        <Table striped>
          <tbody key={client.email}>
            <tr><td>Y-tunnus</td><td>{client.bi_code}</td></tr>
            <tr><td>Eräpäivät</td><td>{client.deadlines.map(date =>
              <div key={date}>
                {new Date(date).toLocaleString('fi-FI',
                  { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })}
                {' '} {date == client.deadlines[0] && <DueDateBadge deadline={client.deadlines[0]} />}
              </div>)}</td></tr>
            <tr><td>Palkkakausi</td><td>{client.payperiod}</td></tr>
          </tbody>
        </Table>
      </div>}
    </div>
  )
}

export default MyPage
