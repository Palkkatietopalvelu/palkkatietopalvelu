import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Notification from './Notification'
import { Table } from 'react-bootstrap'
import PdfHandler from './PdfHandler'
import { getPdf } from '../reducers/pdfReducer'

const HomeClient = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const client = useSelector(({ clients }) => clients).find(c => c.email === user.username)

  useEffect(() => {
    if (user) {
      dispatch(getPdf())}
  }, [dispatch, user])


  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  return (
    <div>
      {user.role === 2 &&
        <div>
          <br /><h2>Tervetuloa palkkatietopalveluun!</h2>
          <br></br>
          <h3>Palautathan palkka-aineiston hyvissä ajoin</h3>
          <br></br>
          <Notification />
          <h4 style={{ marginBottom: '20px' }}>{client.company}</h4>
          <h4>Laskutustiedot</h4>
          <Table striped>
            <tbody key={client.email}>
              <tr><td>Y-tunnus</td><td>{client.bi_code}</td></tr>
              <tr><td>Eräpäivät</td><td>{client.deadlines.map(date =>
                (<div key={date}>
                  {new Date(date).toLocaleString('fi-FI',
                    { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })}
                </div>))}</td></tr>
              <tr><td>Palkkakausi</td><td>{client.payperiod}</td></tr>
            </tbody>
          </Table>
          <PdfHandler client={client} />
        </div>
      }
    </div>
  )
}

export default HomeClient
