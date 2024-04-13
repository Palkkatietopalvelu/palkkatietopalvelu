import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/setpassword'
import storage from './storage'

const get = async token => {
  const response = await axios.get(`${baseUrl}/${token}`)
  return response.data
}

const setpassword = async object => {
  const response = await axios.post(`${baseUrl}/${object.token}`, object)
  return response.data
}

export default { get, setpassword }
