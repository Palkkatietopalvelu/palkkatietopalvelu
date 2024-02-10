import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Client = () => {
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  return (
    <div>
      <br /><h2>{client.company}</h2>
      <h4>Yhteystiedot</h4>
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
          <tr><td>Eräpäivä</td><td>{client.deadline}</td></tr>
          <tr><td>Palkkakausi</td><td>{client.payperiod}</td></tr>
        </tbody>
      </Table>
      <Link to={`/client/${client.id}/changedata`}>Muuta asiakkaan tietoja</Link>
    </div>
  )
}

export default Client
