import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getPdf } from '../reducers/pdfReducer'

const MyPageClient = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.email === user.username)

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
      <h5 style={{ marginTop: '20px' }}>Yhteystiedot</h5>
      <Table striped>
        <tbody key={client.email} >
          <tr><td>Sähköposti</td><td>{client.email}</td></tr>
          <tr><td>Puhelinnumero</td><td> {client.phonenumber}</td></tr>
        </tbody>
      </Table>
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
    </div>
  )
}

export default MyPageClient
