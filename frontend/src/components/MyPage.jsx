import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { format } from 'date-fns'
import PasswordChange from './PasswordForm'
import Notification from './Notification'
import { useParams } from 'react-router-dom'
import { getPdf } from '../reducers/pdfReducer'
import PdfHandler from './PdfHandler'

const MyPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients)
  const filterBy = (c => c.user_id === user.id)
  const id = Number(useParams().id)
  const user_client = useSelector(({ clients }) => clients).find(c => c.email === user.username)

  useEffect(() => {
    if (user) {
      dispatch(getPdf())}
  }, [dispatch, id, user])

  const pdfs = useSelector(({ pdf }) => pdf).filter(c => c.owner === id)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  if(user.role === 2) {
    return (
      <div>
        <br /><h2 style={{ marginBottom: '20px' }}>Omat sivut</h2>
        <h4 style={{ marginTop: '20px' }}>Käyttäjätilin asetukset</h4>
        <p>Käyttäjätunnus: {user.username}</p>
        <Notification />
        <PasswordChange />
        <Table striped>
          <thead>
            <tr>
              <th>Yritys</th>
              <th>Eräpäivä</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Sähköposti</td><td>{user_client.email}</td></tr>
            <tr><td>Puhelinnumero</td><td>{user_client.phonenumber}</td></tr>
          </tbody>
        </Table>
        <h4>Laskutustiedot</h4>
        <Table striped>
          <tbody>
            <tr><td>Y-tunnus</td><td>{user_client.bi_code}</td></tr>
            <tr><td>Eräpäivät</td><td>{user_client.deadlines.map(date => (<div key={date}> {new Date(date).toLocaleString('fi-FI', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })} </div>))}</td></tr>
            <tr><td>Palkkakausi</td><td>{user_client.payperiod}</td></tr>
          </tbody>
        </Table>
        <PdfHandler client={user_client} pdfs={pdfs} />
      </div>
    )
  }

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>Omat sivut</h2>
      <h4 style={{ marginTop: '20px' }}>Käyttäjätilin asetukset</h4>
      <p>Käyttäjätunnus: {user.username}</p>
      <Notification />
      <PasswordChange />
      <h4 style={{ marginTop: '20px' }}>Omat asiakkaat</h4>
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
                  <td>{format(client.deadlines[0], 'dd.MM.yyyy')}</td>
                </tr>
              )}
            )}
        </tbody>
      </Table>
    </div>
  )
}

export default MyPage
