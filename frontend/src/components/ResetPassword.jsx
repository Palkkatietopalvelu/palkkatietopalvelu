import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { resetClientPassword } from '../reducers/userReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const email = useField()

  const handleResetPassword = async (event) => {
    event.preventDefault()
    dispatch(resetClientPassword({
      email: email.value })).then(result => {
      if (result) {
        resetFields(event)
      }
    })
  }

  const resetFields = () => {
    email.onReset()

  }
  return (
    <div><br/>
      <h2>Unohtunut salasana</h2>
      <p>Täytä sähköpostiosoitteesi, niin lähetämme sinulle ohjeet salasanan vaihtamiseksi.</p>
      <Notification />
      <Form onSubmit={handleResetPassword}>
        <Form.Group>
          <Form.Label>Sähköposti</Form.Label>
          <Form.Control id='email' type='email' {...email} required />
        </Form.Group><br/>
        <Button id="resetpassword" type="submit" variant="primary">Lähetä</Button>
      </Form>
    </div>
  )
}

export default ResetPassword