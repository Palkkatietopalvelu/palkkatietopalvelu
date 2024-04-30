// ./client/{client.id} ("asiakkaan tiedot"-sivu. Asiakaskohtainen)
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getFile } from '../reducers/fileReducer'
import Notification from './Notification'
import { Table, Button, Badge } from 'react-bootstrap'
import FileHandler from './FileHandler'
import 'bootstrap-icons/font/bootstrap-icons.css'
import useCheckLogin from '../hooks/CheckLogin'

const Client = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)

  useEffect(() => {
    if (user) {
      dispatch(getFile())}
  }, [dispatch, id, user])

  const files = useSelector(({ files }) => files).filter(f => f.owner === id && f.delete_date === null)

  if (!useCheckLogin()) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  let nextDL = null
  if (client.deadlines.length > 0) {
    const sortedDeadlines = [...client.deadlines].sort((a, b) => new Date(a) - new Date(b))
    const earliestDate = new Date(sortedDeadlines[0])
    nextDL = earliestDate.toLocaleString('fi-FI', { year: 'numeric', month: 'numeric', day: 'numeric' })
  }

  return (
    <div>
      {user.role === 1 &&
      <div>
        <br /><h2 style={{ marginBottom: '20px' }}>{client.company}</h2>
        <h5><Badge bg={client.active ? 'success' : 'warning'} pill>
          {client.active ? 'aktiivinen' : 'epäaktiivinen'}</Badge></h5>
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
            <tr><td>Eräpäivät</td><td>{client.deadlines
              .map(date =>
                (<div key={date}> {new Date(date)
                  .toLocaleString('fi-FI',
                    { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })}
                </div>))}</td></tr>
            <tr><td>Palkkakausi</td><td>{client.payperiod}</td></tr>
          </tbody>
        </Table>
        <Button onClick={() => navigate(`/client/${client.id}/update`)}>Muuta asiakkaan tietoja</Button>
        <FileHandler client={client} files={files} nextDL={nextDL} />
        <br/><br/>
        <h4>Poistetut tiedostot</h4>
        <Link to={`/client/${client.id}/trash`} id='trash'>Roskakori <i className="bi bi-trash"></i></Link>
        <br/><br/>
      </div>}
    </div>
  )
}

export default Client
