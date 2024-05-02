// hae kaikkien asiakkaiden tiedot; backend/src/controllers/clients.py
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/clients'
import storage from './storage'

const get = async () => {
  const response = await axios.get(baseUrl, { headers: storage.setHeaders() })
  return response.data
}

export default { get }
