// automaattimuistutus asetuksien haku ja muutos; backend/src/controllers/reminders.py
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/reminders'
import storage from './storage'

// muuta automaattimuistutusasetuksia
const send = async object => {
  const response = await axios.post(baseUrl, object, { headers: storage.setHeaders() })
  return response.data
}

// hae automaattimuistutusasetukset
const get = async () => {
  const response = await axios.get(baseUrl, { headers: storage.setHeaders() })
  return response.data
}

export default { send, get }