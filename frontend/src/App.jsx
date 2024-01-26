import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import ClientForm from './components/ClientForm'
import ClientsList from './components/ClientsList'
import Client from './components/Client'
import Mail from './components/mail'

const App = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/mail">mail</Link>
      </div>
        <Routes>
<<<<<<< HEAD
          <Route path="/home" element={<ClientsList />} />
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/add" element={<ClientForm />} />
          <Route path="/client/:id" element={<Client />} />
=======
>>>>>>> a06c215 (Initial front for sending e-mails)
          <Route path="/mail" element={<Mail />} />
        </Routes>
    </Router>
  )
}

export default App