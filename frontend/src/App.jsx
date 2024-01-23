import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import AddClient from './components/AddClient'
import ClientsList from './components/ClientsList'

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/add_client">add client</Link>

      </div>

      <Routes>
        <Route path="/all_clients" element={<ClientsList />} />
        <Route path="/add_client" element={<AddClient />} />
      </Routes>

    </Router>
  )
}

export default App
