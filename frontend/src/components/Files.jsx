// ./files (admin)
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'
import { getFile } from '../reducers/fileReducer'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Files = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const clients = useSelector(({ clients }) => clients).filter(c => c.user_id === user.id)
  const files = useSelector(({ file }) => file).filter(f => f.delete_date === null && clients.some(c => c.id === f.owner))

  useEffect(() => {
    if (user) {
      dispatch(getFile())}
  }, [dispatch, user])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      {user.role === 1 &&
      <div>
        <br /><h2> Saapuneet aineistot</h2><br />
        <Table striped>
          <thead>
            <tr>
              <th>Yritys</th>
              <th>Saapumisaika</th>
              <th>Aineisto</th>
            </tr>
          </thead>
          <tbody>
            {files
              .map(file => {
                return (
                  <tr key={file.id}>
                    <td>
                      <Link to={`/client/${file.owner}`}>
                        {file.company}
                      </Link>
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
