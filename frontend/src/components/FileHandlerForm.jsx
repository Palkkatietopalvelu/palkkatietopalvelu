// FileHandlerForm -alanäkymä (Yläpuolella FileHandler.jsx)
import { Link } from 'react-router-dom'
import { Button, Form, Table } from 'react-bootstrap'
import { format } from 'date-fns'
import filesImport from '../services/files.js'


const FileHandlerForm = ({
  nextDL,
  user,
  setShowMarkAsDeliveredModal,
  handleFileSubmit,
  client,
  linkState,
  files,
  handleFileDownload,
  setShowModal,
  setVaryingFileName,
  setVaryingFileId,
  showMarkAsDeliveredModal,
  handleFileToTrash,
  varyingFileId,
  varyingFileName,
  showModal,
  fileInputRef,
  FileToTrashModal,
  MarkAsDeliveredModal,
  deadlines,
  updateData,
  showDeadlinesModal,
  setShowDeadlinesModal,
  DeadlinesModal,
}) => {
  return (
    <div>
      <br></br>
      <h4>
        {nextDL && (
          <>
            Eräpäivän {nextDL} palkkatiedot
            {user.role === 1 && (
              <Button
                variant="info"
                size="sm"
                style={{ marginLeft: '20px' }}
                onClick={() => setShowMarkAsDeliveredModal(true)}>
                Merkitse palkkatiedot toimitetuksi
              </Button>
            )}
          </>
        )}
      </h4>
      {user.role === 2 &&
        <div>
          <Form>
            <Form.Group controlId="file-upload">
              <Form.Control
                type="file"
                onChange={handleFileSubmit}
                ref={fileInputRef}
              />
            </Form.Group>
          </Form>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            Voit myös täyttää palkkatiedot lomakkeelle <Link to={`/client/${client.id}/salaryform`} state={linkState}>täällä</Link>
          </div>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            Tai ladata .csv-dokumenttipohjan palkkatiedoille <a href="#" onClick={async () => {
              const data = await filesImport.downloadTemplateCSV()
              const url = window.URL.createObjectURL(new Blob([data]))
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', 'template.csv')
              document.body.appendChild(link)
              link.click()
              link.parentNode.removeChild(link)
            }}>täältä</a>
          </div>
        </div>
      }
      <div>
        {files.length > 0 ? (
          <Table striped>
            <thead>
              <tr>
                <th></th>
                <th>Tiedoston nimi</th>
                <th>Päivämäärä</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => {
                return (
                  <tr key={file.id}>
                    <td style={{ textAlign:'right', width: '10%' }}><Button variant="primary" size="sm" onClick={() =>
                      handleFileDownload(file.id, file.name)}>Lataa</Button>{' '}
                    <Button id={file.id} variant="danger" size="sm" onClick={() =>
                    {setShowModal(true), setVaryingFileName(file.name), setVaryingFileId(file.id)}}>Poista</Button></td>
                    <td style={{ width: '50%' }}>{file.name}</td>
                    <td style={{ width: '50%' }}>{format(new Date(file.date), 'yyyy-MM-dd HH:mm')}{' '}</td>
                  </tr>
                )})}
            </tbody>
            <FileToTrashModal varyingFileId={varyingFileId} varyingFileName={varyingFileName} handleFileToTrash={handleFileToTrash}
              showModal={showModal} setShowModal={setShowModal} />
          </Table>
        ) : (
          nextDL && (
            <div>Palkkatietoja ei ole vielä ilmoitettu</div>
          )
        )}
      </div>
      <MarkAsDeliveredModal
        nextDL={nextDL}
        showMarkAsDeliveredModal={showMarkAsDeliveredModal}
        updateData={updateData}
      />
      <DeadlinesModal
        showDeadlinesModal={showDeadlinesModal}
        setShowDeadlinesModal={setShowDeadlinesModal}
        deadlines={deadlines}
        updateData={updateData}
      />
    </div>
  )
}

export default FileHandlerForm
