import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL+'/api/files'
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

const downloadTemplateCSV = async () => {
  const response = await axios.get(`${baseUrl}/template.csv`, {
    headers: storage.setHeaders(),
    responseType: 'blob',
  })
  return response.data
}

const move_to_trash = async id => {
  await axios.post(`${baseUrl}/${id}`, null, { headers: storage.setHeaders() })
}

const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`, { headers: storage.setHeaders() })
}

export default { get, add, download, downloadTemplateCSV, move_to_trash, remove }
