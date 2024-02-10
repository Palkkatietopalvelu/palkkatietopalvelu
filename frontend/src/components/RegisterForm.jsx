import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { registerUser } from '../reducers/userReducer'
import Notification from '../components/Notification'
import { Table, Form, Button } from 'react-bootstrap'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useField('text')
  const password = useField('password')
  const user = useSelector(({ user }) => user)

  const handleRegistration = async (event) => {
    event.preventDefault()
    dispatch(registerUser({
      username: username.value,
      password: password.value,
      role: 1
    })).then(result => {
      if (result) {
        navigate('/')
      }
    })
  }

  return (
    <div>
      {!user && <div>
        <h2>Luo uusi käyttäjä</h2>
        <Notification />
        <Form onSubmit={handleRegistration}>
          <Form.Group>
            <Form.Label>käyttäjätunnus</Form.Label>
            <Form.Control id='username' {...username} />
          </Form.Group>
          <Form.Group>
            <Form.Label>salasana</Form.Label>
            <Form.Control id='password' {...password} />
          </Form.Group>
          <Button id='create' type="submit" variant="primary">luo käyttäjä</Button>
        </Form>
      </div>}
    </div>
  )
}

export default RegisterForm
