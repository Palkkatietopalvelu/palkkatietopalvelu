import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/reminders'

const send = async object => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

const get = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { send, get }