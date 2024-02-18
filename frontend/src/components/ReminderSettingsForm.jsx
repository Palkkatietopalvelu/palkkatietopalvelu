import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './Notification'
import { notify } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import CheckBox from './CheckBox'
import settingsService from '../services/reminderSettings'
import { useField } from '../hooks/index'

const ReminderSettingsForm = () => {
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState([])
    const hour = useField()
    const days = [
      'ma',
      'ti',
      'ke',
      'to',
      'pe',
      'la',
      'su'
    ]

    const handleSubmit = async (event) => {
      event.preventDefault()
      settingsService.send([inputs, hour])
      dispatch(notify('Asetukset tallennettu'))
    }
      return (
        <div>
          <br /><h2>Muistutusasetukset</h2>
          <Notification />
          <br /><p>Muistutuspäivät</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              {days.map((day, index) => (
                <>
                  <CheckBox name={index}
                    inputs={inputs}
                    setInputs={setInputs}
                  />
                  {' '}{day}
                  <br />
                </>
              ))}
              <Form.Label>Kellonaika (tasatunti)</Form.Label>
              <Form.Control id='hour' placeholder='14' {...hour} />
              <Button type="submit">Tallenna</Button>
            </Form.Group>
          </Form>
        </div>
      )
}

export default ReminderSettingsForm