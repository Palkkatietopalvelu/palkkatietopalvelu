import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import settingsService from '../services/reminderSettings'
import days from './Days'

const ReminderSettings = () => {
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)
  const [settings, setSettings] = useState({ days: [], hour: '' })

  useEffect(() => {
    if (user) {
      settingsService.get().then(settings => {
        setSettings(settings)
      })
    }}, [user])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      <br /><h2 style={{ marginBottom: '20px' }}>Muistutukset</h2>
      <h4 style={{ marginTop: '20px' }}>Asetukset</h4>
      {settings.enabled && <div>
        <p>Muistutukset lähetetään:</p>
        <div>
          <ul>
            {settings.days.map(day =>
              <li key={day}>{days[day]} klo: {settings.hour}:00</li>)}
          </ul>
        </div>
      </div>}
      {!settings.enabled && <div>
        <p>Muistutukset eivät ole käytössä</p>
      </div>}
      <Button onClick={() => navigate('/remindersettingsform')}>Muokkaa</Button>
    </div>
  )
}

export default ReminderSettings