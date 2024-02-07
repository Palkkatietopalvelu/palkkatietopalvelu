import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/clients'
import storage from './storage'

const get = async () => {
  const response = await axios.get(baseUrl, { headers: storage.setHeaders() })
  return response.data
}

export default { get }
