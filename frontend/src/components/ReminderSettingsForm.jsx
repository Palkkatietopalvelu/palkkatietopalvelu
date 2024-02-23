import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import { notify } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import CheckBox from './CheckBox'
import settingsService from '../services/reminderSettings'
import { useField } from '../hooks/index'
import Switch from 'react-switch'

const ReminderSettingsForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [inputs, setInputs] = useState([])
  const hour = useField()
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (user) {
      settingsService.get().then(settings => {
        setChecked(settings.enabled)
      })
    }}, [user])

  const handleChange = nextChecked => {
    setChecked(nextChecked);
  };

  const days = [
    'ma',
    'ti',
    'ke',
    'to',
    'pe',
    'la',
    'su'
  ]

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    settingsService.send([inputs, hour, checked])
    dispatch(notify('Asetukset tallennettu'))
  }

  return (
    <div>
      <br /><h2>Muistutusasetukset</h2>
      <Notification />
      <div className="switch">
      <p>Muistutukset <span>{checked ? "käytössä" : "ei käytössä"}</span>.</p>
      <label>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
        />
      </label>
    </div>
      <br /><p>Muistutuspäivät</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          {days.map((day, index) => (
            <div key={index}>
              <CheckBox name={index}
                inputs={inputs}
                setInputs={setInputs}
              />
              {' '}{day}
              <br />
            </div>
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