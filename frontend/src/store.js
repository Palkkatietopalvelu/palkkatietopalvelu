import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import clientsReducer from './reducers/clientsReducer'
import pdfReducer from './reducers/pdfReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    clients: clientsReducer,
    pdf: pdfReducer
  }
})

export default store