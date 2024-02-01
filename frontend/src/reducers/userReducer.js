import { createSlice } from '@reduxjs/toolkit'

import userService from '../services/user'
import loginService from '../services/login'
import storageService from '../services/storage'
import { notify } from './notificationReducer'

const initialState = null

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return initialState
    }
  },
})

export const { set, clear } = slice.actions

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      storageService.saveUser(user)
      dispatch(set(user))
      return true
    } catch (e) {
      dispatch(notify('Väärä käyttäjätunnus tai salasana'))
      return false
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const user = storageService.loadUser()
    dispatch(set(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(clear())
  }
}

export const registerUser = (credentials) => {
  return async dispatch => {
    try {
      await userService.create(credentials)
      dispatch(notify('Käyttäjä luotu onnistuneesti'))
    } catch (e) {
      dispatch(notify(e.response?.data?.error || 'Virhe käyttäjän luonnissa'))
    }
  }
}

export default slice.reducer