import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import { notify } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import CheckBox from './CheckBox'
import settingsService from '../services/reminderSettings'
import { useField } from '../hooks/index'
import Switch from 'react-switch'
import daysModule from './Days'

const { weekDays, relativeDays } = daysModule

const ReminderSettingsForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const hour = useField('')
  const [checked, setChecked] = useState(false)
  const [days, setDays] = useState('')
  const [deltas, setDeltas] = useState([])

  useEffect(() => {
    if (user) {
      settingsService.get().then(settings => {
        setChecked(settings.enabled)
        setDays(settings.days.split(',').map(day => `day-${day}`))
        setDeltas(settings.deltas.map(delta => `delta-${delta}`))
      })
    }}, [user])

  const handleChange = nextChecked => {
    setChecked(nextChecked)
  }

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formattedDays = days.map(day => day.replace('day-', '')).join(',')
      const formattedDeltas = deltas.map(delta => parseInt(delta.replace('delta-', ''), 10))
      const settingsToSave = {
        days: formattedDays,
        hour: hour.value,
        enabled: checked,
        deltas: formattedDeltas,
      }
      const response = await settingsService.send(settingsToSave)
      dispatch(notify('Asetukset tallennettu'))
    } catch(e) {
      console.error(e)
      dispatch(notify(e.response?.data || 'Tapahtui virhe, yritä uudelleen', 'error'))
    }
  }

  const half = Math.ceil(relativeDays.length / 2)
  const firstHalf = relativeDays.slice(0, half)
  const secondHalf = relativeDays.slice(half)

  return (
    <div>
      {user.role === 1 && <div>
        <br /><h2>Automaattiset muistutukset</h2>
        <Notification />
        <div className="switch">
          <p>Automaattiset muistutukset <span>{checked ? 'käytössä' : 'pois käytöstä'}</span>.</p>
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
            {weekDays.map((day, index) => (
              <div key={`day-${index}`}>
                <CheckBox
                  name={`day-${index}`}
                  inputs={days}
                  setInputs={setDays}
                  checked={days.includes(`day-${index}`)}
                />
                {' '}{day}
                <br />
              </div>
            ))}
            <Form.Label style={{ marginTop: '20px' }}>Kellonaika (tasatunti 0-23)</Form.Label>
            <Form.Control id='hour' placeholder='14' {...hour} required = {checked}/>
            <Form.Label style={{ marginTop: '20px' }}>
            Valitse, milloin muistutukset lähetetään suhteessa eräpäivään.
            </Form.Label>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <div>
                {firstHalf.map((day, index) => (
                  <div key={`first-${index}`}>
                    <CheckBox
                      name={`delta-${index}`}
                      inputs={deltas}
                      setInputs={setDeltas}
                      checked={deltas.includes(`delta-${index}`)}
                    />
                    {' '}{day}
                    <br />
                  </div>
                ))}
              </div>
              <div>
                {secondHalf.map((day, index) => (
                  <div key={`second-${index}`}>
                    <CheckBox
                      name={`delta-${index + half}`}
                      inputs={deltas}
                      setInputs={setDeltas}
                      checked={deltas.includes(`delta-${index + half}`)}
                    />
                    {' '}{day}
                    <br />
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" style={{ marginTop: '20px' }}>Tallenna</Button>
          </Form.Group>
        </Form>
      </div>}
    </div>
  )
}

export default ReminderSettingsForm