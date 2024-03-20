// ./setpassword/{user.password.hashed} (Aseta uusi salasana, vain asiakkaille)
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { setClientPassword, validateToken, logoutUser } from '../reducers/userReducer'
import Notification from './Notification'
import { Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const SetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = useField()
  const confirmPassword = useField()
  const token = useParams().token
  const [valid, setValid] = useState(false)

  useEffect(() => {
    dispatch(logoutUser())
    dispatch(validateToken(token)).then(result => {
      setValid(result)
    })}, [token, dispatch, valid])


  const handleSetPassword = async (event) => {
    event.preventDefault()
    dispatch(setClientPassword({
      token: token,
      password: password.value,
      confirmPassword: confirmPassword.value })).then(result => {
      if (result) {
        resetFields(event)
        navigate('/login')
      }
    })
  }
  const resetFields = () => {
    password.onReset()
    confirmPassword.onReset()
  }
  return (
    <div>
      {valid &&
      <div><br/>
        <h2>Aseta uusi salasana</h2>
        <Notification />
        <Form onSubmit={handleSetPassword}>
          <Form.Group>
            <Form.Label>Salasana</Form.Label>
            <Form.Control id='password' type='password' {...password} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Salasana uudelleen</Form.Label>
            <Form.Control id='confirmPassword' type='password' {...confirmPassword} required />
          </Form.Group><br/>
          <Button id="setpassword" type="submit" variant="primary">Aseta salasana</Button>
        </Form>
      </div>
      }
      {!valid &&
      <div> Token on vanhentunut tai väärä </div>
      }
    </div>
  )
}

export default SetPassword