import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import ClientForm from './components/ClientForm'
import ClientsList from './components/ClientsList'
import Client from './components/Client'
import Menu from './components/Menu'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const App = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <h2>Palkkatietopalvelu</h2>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<ClientsList />} />
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/client" element={<ClientForm />} />
          <Route path="/client/:id" element={<Client />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
