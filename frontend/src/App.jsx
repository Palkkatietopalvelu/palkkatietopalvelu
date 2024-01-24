import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import ClientForm from './components/ClientForm'
import ClientsList from './components/ClientsList'
import Client from './components/Client'
import storageService from './services/storage'
import Menu from './components/Menu'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import AddClient from './components/AddClient'
import ClientForm from './components/ClientForm'
import ClientsList from './components/ClientsList'
import Client from './components/Client'

const App = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <div>
    <h2>Palkkatietopalvelu</h2>
    <Menu user={user}/>
    <Router>
      <div>
        <Link style={padding} to="/add">add client</Link>
        <Link style={padding} to="/clients">clients</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<ClientsList />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/add" element={<ClientForm />} />
        <Route path="/client/:id" element={<Client />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
