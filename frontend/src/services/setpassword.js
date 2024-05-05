// Salasanan asettaminen ensi kertaa (asiakastili); backend/src/controllers/users.py
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/setpassword'

const get = async token => {
  const response = await axios.get(`${baseUrl}/${token}`)
  return response.data
}

const setpassword = async object => {
  const response = await axios.post(`${baseUrl}/${object.token}`, object)
  return response.data
}

export default { get, setpassword }
