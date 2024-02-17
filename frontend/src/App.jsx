import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from './reducers/userReducer'
import { getClients } from './reducers/clientsReducer'
import ClientForm from './components/ClientForm'
import ClientsList from './components/ClientsList'
import Client from './components/Client'
import UpdateClient from './components/ClientUpdateForm'
import ClientReminder from './components/Mail'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import MyPage from './components/MyPage'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
      .then(user => {
        if (user) {
          dispatch(getClients())
        }
      })
  }, [dispatch])

  return (
    <div className="container">
      <Router>
        <Menu/>
        <Routes>
          <Route path="/" element={<ClientsList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/client" element={<ClientForm />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/client/:id/update" element={<UpdateClient />} />
          <Route path="/reminders" element={<ClientReminder />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App