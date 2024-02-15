import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/pdfs'
import storage from './storage'

const get = async () => {
  const response = await axios.get(baseUrl, { headers: storage.setHeaders() })
  return response.data
}

const add = async object => {
  const response = await axios.post(baseUrl, object, { headers: storage.setHeaders() })
  return response.data
}

const download = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/download`, {
    headers: storage.setHeaders(),
    responseType: 'blob'
  })
  return response.data
}

const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`, { headers: storage.setHeaders() })
}

export default { get, add, download, remove }
