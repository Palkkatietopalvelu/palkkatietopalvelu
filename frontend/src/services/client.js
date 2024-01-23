import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/client'

const add = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { add }
