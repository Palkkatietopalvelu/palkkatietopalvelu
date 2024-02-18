import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import settingsService from '../services/reminderSettings'

const ReminderSettings = () => {
  const [settings, setSettings] = useState({ days: [], hour: '' })

  useEffect(() => {
    settingsService.get().then(settings => {
      setSettings(settings)
    })
  }, [])

  if (settings.enabled === false) {
    return(
      <div>
        <p>Muistutukset eivät ole käytössä</p>
        <Link to={'/remindersettingsform'}>Muokkaa</Link>
      </div>
    )
  }
  return (
    <div>
      <p>Muistutukset lähetetään:</p>
      <div>
        {settings.days.map((day) => <>{day} </>)}
      </div>
      <div>
          kello:
        {settings.hour}
      </div>
      <Link to={'/remindersettingsform'}>Muokkaa</Link>
    </div>
  )
}

export default ReminderSettings