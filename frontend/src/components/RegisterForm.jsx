// ./register (Luo uusi käyttäjä)
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { useField } from '../hooks'
import { registerUser } from '../reducers/userReducer'
import Togglable from './Togglable'
import { Form, Button } from 'react-bootstrap'
import useCheckLogin from '../hooks/CheckLogin'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const username = useField()
  const password = useField()
  const user = useSelector(({ user }) => user)
  const formRef = useRef()

  const handleRegistration = async (event) => {
    event.preventDefault()
    dispatch(registerUser({
      username: username.value,
      password: password.value,
      role: 1
    })).then(result => {
      if (result) {
        formRef.current.toggleVisibility()
        resetFields(event)
      }
    })
  }

  const resetFields = (event) => {
    event.preventDefault()
    username.onReset()
    password.onReset()
  }

  if (!useCheckLogin()) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div><br />
      {user.role === 1 && <div>
        <Togglable buttonLabel='Luo uusi tilitoimistokäyttäjä' ref={formRef} variant={'warning'}>
          <hr/><h3>Luo uusi tilitoimistokäyttäjä</h3>
          <Form onSubmit={handleRegistration} className='better-width'>
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
        </Togglable>
      </div>}
    </div>
  )
}

export default RegisterForm
