import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/mail'

const add = async object => {
    const response = await axios.post(baseUrl, object)
    return response.data
  }

export default { add }