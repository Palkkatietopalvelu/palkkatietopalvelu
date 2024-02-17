import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPdf, deletePdf, downloadPdf } from '../reducers/pdfReducer'
import { Button, Form } from 'react-bootstrap'
import { format } from 'date-fns'

const PdfHandler = ({ client, pdfs }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

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
    <>
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
    </>
  )
}

export default PdfHandler
