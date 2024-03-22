// ./remindersettingsform (Automaattiset muistutukset, asetussivu)
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import settingsService from '../services/reminderSettings'
import reminderInfoModule from './ReminderInfo'
import ReminderFormFields from './ReminderSettingsFormFields'

const { weekDays, relativeDays } = reminderInfoModule

const ReminderSettingsForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const [hour, setHour] = useState('')
  const [checked, setChecked] = useState(false)
  const [days, setDays] = useState('')
  const [deltas, setDeltas] = useState([])
  const [emailinputs, setEmailinputs] = useState(false)
  const [smsinputs, setSmsinputs] = useState(false)
  const [remindertext, setRemindertext] = useState('')

  useEffect(() => {
    if (user) {
      settingsService.get().then(settings => {
        setHour(settings.hour)
        setChecked(settings.enabled)
        setDays(settings.days.split(',').map(day => `day-${day}`))
        setDeltas(settings.deltas.map(delta => `delta-${delta}`))
        setEmailinputs(settings.email === 'True' || settings.email === true)
        setSmsinputs(settings.sms === 'True' || settings.sms === true)
        setRemindertext(settings.remindertext)
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
    const parsedHour = parseInt(hour, 10)
    if (isNaN(parsedHour) || parsedHour < 0 || parsedHour > 23) {
      dispatch(notify('Tuntiarvon tulee olla numero välillä 0-23', 'error'))
      return
    }
    try {
      const formattedDays = days.map(day => day.replace('day-', '')).join(',')
      const formattedDeltas = deltas.map(delta => parseInt(delta.replace('delta-', ''), 10))
      const settingsToSave = {
        days: formattedDays,
        hour: String(parsedHour),
        enabled: checked,
        deltas: formattedDeltas,
        email: emailinputs,
        sms: smsinputs,
        remindertext: remindertext
      }
      const response = await settingsService.send(settingsToSave)
      dispatch(notify('Asetukset tallennettu'))
    } catch(e) {
      console.error(e)
      dispatch(notify(e.response?.data || 'Tapahtui virhe, yritä uudelleen', 'danger'))
    }
  }

  return (
    <div>
      {user.role === 1 && (
        <div>
          <ReminderFormFields
            user={user}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            checked={checked}
            emailinputs={emailinputs}
            setEmailinputs={setEmailinputs}
            smsinputs={smsinputs}
            setSmsinputs={setSmsinputs}
            remindertext={remindertext}
            setRemindertext={setRemindertext}
            days={days}
            setDays={setDays}
            weekDays={weekDays}
            hour={hour}
            setHour={setHour}
            deltas={deltas}
            setDeltas={setDeltas}
            relativeDays={relativeDays}
          />
        </div>
      )}
    </div>
  )
}

export default ReminderSettingsForm