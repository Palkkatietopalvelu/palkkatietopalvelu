// ./client/{client.id}/update (Asiakkaan tietojen muuttaminen)
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Notification from './Notification'
import { updateClient, deleteClient, updateStatus } from '../reducers/clientsReducer'
import { Form, Button } from 'react-bootstrap'
import { useField } from '../hooks'
import DatePicker from 'react-multi-date-picker'
import { DateSelect } from '../hooks/DatePicker'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import days from './ReminderInfo'

const { weekDays, months } = days
const weekDaysSorted = weekDays.slice(6).concat(weekDays.slice(0, 6))

const UpdateClient = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)

  const company = useField(client ? client.company : '')
  const email = useField(client ? client.email : '')
  const phonenumber = useField(client ? client.phonenumber : '')
  const bicode = useField(client ? client.bi_code : '')
  const deadlines = DateSelect(client ? client.deadlines.map(deadline => new Date(deadline).getTime()) : new Date())
  const payperiod = useField(client ? client.payperiod : '')

  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  const updateData = (event) => {
    event.preventDefault()
    const clientObject = {
      id: id,
      user_id: user.id,
      company: company.value,
      email: email.value,
      phonenumber: phonenumber.value,
      bi_code: bicode.value,
      deadlines: JSON.stringify(deadlines.value),
      payperiod: payperiod.value,
    }
    dispatch(updateClient(clientObject)).then(result => {
      if (result) {
        navigate(`/client/${client.id}`)
      }
    })
  }

  const statusUpdate = () => {
    /* Here you can set the client's status to either active or inactive.
    If the status is currently active, we set it to false, and vice versa. */
    dispatch(updateStatus({ id, status: client.active ? false : true }))
    setShowModal(false)
  }

  const handleDeleteClient = () => {
    dispatch(deleteClient(client)).then(result => {
      if (result) {
        navigate('/')
      }
    })
    setShowModal(false)
  }

  const style = {
    width: '90vw',
    padding: '0rem',
    color: '#495057',
    border: 0,
    boxShadow: 'none'
  }

  return (
    <div>
      {user.role === 1 && <div><br />
        <Button variant="secondary" onClick={() => navigate(`/client/${id}`)}
          style={{ marginBottom: '20px' }}>
          Takaisin asiakkaan tietoihin</Button>
        <Notification />
        <h2>{client.company}:n tietojen muuttaminen</h2>
        <Form onSubmit={updateData}>
          <Form.Group>
            <Form.Label>Yritys</Form.Label>
            <Form.Control id='company' {...company} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sähköposti</Form.Label>
            <Form.Control id='email' {...email} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Puhelinnumero</Form.Label>
            <Form.Control id='phonenumber' {...phonenumber} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Y-tunnus</Form.Label>
            <Form.Control id='bicode' {...bicode} required/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Eräpäivät</Form.Label>
            <div className="form-control">
              <DatePicker id="deadlines" {...deadlines} style={style} multiple months={months} weekDays={weekDaysSorted} weekStartDayIndex={1}/>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Palkkakausi</Form.Label>
            <Form.Control id='payperiod' {...payperiod} required style={{ marginBottom: '20px' }} />
          </Form.Group>
          <Button variant="primary" onClick={updateData} style={{ marginRight: '10px' }}>Tallenna tiedot</Button>
          <DeleteClientModal client={client} handleDeleteClient={handleDeleteClient}
            showModal={showModal} setShowModal={setShowModal} />
          <DeactivateModal client={client} statusUpdate={statusUpdate}
            showModal={showModal} setShowModal={setShowModal} />
        </Form>
      </div>}
      <br />
    </div>
  )
}

const DeleteClientModal = ({ client, handleDeleteClient, showModal, setShowModal }) => {
  return (
    <>
      <Button variant="danger" onClick={() => setShowModal('delete')}>Poista asiakas</Button>
      {showModal == 'delete' && <span>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Asiakkaan poistaminen</Modal.Title>
          </Modal.Header>
          <Modal.Body>Haluatko varmasti poistaa asiakkaan {client.company}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Peruuta</Button>
            <Button variant="danger" onClick={handleDeleteClient}>Poista</Button>
          </Modal.Footer>
        </Modal>
      </span>}

    </>
  )
}

const DeactivateModal = ({ client, statusUpdate, showModal, setShowModal }) => {
  return (
    <>
      <Button variant={client.active ? 'warning' : 'success'} onClick={() => setShowModal('deactivate')}
        style={{ marginLeft: '10px' }}>{client.active ? 'Deaktivoi asiakas' : 'Aktivoi asiakas'}</Button>
      {showModal == 'deactivate' && <span>
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          {client.active ? <div>
            <Modal.Header closeButton>
              <Modal.Title>Asiakkaan deaktivoiminen</Modal.Title>
            </Modal.Header>
            <Modal.Body>Haluatko varmasti deaktivoida asiakkaan {client.company}?<br />
              Deaktivoiminen nollaa asiakkaan eräpäivätiedot, asiakkaalle ei lähetetä eräpäivämuistutuksia
              ja asiakkaan tunnus jäädytetään. </Modal.Body>
          </div>
            : <div>
              <Modal.Header closeButton>
                <Modal.Title>Asiakkaan aktivoiminen</Modal.Title>
              </Modal.Header>
              <Modal.Body>Haluatko varmasti aktivoida asiakkaan {client.company}?<br />
              Aktivoiminen palauttaa asiakkaan tunnuksen takaisin käyttöön.
              Lisääthän eräpäivätiedot asiakkaalle. </Modal.Body>
            </div>}
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Peruuta</Button>
            <Button variant={client.active ? 'warning' : 'success'} onClick={statusUpdate}
              style={{ marginLeft: '10px' }}>{client.active ? 'Deaktivoi asiakas' : 'Aktivoi asiakas'}</Button>
          </Modal.Footer>
        </Modal>
      </span>}
    </>
  )
}

export default UpdateClient
