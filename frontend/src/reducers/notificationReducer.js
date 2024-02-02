import { createSlice } from '@reduxjs/toolkit'

const initialState = { content: null }

const slice = createSlice({
  name: 'notification',
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

export const notify = (content, type='success') => {
  return async dispatch => {
    dispatch(set({ content, type }))
    setTimeout(() => {
      dispatch(clear())
    }, 5000)
  }
}

export const { set, clear } = slice.actions
export default slice.reducer