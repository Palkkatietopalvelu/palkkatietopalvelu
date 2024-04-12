// ./ (asiakas)
import '../../assets/style.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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

  let nextDL = null
  if (client.deadlines.length > 0) {
    const sortedDeadlines = [...client.deadlines].sort((a, b) => new Date(a) - new Date(b))
    const earliestDate = new Date(sortedDeadlines[0])
    nextDL = earliestDate.toLocaleString('fi-FI', { year: 'numeric', month: 'numeric', day: 'numeric' })
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
          {nextDL && <FileHandler client={client} files={files} nextDL={nextDL} />}
          <br/><br/>
          <h4>Poistetut tiedostot</h4>
          <Link to={`/client/${client.id}/trash`} id='trash'>Roskakori <i className="bi bi-trash"></i></Link>
          <br/><br/>
        </div>
      }
    </div>
  )
}

export default HomeClient
