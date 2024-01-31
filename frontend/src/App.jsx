import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import ClientForm from './components/ClientForm'
import ClientsList from './components/ClientsList'
import Client from './components/Client'
import ClientReminder from './components/mail'

const App = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/add">add client</Link>
        <Link style={padding} to="/clients">clients</Link>
        <Link style={padding} to="/reminders">muistutukset</Link>
      </div>
        <Routes>
          <Route path="/home" element={<ClientsList />} />
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/add" element={<ClientForm />} />
          <Route path="/client/:id" element={<Client />} />
          <Route path="/reminders" element={<ClientReminder />} />
        </Routes>
    </Router>
  )
}

export default App