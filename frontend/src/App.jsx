import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import '../assets/style.css'
import { useDispatch } from 'react-redux'
import { getUser } from './reducers/userReducer'
import { getClients } from './reducers/clientsReducer'
import ClientForm from './components/ClientForm'
import Client from './components/Client'
import UpdateClient from './components/ClientUpdateForm'
import ReminderManual from './components/ReminderManual'
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
import Files from './components/Files'
import Instructions from './components/Instructions'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'

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
          <Route path="/addclient" element={<ClientForm />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/client/:id/update" element={<UpdateClient />} />
          <Route path="/client/:id/salaryform" element={<SalaryForm />} />
          <Route path="/client/:id/trash" element={<Trash />}/>
          <Route path="/reminders" element={<ReminderManual />} />
          <Route path="/remindersettings" element={<ReminderSettings />}/>
          <Route path="/remindersettingsform" element={<ReminderSettingsForm />}/>
          <Route path="/setpassword/:token" element={<SetPassword />}/>
          <Route path="/resetpassword" element={<ResetPassword />}/>
          <Route path="/files" element={<Files />}/>
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App