// Ladatut tiedostot -alanäkymä (Yläpuolella Client.jsx ja HomeClient.jsx, alapuolella FileHandlerForm)
import React, { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addFile, downloadFile, moveFileToTrash } from '../reducers/fileReducer'
import { Button, Modal, Form } from 'react-bootstrap'
import { updateClient } from '../reducers/clientsReducer'
import FileHandlerForm from './FileHandlerForm'
import { DateSelect } from '../hooks/DatePicker'
import DatePicker from 'react-multi-date-picker'
import days from './ReminderInfo'

const { weekDays, months } = days
const weekDaysSorted = weekDays.slice(6).concat(weekDays.slice(0, 6))

const FileHandler = ({ client, files, nextDL }) => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [varyingFileName, setVaryingFileName] = useState('')
  const [varyingFileId, setVaryingFileId] = useState(0)
  const [showMarkAsDeliveredModal, setShowMarkAsDeliveredModal] = useState(false)
  const [showDeadlinesModal, setShowDeadlinesModal] = useState(false)
  const deadlines = DateSelect(client
    ? client.deadlines
      .map(deadline => new Date(deadline).getTime())
      .sort((a, b) => a - b)
      .slice(1)
    : []
  )
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

  const updateData = (event, fromDeadlinesModal = false) => {
    event.preventDefault()
    files.forEach(file => {
      dispatch(moveFileToTrash({ id: file.id }))
    })
    const clientObject = {
      id: client.id,
      user_id: user.id,
      company: client.company,
      email: client.email,
      phonenumber: client.phonenumber,
      bi_code: client.bi_code,
      deadlines: JSON.stringify(deadlines.value),
      payperiod: client.payperiod,
    }
    dispatch(updateClient(clientObject)).then(result => {
      if (fromDeadlinesModal) {
        if (result) {
          setShowDeadlinesModal(false)
          window.location = `/client/${client.id}`
        }
      } else {
        if (client.deadlines.length === 1) {
          setShowMarkAsDeliveredModal(false)
          setShowDeadlinesModal(true)
        }
      }
    })
    setShowMarkAsDeliveredModal(false)
  }

  const linkState = {
    clientId: client.id,
    clientName: client.company,
    clientEmail: client.email,
    clientNumber: client.phonenumber,
    clientCode: client.bi_code,
    clientDeadlines: client.deadlines,
    clientPeriod: client.payperiod,
  }

  const style = {
    width: '999vw',
    padding: '0rem',
    color: '#495057',
    border: 0,
    boxShadow: 'none'
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

  const MarkAsDeliveredModal = ({ nextDL, showMarkAsDeliveredModal, updateData }) => {
    return (
      <>
        <Form onSubmit={updateData}>
          <Modal show={showMarkAsDeliveredModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header>
              <Modal.Title>Tiedot toimitetuksi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Merkataanko eräpäivän {nextDL} tiedot toimitetuksi? Toimitetut tiedostot siirretään roskakoriin, jossa ne säilyvät vielä yhden viikon.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => window.location = `/client/${client.id}`}>Peruuta</Button>
              <Button variant="primary" onClick={updateData}>Merkkaa toimitetuksi</Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </>
    )
  }

  const DeadlinesModal = ({ showDeadlinesModal, setShowDeadlinesModal, deadlines, updateData }) => {
    return (
      <>
        <Form onSubmit={updateData}>
          <Modal show={showDeadlinesModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header>
              <Modal.Title>Eräpäivien asetus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                Asiakkaalle ei ole tällä hetkellä merkattuna uusia eräpäiviä. Voit lisätä asiakkaalle uusia eräpäiviä alta.
              </div>
              <div>
                Asiakkaan palkkakausi: {client.payperiod}
              </div>
              <Form.Group>
                <div className="form-control">
                  <DatePicker id="deadlines" {...deadlines} multiple months={months} weekDays={weekDaysSorted} weekStartDayIndex={1}/>
                </div>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeadlinesModal(false)}>Ei nyt</Button>
              <Button variant="primary" onClick={(e) => updateData(e, true)}>Päivitä eräpäivät</Button>
            </Modal.Footer>
          </Modal>
        </Form>
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
        handleFileToTrash={handleFileToTrash}
        deadlines={deadlines}
        updateData={updateData}
        showDeadlinesModal={showDeadlinesModal}
        setShowDeadlinesModal={setShowDeadlinesModal}
        DeadlinesModal={DeadlinesModal}
      />
    </>
  )
}

export default FileHandler
