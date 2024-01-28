import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import storageService from './services/storage'
import Menu from './components/Menu'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const App = () => {
  const user = storageService.loadUser()
  return (
    <div>
      <h2>Palkkatietopalvelu</h2>
      <Router>
        <Menu user={user}/>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
