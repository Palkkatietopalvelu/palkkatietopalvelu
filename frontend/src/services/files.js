import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/files'
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

const move_to_trash = async id => {
  await axios.post(`${baseUrl}/${id}`, null, { headers: storage.setHeaders() })
}

const restore = async id => {
  await axios.post(`${baseUrl}/${id}/restore`, null, { headers: storage.setHeaders() })
}

const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`, { headers: storage.setHeaders() })
}

export default { get, add, download, move_to_trash, restore, remove }
