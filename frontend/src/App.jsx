import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from './reducers/userReducer'
import { getClients } from './reducers/clientsReducer'
import ClientForm from './components/ClientForm'
import Client from './components/Client'
import UpdateClient from './components/ClientUpdateForm'
import ClientReminder from './components/Mail'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import MyPage from './components/MyPage'
import ReminderSettings from './components/ReminderSettings'
import ReminderSettingsForm from './components/ReminderSettingsForm'
import SetPassword from './components/SetPassword'
import HomePage from './components/HomePage'
import SalaryForm from './components/SalaryForm'
import ResetPassword from './components/ResetPassword'
import Trash from './components/Trash'
import InactiveClients from './components/ClientsInactive'

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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/client" element={<ClientForm />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/client/:id/update" element={<UpdateClient />} />
          <Route path="/client/:id/salaryform" element={<SalaryForm />} />
          <Route path="/client/:id/trash" element={<Trash />}/>
          <Route path="/deactivated" element={<InactiveClients />} />
          <Route path="/reminders" element={<ClientReminder />} />
          <Route path="/remindersettings" element={<ReminderSettings />}/>
          <Route path="/remindersettingsform" element={<ReminderSettingsForm />}/>
          <Route path="/setpassword/:token" element={<SetPassword />}/>
          <Route path="/resetpassword" element={<ResetPassword />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App