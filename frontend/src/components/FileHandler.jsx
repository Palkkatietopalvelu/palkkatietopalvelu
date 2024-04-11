// Ladatut tiedostot -alanäkymä (Yläpuolella Client.jsx ja HomeClient.jsx, alapuolella FileHandlerForm)
import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addFile, downloadFile, moveFileToTrash } from '../reducers/fileReducer'
import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { updateClient } from '../reducers/clientsReducer'
import Modal from 'react-bootstrap/Modal'
import FileHandlerForm from './FileHandlerForm'

const FileHandler = ({ client, files, nextDL, remainingDeadlines }) => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [varyingFileName, setVaryingFileName] = useState('')
  const [varyingFileId, setVaryingFileId] = useState(0)
  const [showMarkAsDeliveredModal, setShowMarkAsDeliveredModal] = useState(false)

  const handleFileSubmit = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (file) {
      const allowedTypes = [
        'application/pdf', // PDF
        'application/msword', // DOC
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
        'application/vnd.ms-excel', // XLS
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
        'text/csv', // CSV
      ]
      if (!allowedTypes.includes(file.type)) {
        alert('Lataathan vain PDF, Word, Excel, tai CSV tiedostoja.')
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      formData.append('owner', client.id)
      dispatch(addFile(formData)).then(result => {
        if (result) {
          navigate('/')
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }
      }).catch(error => {
        console.error('Error uploading file:', error)
      })
    }
  }

  const handleFileDownload = (fileId, fileName) => {
    dispatch(downloadFile(fileId, fileName)).then(() => {
    })
  }

  const handleFileToTrash = (fileId) => {
    dispatch(moveFileToTrash({ id: fileId })).then(result => {
      if (result) {
        if (user.role===2){
          navigate('/')}
        else {
          navigate(`/client/${client.id}`)
        }
      }
    })
    setShowModal(false)
  }

  const handleMarkAsDelivered = () => {
    files.forEach(file => {
      dispatch(moveFileToTrash({ id: file.id }))
    })
    updateData()
    setShowMarkAsDeliveredModal(false)
  }

  const updateData = () => {
    const clientObject = {
      id: client.id,
      user_id: user.id,
      company: client.company,
      email: client.email,
      phonenumber: client.phonenumber,
      bi_code: client.bi_code,
      deadlines: JSON.stringify(remainingDeadlines),
      payperiod: client.payperiod,
    }
    dispatch(updateClient(clientObject)).then(result => {
      if (result) {
        navigate(`/client/${client.id}`)
      }
    })
  }

  const linkState = {
    clientId: client.id,
    clientName: client.company,
    clientEmail: client.email,
    clientNumber: client.phonenumber,
    clientCode: client.bi_code,
    clientDeadlines: remainingDeadlines,
    clientPeriod: client.payperiod,
  }

  const FileToTrashModal = ({ varyingFileId, varyingFileName, handleFileToTrash, showModal, setShowModal  }) => {
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header>
            <Modal.Title>Tiedoston siirtäminen roskakoriin</Modal.Title>
          </Modal.Header>
          <Modal.Body>Haluatko varmasti siirtää tiedoston {varyingFileName} roskakoriin? Tiedosto säilyy roskakorissa yhden viikon. </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Peruuta</Button>
            <Button variant="danger" onClick={() => handleFileToTrash(varyingFileId)}>Siirrä roskakoriin</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  const MarkAsDeliveredModal = ({ nextDL, handleMarkAsDelivered, showModal, setShowModal }) => {
    return (
      <>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header>
            <Modal.Title>Tiedot toimitetuksi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Merkataanko eräpäivän {nextDL} tiedot toimitetuksi? Toimitetut tiedostot siirretään roskakoriin, jossa ne säilyvät vielä yhden viikon.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Peruuta</Button>
            <Button variant="primary" onClick={handleMarkAsDelivered}>Merkkaa toimitetuksi</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  return (
    <>
      <FileHandlerForm
        handleFileSubmit={handleFileSubmit}
        files={files}
        nextDL={nextDL}
        handleFileDownload={handleFileDownload}
        setShowModal={setShowModal}
        setVaryingFileName={setVaryingFileName}
        setVaryingFileId={setVaryingFileId}
        linkState={linkState}
        user={user}
        client={client}
        showMarkAsDeliveredModal={showMarkAsDeliveredModal}
        setShowMarkAsDeliveredModal={setShowMarkAsDeliveredModal}
        fileInputRef={fileInputRef}
        showModal={showModal}
        varyingFileId={varyingFileId}
        varyingFileName={varyingFileName}
        MarkAsDeliveredModal={MarkAsDeliveredModal}
        FileToTrashModal={FileToTrashModal}
        handleMarkAsDelivered={handleMarkAsDelivered}
        handleFileToTrash={handleFileToTrash}
      />
    </>
  )
}

export default FileHandler
