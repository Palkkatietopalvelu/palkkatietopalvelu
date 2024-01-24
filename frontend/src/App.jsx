import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import AddClient from './components/AddClient'
import ClientsList from './components/ClientsList'
import Client from './components/Client'

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/add_client">add client</Link>

      </div>

      <Routes>
        <Route path="/home" element={<ClientsList />} />
        <Route path="/add_client" element={<AddClient />} />
        <Route path="/home/client/:id" element={<Client />} />
      </Routes>

    </Router>
  )
}

export default App
