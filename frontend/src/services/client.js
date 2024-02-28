import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/client'
import storage from './storage'

const add = async object => {
  const response = await axios.post(baseUrl, object, { headers: storage.setHeaders() })
  return response.data
}

const get = async id => {
  const response = await axios.get(`${baseUrl}/${id}`, { headers: storage.setHeaders() })
  return response.data
}

const update = async object => {
  const response = await axios.post(`${baseUrl}/${object.id}`, object, { headers: storage.setHeaders() })
  return response.data
}

const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`, { headers: storage.setHeaders() })
}

export default { add, get, update, remove }
