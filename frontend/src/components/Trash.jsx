import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteFile, restoreFile } from '../reducers/fileReducer'
import { Button } from 'react-bootstrap'
import { format } from 'date-fns'
import { getFile } from '../reducers/fileReducer'
import Notification from './Notification'

const Trash = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)
  const files = useSelector(({ file }) => file).filter(f => f.delete_date !== null && f.deleted_by === user.id)

  useEffect(() => {
    if (user && client) {
      console.log(client)
      dispatch(getFile())}
  }, [dispatch, user, client])

  const handleFileRestore = (fileId) => {
    dispatch(restoreFile({ id: fileId }))
  }

  const handleFileDelete = (fileId, fileName) => {
    if (window.confirm(`Haluatko varmasti poistaa tiedoston ${fileName}?`)) {
      dispatch(deleteFile({ id: fileId }))
    }
  }

  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  } else if (client.email===user.username || client.user_id===user.id) {
    return (
      <div>
        <br /><h4>Roskakori</h4>
        <p>Tiedostot poistetaan roskakorista automaattisesti viikon kuluttua niiden siirtämisestä roskakoriin</p>
        <Notification />
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              {file.name}, {format(new Date(file.date), 'yyyy-MM-dd HH:mm')}{' '}
              <Button id={file.id} variant="primary" size="sm" onClick={() => handleFileRestore(file.id)}>Palauta</Button>
              {' '}
              <Button id={file.id} variant="danger" size="sm" onClick={() => handleFileDelete(file.id, file.name)}>Poista</Button>
            </li>
          ))}
        </ul>
      </div>
    )}
  else {
    return ('Sinulla ei ole oikeuksia tälle sivulle')
  }
}

export default Trash
