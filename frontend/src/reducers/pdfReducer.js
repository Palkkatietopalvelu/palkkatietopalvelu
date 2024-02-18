import { createSlice } from '@reduxjs/toolkit'
import pdfService from '../services/pdfs'
import { notify } from './notificationReducer'

const slice = createSlice({
  name: 'pdfs',
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

export const getPdf = () => {
  return async dispatch => {
    const pdfs = await pdfService.get()
    dispatch(set(pdfs))
  }
}

export const addPdf = (pdf) => {
  return async dispatch => {
    try {
      const data = await pdfService.add(pdf)
      dispatch(add(data))
      dispatch(notify('PDF-tiedosto lisätty onnistuneesti'))
      dispatch(getPdf())
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe'))
      return false
    }
  }
}

export const downloadPdf = (id) => {
  return async (dispatch) => {
    try {
      const blob = await pdfService.download(id)
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'file.pdf')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download PDF failed:', error)
      dispatch(notify('PDF-tiedoston lataus epäonnistui'))
    }
  }
}

export const deletePdf = (pdf) => {
  return async dispatch => {
    try {
      await pdfService.remove(pdf.id)
      dispatch(remove(pdf.id))
      dispatch(notify('PDF-tiedosto poistettu onnistuneesti'))
      return true
    } catch (e) {
      dispatch(notify(e.response?.data || 'Tapahtui virhe'))
      return false
    }
  }
}

export default slice.reducer