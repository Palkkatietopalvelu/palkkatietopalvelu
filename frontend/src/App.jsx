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
import ClientDataChangeForm from './components/ClientDataChangeForm'
import ClientReminder from './components/mail'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

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
    <div>
      <h2>Palkkatietopalvelu</h2>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<ClientsList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/client" element={<ClientForm />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/client/:id/changedata" element={<ClientDataChangeForm />} />
          <Route path="/reminders" element={<ClientReminder />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App