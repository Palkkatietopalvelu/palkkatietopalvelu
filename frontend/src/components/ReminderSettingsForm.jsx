import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import { notify } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import CheckBox from './CheckBox'
import settingsService from '../services/reminderSettings'
import { useField } from '../hooks/index'
import Switch from 'react-switch'
import days from './Days'

const ReminderSettingsForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [inputs, setInputs] = useState([])
  const hour = useField()
  const [checked, setChecked] = useState(false)
  const deltas = useField()

  useEffect(() => {
    if (user) {
      settingsService.get().then(settings => {
        setChecked(settings.enabled)
        setInputs(settings.days)
      })
    }}, [user])

  const handleChange = nextChecked => {
    setChecked(nextChecked)
  }

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const data = await settingsService.send([inputs, hour, checked, deltas])
      dispatch(notify('Asetukset tallennettu'))
    } catch(e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe, yritä uudelleen'))
    }
  }

  return (
    <div>
      <br /><h2>Muistutusasetukset</h2>
      <Notification />
      <div className="switch">
        <p>Muistutukset <span>{checked ? 'käytössä' : 'pois käytöstä'}</span>.</p>
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
                checked={inputs.includes(index)}
              />
              {' '}{day}
              <br />
            </div>
          ))}
          <Form.Label>Kellonaika (tasatunti 0-23)</Form.Label>
          <Form.Control id='hour' placeholder='14' {...hour} required/>
          <Form.Label>
            Listaa, milloin muistutukset viimeistään
            lähetetään suhteessa eräpäivään.
          </Form.Label>
          <Form.Control id='deltas' placeholder='3 0 -2' {...deltas} required/>
          <Button type="submit">Tallenna</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ReminderSettingsForm