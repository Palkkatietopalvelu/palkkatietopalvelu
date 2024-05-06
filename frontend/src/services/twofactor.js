import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/twofactor'
import storage from './storage'

const enableTwoFactor = async object => {
  const id = object.user_id
  const response = await axios.post(`${baseUrl}/enable/${id}`, object, { headers: storage.setHeaders() })
  return response.data
}

const confirmTwoFactor = async object => {
  const id = object.user_id
  const response = await axios.post(`${baseUrl}/confirm/${id}`, object, { headers: storage.setHeaders() })
  return response.data
}

const disableTwoFactor = async object => {
  const id = object.user_id
  const response = await axios.post(`${baseUrl}/disable/${id}`, object, { headers: storage.setHeaders() })
  return response.data
}

export default { enableTwoFactor, confirmTwoFactor, disableTwoFactor }
