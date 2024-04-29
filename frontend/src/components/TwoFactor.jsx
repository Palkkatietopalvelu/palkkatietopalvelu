import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import Togglable from './Togglable'
import { Form, Button } from 'react-bootstrap'
import { useRef } from 'react'

const TwoFactor = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const formRef = useRef()
  const password = useField()
  const verification = useField()

  const handleRemoveSubmit = async (event) => {
    event.preventDefault()
    dispatch(removeTwoFa({

    }))
  }

  const handleEnableSubmit = async (event) => {
    event.preventDefault()
    dispatch(enableTwoFa({

    }))
  }
  
  return (
    <div>
        {!user.two_fa && <div>
          Kaksivaiheinen tunnistautuminen on käytössä
          <Togglable buttonLabel='Poista käytöstä' ref={formRef}>
            <Form onSubmit={handleRemoveSubmit}>
            <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <Form.Control id='password' type='password' {...password} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Todennuskoodi</Form.Label>
                <Form.Control id='totp' {...verification} required />
              </Form.Group> <br />
              <Button id="remove-two-fa" type="submit" variant="primary">Vahvista</Button>
            </Form>
          </Togglable>
        </div>}
        {user.two_fa && <div>
          Kaksivaiheinen tunnistautuminen ei ole käytössä
          <Togglable buttonLabel='Ota käyttöön' ref={formRef}>
            <Form onSubmit={handleEnableSubmit}>
              <Form.Group>
                <Form.Label>Salasana</Form.Label>
                <Form.Control id='password' type='password' {...password} required />
              </Form.Group> <br />
              <Button id="enable-two-fa" type="submit" variant="primary">Vahvista</Button>
            </Form>
          </Togglable>
        </div>}
    </div>
  )
}

export default TwoFactor
