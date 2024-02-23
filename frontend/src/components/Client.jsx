import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getPdf } from '../reducers/pdfReducer'
import Notification from './Notification'
import { Table } from 'react-bootstrap'
import PdfHandler from './PdfHandler'

const Client = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)

  useEffect(() => {
    if (user) {
      dispatch(getPdf())}
  }, [dispatch, id, user])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  return (
    <div>
      {user.role === 1 &&
        <div>
          <br /><h2 style={{ marginBottom: '20px' }}>{client.company}</h2>
          <Notification />
          <h4 style={{ marginTop: '20px' }}>Yhteystiedot</h4>
          <Table striped>
            <tbody>
              <tr><td>Sähköposti</td><td>{client.email}</td></tr>
              <tr><td>Puhelinnumero</td><td>{client.phonenumber}</td></tr>
            </tbody>
          </Table>
          <h4>Laskutustiedot</h4>
          <Table striped>
            <tbody>
              <tr><td>Y-tunnus</td><td>{client.bi_code}</td></tr>
              <tr><td>Eräpäivät</td><td>{client.deadlines.map(date => (<div key={date}> {new Date(date).toLocaleString('fi-FI', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })} </div>))}</td></tr>
              <tr><td>Palkkakausi</td><td>{client.payperiod}</td></tr>
            </tbody>
          </Table>
          <Link to={`/client/${client.id}/update`}>Muuta asiakkaan tietoja</Link>
          <PdfHandler client={client} />
        </div>}
    </div>
  )
}

export default Client
