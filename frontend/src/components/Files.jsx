// ./files (admin)
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { getFile } from '../reducers/fileReducer'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DueDateBadge from './DueDateBadge'
import FilesOrder from './SorterFiles'

const Files = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients).filter(c => c.user_id === user.id)
  const files = useSelector(({ file }) => file).filter(f => f.delete_date === null && clients.some(c => c.id === f.owner))
  const [sortingCriteria, setSortingCriteria] = useState('arrival time newest')  // arrival time newest, arrival time oldest, due date

  useEffect(() => {
    if (user) {
      dispatch(getFile())}
  }, [dispatch, user])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      {user.role === 1 && <div>
        <br /><h2> Saapuneet aineistot</h2><hr/>
        <FilesOrder setSortingCriteria={setSortingCriteria} />
        <Table striped>
          <thead>
            <tr>
              <th>Yritys</th>
              <th>Seuraava eräpäivä</th>
              <th>Saapumisaika</th>
              <th>Aineisto</th>
            </tr>
          </thead>
          <tbody>
            {files
              .sort(sortingCriteria === 'arrival time newest'
              // order by arrival time newest first
                ? ((a,b) => new Date(b.date) - new Date(a.date))
                : sortingCriteria == 'arrival time oldest'
                // order by arrival time oldest first
                  ? ((a,b) => new Date(a.date) - new Date(b.date))
                // order by due date
                  : ((a,b) => new Date(a.deadlines[0]) - new Date(b.deadlines[0])))
              .map(file => {
                return (
                  <tr key={file.id}>
                    <td>
                      <Link to={`/client/${file.owner}`}>
                        {file.company}
                      </Link>
                    </td>
                    <td>
                      <DueDateBadge deadline={file.deadlines[0]}/>
                    </td>
                    <td>
                      {format(new Date(file.date), 'dd.MM.yyyy HH:mm')}
                    </td>
                    <td>
                      {file.name}
                    </td>
                  </tr>
                )}
              )}
          </tbody>
        </Table>
      </div>
      }
    </div>
  )
}

export default Files
