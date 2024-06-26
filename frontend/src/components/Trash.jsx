// ./client/id/trash (Roskakori)
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteFile, downloadFile } from '../reducers/fileReducer'
import { Button, Modal, Table } from 'react-bootstrap'
import { format } from 'date-fns'
import { getFile } from '../reducers/fileReducer'
import Notification from './Notification'
import useCheckLogin from '../hooks/CheckLogin'

const Trash = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)
  const files = useSelector(({ files }) => files).filter(f => f.delete_date !== null && f.deleted_by === user.id)
  const [showModal, setShowModal] = useState(false)
  const [varyingFileId, setVaryingFileId] = useState(0)
  const [varyingFileName, setVaryingFileName] = useState('')

  useEffect(() => {
    if (user && client) {
      dispatch(getFile())}
  }, [dispatch, user, client])

  const handleFileDownload = (fileId, fileName) => {
    dispatch(downloadFile(fileId, fileName)).then(() => {
    })
  }

  const handleFileDelete = (fileId) => {
    dispatch(deleteFile({ id: fileId }))
    setShowModal(false)
  }

  if (!useCheckLogin()) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  } else {
    return (
      <div className='container'>
        {user.role === 1 && <div><br />
          <Button variant="secondary" onClick={() => navigate(`/client/${id}`)}
            style={{ marginBottom: '20px' }}>Takaisin asiakkaan tietoihin</Button>
        </div>}<br />
        <h4>Roskakori</h4>
        <p>Tiedostot poistetaan roskakorista automaattisesti viikon kuluttua niiden siirtämisestä roskakoriin</p>
        <Notification />
        <div className='table-responsive'>
          <Table striped>
            <thead>
              <tr>
                <th></th>
                <th>Tiedosto</th>
                <th>Päivämäärä</th>
                <th>Yritys</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => {
                return (
                  <tr key={file.id}>
                    <td style={{ textAlign:'right', width: '10%', whiteSpace: 'nowrap' }}>
                      <Button id={file.id+'lataa'} variant="primary" size="sm"
                        onClick={() => handleFileDownload(file.id, file.name)}>Lataa</Button>{' '}
                      <Button id={file.id+'poista'} variant="danger" size="sm" onClick={() =>
                      {setShowModal(true), setVaryingFileName(file.name), setVaryingFileId(file.id)}}>Poista</Button></td>
                    <td>{file.name}</td>
                    <td>{format(new Date(file.date), 'yyyy-MM-dd HH:mm')}</td>
                    <td>{file.company}</td>
                  </tr>
                )})}
            </tbody>
            <DeleteFileModal varyingFileId={varyingFileId} varyingFileName={varyingFileName} handleFileDelete={handleFileDelete}
              showModal={showModal} setShowModal={setShowModal} />
          </Table>
        </div>
      </div>
    )}
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
