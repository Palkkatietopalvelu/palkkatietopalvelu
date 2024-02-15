import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { useField } from '../hooks'
import Togglable from './Togglable'
import { changePassword } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const PasswordChange = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const formRef = useRef()
  const oldPassword = useField()
  const newPassword = useField()
  const confirmPassword = useField()

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(changePassword({
      user_id: user.id,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value })).then(result => {
      if (result) {
        formRef.current.toggleVisibility()
        resetFields(event)
      }
    })
  }

  const resetFields = () => {
    oldPassword.onReset()
    newPassword.onReset()
    confirmPassword.onReset()
  }

  return (
    <div>
      <Togglable buttonLabel='Vaihda salasana' ref={formRef}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>nykyinen salasana</Form.Label>
            <Form.Control id='oldPassword' type='password' {...oldPassword} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>uusi salasana</Form.Label>
            <Form.Control id='newPassword' type='password' {...newPassword} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>uusi salasana uudelleen</Form.Label>
            <Form.Control id='confirmPassword' type='password' {...confirmPassword} required />
          </Form.Group>
          <Button type="submit" variant="primary">vaihda</Button>
        </Form>
      </Togglable>
    </div>
  )
}

export default PasswordChange
