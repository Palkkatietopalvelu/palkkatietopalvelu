import { createSlice } from '@reduxjs/toolkit'
import fileService from '../services/files'
import { notify } from './notificationReducer'

const slice = createSlice({
  name: 'files',
  initialState: [],
  reducers: {
    set(state, { payload }) {
      return payload
    },
    add(state, { payload }) {
      return state.concat(payload)
    },
    remove(state, { payload }) {
      return state.filter(c => c.id !== payload)
    }
  }
})

export const { set, add, remove } = slice.actions

export const getFile = () => {
  return async dispatch => {
    const files = await fileService.get()
    dispatch(set(files))
  }
}

export const addFile = (file) => {
  return async dispatch => {
    try {
      const data = await fileService.add(file)
      dispatch(add(data))
      dispatch(notify('Tiedosto lisätty onnistuneesti'))
      dispatch(getFile())
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe'))
      return false
    }
  }
}

export const downloadFile = (id, fileName) => {
  return async (dispatch) => {
    try {
      const blob = await fileService.download(id)
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download document failed:', error)
      dispatch(notify('Tiedoston lataus epäonnistui'))
    }
  }
}

export const moveFileToTrash = (file) => {
  return async dispatch => {
    try {
      await fileService.move_to_trash(file.id)
      dispatch(remove(file.id))
      dispatch(notify('Tiedosto siirretty roskakoriin'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe'))
      return false
    }
  }
}

export const restoreFile = (file) => {
  return async dispatch => {
    try {
      await fileService.restore(file.id)
      dispatch(remove(file.id))
      dispatch(notify('Tiedosto palautettu onnistuneesti'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe'))
      return false
    }
  }
}

export const deleteFile = (file) => {
  return async dispatch => {
    try {
      await fileService.remove(file.id)
      dispatch(remove(file.id))
      dispatch(notify('Tiedosto poistettu onnistuneesti'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe'))
      return false
    }
  }
}

export default slice.reducer