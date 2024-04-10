// ./ (asiakas)
import '../../assets/style.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Notification from './Notification'
import { Table } from 'react-bootstrap'
import { getFile } from '../reducers/fileReducer'
import FileHandler from './FileHandler'
import DueDateBadge from './DueDateBadge'

const HomeClient = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const client = useSelector(({ clients }) => clients).find(c => c.email === user.username)
  const files = useSelector(({ file }) => file).filter(f => f.owner === client.id && f.delete_date === null)

  useEffect(() => {
    if (user && client) {
      dispatch(getFile())}
  }, [dispatch, user, client])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  return (
    <div>
      {user.role === 2 &&
        <div>
          <br /><h2 className='welcome'>Tervetuloa palkkatietopalveluun!</h2><hr />
          <br></br>
          <h3>Palautathan palkka-aineiston hyvissä ajoin</h3>
          <br></br>
          <Notification />
          <h4 className='client'>{client.company}</h4>
          <Table striped>
            <tbody key={client.email}>
              <tr><td>Seuraavat eräpäivät</td><td>{client.deadlines.map(date =>
                <div key={date}>
                  {new Date(date).toLocaleString('fi-FI',
                    { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })}
                  {' '} {date == client.deadlines[0] && <DueDateBadge client={client} />} </div>)}</td></tr>
              <tr><td>Palkkakausi</td><td>{client.payperiod}</td></tr>
            </tbody>
          </Table>
          <FileHandler client={client} files={files} />
        </div>
      }
    </div>
  )
}

export default HomeClient
