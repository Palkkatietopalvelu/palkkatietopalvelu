import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/sms'
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