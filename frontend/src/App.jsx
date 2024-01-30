import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Menu from './components/Menu'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const App = () => {
  return (
    <div>
      <h2>Palkkatietopalvelu</h2>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
