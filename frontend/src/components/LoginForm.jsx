// ./login (kirjautuminen)
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { useField } from '../hooks'
import { loginUser, checkTwoFactor } from '../reducers/userReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'
import useCheckLogin from '../hooks/CheckLogin'
import { useState } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useField()
  const password = useField()
  const twoFaToken = useField()
  const [twoFaChecked, setTwoFaChecked] = useState(false)
  const [requireToken, setRequireToken] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!twoFaChecked) {
      dispatch(checkTwoFactor({
        username: username.value,
        password: password.value })).then(result => {
        setTwoFaChecked(true)
        if (!result.two_factor) {
          dispatch(loginUser({
            username: username.value,
            password: password.value }))
          navigate('/')
        }
        else {
          setRequireToken(true)
        }
      })
    }
    else {
      dispatch(loginUser({
        username: username.value,
        password: password.value,
        code: twoFaToken.value })).then(result => {
        if (result) {
          navigate('/')
        }
      })
    }
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
          {requireToken && <div>
            <Form.Group>
              <Form.Label>Todennuskoodi</Form.Label>
              <Form.Control id='two_fa_token' type='text' {...twoFaToken} required />
            </Form.Group> <br />
          </div>}
          <Button id="login" type="submit" variant="primary">Kirjaudu</Button>
        </Form>
        <br/>
        <Link to={'/resetpassword'}>Unohditko salasanasi?</Link>
      </div>}
    </div>
  )
}

export default LoginForm
