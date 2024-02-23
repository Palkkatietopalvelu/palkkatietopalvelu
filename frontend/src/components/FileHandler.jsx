import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { addFile, deleteFile, downloadFile } from '../reducers/fileReducer'
import { Button, Form } from 'react-bootstrap'
import { format } from 'date-fns'

const FileHandler = ({ client, files }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

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

  const handleFileDownload = (fileId, fileName) => {
    dispatch(downloadFile(fileId, fileName))
  }

  const handleFileDelete = (fileId, fileName) => {
    if (window.confirm(`Haluatko varmasti poistaa tiedoston ${fileName}?`)) {
      dispatch(deleteFile({ id: fileId })).then(result => {
        if (result) {
          navigate(`/client/${client.id}`)
        }
      })
    }
  }

  return (
    <div><br />
      <Form>
        <Form.Group controlId="file-upload">
          <Form.Label><h4>Lataa tiedosto</h4></Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileSubmit}
            ref={fileInputRef}
          />
        </Form.Group>
      </Form>
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        Tai täytä palkkatiedot lomakkeelle <Link to={`/client/${client.id}/salaryform`}>täällä</Link>
      </div>
      <br /><h4>Ladatut tiedostot</h4>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name}, {format(new Date(file.date), 'yyyy-MM-dd HH:mm')}{' '}
            <Button variant="primary" size="sm" onClick={() => handleFileDownload(file.id, file.name)}>Download</Button>
            {' '}
            <Button id={file.id} variant="danger" size="sm" onClick={() => handleFileDelete(file.id, file.name)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FileHandler
