// manuaalisten sähköpostiviestien lähetys ja eräpäivien hakeminen; backend/src/controllers/manual_reminders.py
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/mail'
import storage from './storage'


const send = async object => {
  const response = await axios.post(baseUrl, object, { headers: storage.setHeaders() })
  return response.data
}

const get = async () => {
  const response = await axios.get(baseUrl, { headers: storage.setHeaders() })
  return response.data
}

export default { send, get }