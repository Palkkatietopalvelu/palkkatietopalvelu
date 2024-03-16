import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/resetpassword'
import storage from './storage'

const resetpassword = async email => {
  const response = await axios.post(baseUrl, email, { headers: storage.setHeaders() })
  return response.data
}

export default { resetpassword }