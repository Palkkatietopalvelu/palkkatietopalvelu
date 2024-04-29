import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import clientsReducer from './reducers/clientsReducer'
import fileReducer from './reducers/fileReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    clients: clientsReducer,
    files: fileReducer
  }
})

export default store