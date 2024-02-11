import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { loginUser } from '../reducers/userReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)
  const username = useField()
  const password = useField()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({
      username: username.value,
      password: password.value })).then(result => {
      if (result) {
        navigate('/')
      }
    })
  }

  return (
    <div><br />
      {!user && <div>
        <h2>Kirjaudu sisään</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>käyttäjätunnus</Form.Label>
            <Form.Control id='username' type='text' {...username} />
          </Form.Group>
          <Form.Group>
            <Form.Label>salasana</Form.Label>
            <Form.Control id='password' type='password' {...password} />
          </Form.Group>
          <Button id="login" type="submit" variant="primary">kirjaudu</Button>
        </Form>
      </div>}
    </div>
  )
}

export default LoginForm
