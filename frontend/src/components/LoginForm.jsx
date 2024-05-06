// ./login (kirjautuminen)
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useField } from '../hooks'
import { loginUser } from '../reducers/userReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'
import useCheckLogin from '../hooks/CheckLogin'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      {!useCheckLogin() && <div>
        <h2>Kirjaudu sisään</h2>
        <Notification />
        <Form onSubmit={handleLogin} className='login-width'>
          <Form.Group>
            <Form.Label>Sähköposti</Form.Label>
            <Form.Control id='username' type='text' {...username} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Salasana</Form.Label>
            <Form.Control id='password' type='password' {...password} required />
          </Form.Group> <br />
          <Button id="login" type="submit" variant="primary">Kirjaudu</Button>
        </Form>
        <br/>
        <Link to={'/resetpassword'}>Unohditko salasanasi?</Link>
      </div>}
    </div>
  )
}

export default LoginForm
