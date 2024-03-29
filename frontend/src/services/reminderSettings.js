import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/reminders'
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