// ./remindersettings (Automaattiset muistutukset)
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import settingsService from '../services/reminderSettings'
import reminderInfoModule from './ReminderInfo'

const { weekDays } = reminderInfoModule

const ReminderSettings = () => {
  const navigate = useNavigate()
  const user = useSelector(({ user }) => user)
  const [settings, setSettings] = useState({ days: '', hour: '' })

  useEffect(() => {
    if (user) {
      settingsService.get().then(fetchedSettings => {
        setSettings({
          ...fetchedSettings,
          days: fetchedSettings.days.split(',').map(day => parseInt(day, 10))
        })
      })
    }
  }, [user])

  if (!user) {
    return ('Et ole kirjautunut sisään')
  }

  return (
    <div>
      {user.role === 1 && <div>
        <br /><h2 style={{ marginBottom: '20px' }}>Automaattiset muistutukset</h2>
        {settings.enabled && <div>
          <p>Muistutukset lähetetään:</p>
          <div>
            <ul>
              {settings.days.map(day =>
                <li key={day}>{weekDays[day]} klo: {settings.hour}:00</li>)}
            </ul>
          </div>
        </div>}
        {!settings.enabled && <div>
          <p>Automaattiset muistutukset eivät ole käytössä</p>
        </div>}
        <Button onClick={() => navigate('/remindersettingsform')}>Muokkaa</Button>
      </div>}
    </div>
  )
}

export default ReminderSettings