import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import Togglable from './Togglable'
import { Form, Button } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { enableTwoFactor, confirmTwoFactor, disableTwoFactor } from '../reducers/userReducer'
import QRCode from 'react-qr-code'

const TwoFactor = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const formRef = useRef()
  const password = useField()
  const verification = useField()
  const token = useField()
  const [uri, setUri] = useState('')

  const handleDisableSubmit = async (event) => {
    event.preventDefault()
    dispatch(disableTwoFactor({
      user_id: user.id,
      password: password.value,
      code: verification.value })).then(result => {
      if (result) {
        password.onReset()
        token.onReset()
      }
    })
  }

  const handleEnableSubmit = async (event) => {
    event.preventDefault()
    dispatch(enableTwoFactor({
      user_id: user.id,
      password: password.value })).then(result => {
      if (result) {
        setUri(result)
        formRef.current.toggleVisibility()
        password.onReset()
      }
    })
  }

  const handleConfirmTwoFactor = async (event) => {
    event.preventDefault()
    dispatch(confirmTwoFactor({
      user_id: user.id,
      code: token.value })).then(result => {
      if (result) {
        setUri('')
        token.onReset()
      }
    })
  }

  return (
    <div>
      {uri && <div style={{ background: 'white', padding: '16px' }}>
        <Form onSubmit={handleConfirmTwoFactor}>
          <Form.Group>
            <p>Skannaa koodi valitsemassasi todennussovelluksessa (esim google authenticator), ja viimeistele käyttöönotto syöttämällä vahvistuskoodi</p>
            <QRCode value={uri}/><br />
            <Form.Label style={{ marginTop: '20px' }}>vahvistuskoodi</Form.Label>
            <Form.Control id='verificationcode' {...token} required /> <br />
            <Button id="confirm-two-fa" type='submit' variant='primary'>Vahvista</Button>
            <Button id="cancel" variant='secondary' onClick={() => setUri('')}>Peruuta</Button>
          </Form.Group>
        </Form>
      </div>}
      {user.two_fa && <div>
          Kaksivaiheinen tunnistautuminen on käytössä
        <Togglable buttonLabel='Poista käytöstä' ref={formRef}>
          <Form onSubmit={handleDisableSubmit}>
            <Form.Group>
              <Form.Label>Salasana</Form.Label>
              <Form.Control id='passwordconfirmation' type='password' {...password} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Todennuskoodi</Form.Label>
              <Form.Control id='totp' {...verification} required />
            </Form.Group> <br />
            <Button id="remove-two-fa" type="submit" variant="primary">Vahvista</Button>
          </Form>
        </Togglable>
      </div>}
      {!user.two_fa && !uri && <div>
          Kaksivaiheinen tunnistautuminen ei ole käytössä
        <Togglable buttonLabel='Ota käyttöön' ref={formRef}>
          <Form onSubmit={handleEnableSubmit}>
            <Form.Group>
              <Form.Label>Salasana</Form.Label>
              <Form.Control id='passwordconfirmation' type='password' {...password} required />
            </Form.Group> <br />
            <Button id="confirm-password" type="submit" variant="primary">Vahvista</Button>
          </Form>
        </Togglable>
      </div>}
    </div>
  )
}

export default TwoFactor
