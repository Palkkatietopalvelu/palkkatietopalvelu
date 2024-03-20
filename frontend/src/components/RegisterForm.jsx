// ./register (Luo uusi käyttäjä)
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { registerUser } from '../reducers/userReducer'
import Notification from '../components/Notification'
import { Form, Button } from 'react-bootstrap'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const username = useField()
  const password = useField()
  const user = useSelector(({ user }) => user)

  const handleRegistration = async (event) => {
    event.preventDefault()
    dispatch(registerUser({
      username: username.value,
      password: password.value,
      role: 1
    })).then(result => {
      if (result) {
        resetFields(event)
      }
    })
  }

  const resetFields = (event) => {
    event.preventDefault()
    username.onReset()
    password.onReset()
  }

  return (
    <div><br />
      {!user && <div>
        <h2>Luo uusi käyttäjä</h2>
        <Notification />
        <Form onSubmit={handleRegistration}>
          <Form.Group>
            <Form.Label>Sähköposti</Form.Label>
            <Form.Control id='username' type='text' {...username} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Salasana</Form.Label>
            <Form.Control id='password' type='password' {...password} required />
          </Form.Group> <br />
          <Button id='create' type="submit" variant="primary">Luo käyttäjä</Button>
        </Form>
      </div>}
    </div>
  )
}

export default RegisterForm
