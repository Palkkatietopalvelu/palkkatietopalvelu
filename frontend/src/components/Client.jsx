import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getPdf, addPdf, deletePdf, downloadPdf } from '../reducers/pdfReducer'
import Notification from './Notification'
import { Table, Button, Form } from 'react-bootstrap'
import { format } from 'date-fns'

const Client = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const user = useSelector(({ user }) => user)
  const id = Number(useParams().id)
  const client = useSelector(({ clients }) => clients).find(c => c.id === id)

  useEffect(() => {
    dispatch(getPdf())
  }, [dispatch, id, user])

  const pdfs = useSelector(({ pdf }) => pdf).filter(c => c.owner === id)

  if (!user) {
    return ('Et ole kirjautunut sisään')
  } else if (!client) {
    return
  }

  const handlePdfSubmit = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload only PDF files.')
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      formData.append('owner', client.id)
      dispatch(addPdf(formData)).then(result => {
        if (result) {
          navigate(`/client/${client.id}`)
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }
      }).catch(error => {
        console.error('Error uploading file:', error)
      })
    }
  }

  const handlePdfDownload = (pdfId) => {
    dispatch(downloadPdf(pdfId))
  }

  const handlePdfDelete = (pdfId, pdfName) => {
    if (window.confirm(`Haluatko varmasti poistaa tiedoston ${pdfName}?`)) {
      dispatch(deletePdf({ id: pdfId })).then(result => {
        if (result) {
          navigate(`/client/${client.id}`)
        }
      })
    }
  }

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>{client.company}</h2>
      <Notification />
      <h4 style={{ marginTop: '20px' }}>Yhteystiedot</h4>
      <Table striped>
        <tbody>
          <tr><td>Sähköposti</td><td>{client.email}</td></tr>
          <tr><td>Puhelinnumero</td><td>{client.phonenumber}</td></tr>
        </tbody>
      </Table>
      <h4>Laskutustiedot</h4>
      <Table striped>
        <tbody>
          <tr><td>Y-tunnus</td><td>{client.bi_code}</td></tr>
          <tr><td>Eräpäivät</td><td>{client.deadlines.map(date => (<div key={date}> {new Date(date).toLocaleString('fi-FI', { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' })} </div>))}</td></tr>
          <tr><td>Palkkakausi</td><td>{client.payperiod}</td></tr>
        </tbody>
      </Table>
      <Link to={`/client/${client.id}/update`}>Muuta asiakkaan tietoja</Link>
      <Form>
        <Form.Group controlId="file-upload">
          <Form.Label>Upload PDF</Form.Label>
          <Form.Control
            type="file"
            onChange={handlePdfSubmit}
            ref={fileInputRef}
          />
        </Form.Group>
      </Form>
      <h4>Uploaded PDFs</h4>
      <ul>
        {pdfs.map((pdf) => (
          <li key={pdf.id}>
            {pdf.name}, {format(new Date(pdf.date), 'yyyy-MM-dd HH:mm')}{' '}
            <Button variant="primary" size="sm" onClick={() => handlePdfDownload(pdf.id)}>Download</Button>
            {' '}
            <Button variant="danger" size="sm" onClick={() => handlePdfDelete(pdf.id, pdf.name)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Client
