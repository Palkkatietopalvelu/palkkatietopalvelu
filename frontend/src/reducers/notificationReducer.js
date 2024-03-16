import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // set and clear are unused I think
    set(state, action) {
      return action.payload
    },
    clear() {
      return initialState
    },
    add(state, action) {
      console.log(action.payload)
      return state.concat(action.payload)
    },
    remove(state) {
      return state.slice(1)
    }
  },
})

export const notify = (content, type='success') => {
  return async dispatch => {
    dispatch(add({ content, type }))
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
  }
}

export const { set, clear, add, remove } = slice.actions
export default slice.reducer