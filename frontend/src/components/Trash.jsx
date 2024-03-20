import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteFile, restoreFile } from '../reducers/fileReducer'
import { Button } from 'react-bootstrap'
import { format } from 'date-fns'
import { getFile } from '../reducers/fileReducer'
import Notification from './Notification'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

const Trash = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)
  const files = useSelector(({ file }) => file).filter(f => f.delete_date !== null && f.deleted_by === user.id)
  const [showModal, setShowModal] = useState(false)
  const [varyingFileId, setVaryingFileId] = useState(0)
  const [varyingFileName, setVaryingFileName] = useState('')

  useEffect(() => {
    if (user && client) {
      dispatch(getFile())}
  }, [dispatch, user, client])

  const handleFileRestore = (fileId) => {
    dispatch(restoreFile({ id: fileId }))
  }

  const handleFileDelete = (fileId) => {
    dispatch(deleteFile({ id: fileId }))
    setShowModal(false)
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
              <Button id={file.id+'palauta'} variant="primary" size="sm" onClick={() => handleFileRestore(file.id)}>Palauta</Button>
              {' '}
              <Button id={file.id+'poista'} variant="danger" size="sm" onClick={() => {setShowModal(true), setVaryingFileName(file.name), setVaryingFileId(file.id)}}>Poista</Button>
            </li>
          ))}
          <DeleteFileModal varyingFileId={varyingFileId} varyingFileName={varyingFileName} handleFileDelete={handleFileDelete}
            showModal={showModal} setShowModal={setShowModal} />
        </ul>
      </div>
    )}
  else {
    return ('Sinulla ei ole oikeuksia tälle sivulle')
  }
}

const DeleteFileModal = ({ varyingFileId, varyingFileName, handleFileDelete, showModal, setShowModal }) => {
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Tiedoston poistaminen</Modal.Title>
        </Modal.Header>
        <Modal.Body>Haluatko varmasti poistaa tiedoston {varyingFileName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Peruuta</Button>
          <Button variant="danger" onClick={() => handleFileDelete(varyingFileId)}>Poista tiedosto</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Trash
