// ./ (admin) ; järjestä asiakkaat
import React from 'react'
import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { isPast } from 'date-fns'

const ClientsOrder = ({
  clients,
  setFilteredCompanies, setSortingCriteria,
  sortedBy, setSortedBy }) => {

  const showInactive = () => {
    setSortingCriteria('company') // alphabetical order
    setSortedBy('Epäaktiiviset')
    setFilteredCompanies(clients.filter(client => !client.active))
  }

  const showLate = () => {
    setSortingCriteria('date') // order by the due date
    setSortedBy('Myöhässä')
    setFilteredCompanies(clients.filter(client =>
      client.deadlines[0] && isPast(client.deadlines[0])))
  }

  const showNotLate = () => {
    setSortingCriteria('date')
    setSortedBy('Ei myöhässä')
    setFilteredCompanies(clients.filter(client =>
      client.deadlines[0] && !isPast(client.deadlines[0])))
  }

  const orderByDate = () => {
    setSortingCriteria('date')
    setSortedBy('Eräpäivä')
    setFilteredCompanies(clients.filter(client => client.deadlines[0]))
  }

  const showAllCompanies = () => {
    setSortingCriteria('company')
    setSortedBy('Aakkosjärjestys')
    setFilteredCompanies(clients.filter(client => client.active))
  }

  const dateToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}>
      {children}
      &#x25bc;
    </a>
  ))

  dateToggle.displayName = 'dateToggle'

  return (
    <Dropdown id='dropdown_client_sorter'>
      <Dropdown.Toggle as={dateToggle}>
        <b>{sortedBy}</b>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey='1' onClick={showAllCompanies}>Aakkosjärjestys</Dropdown.Item>
        <Dropdown.Item eventKey='2' onClick={orderByDate}>Eräpäivän mukaan</Dropdown.Item>
        <Dropdown.Item eventKey='3' onClick={showLate}>Myöhässä</Dropdown.Item>
        <Dropdown.Item eventKey='4' onClick={showNotLate}>Ei myöhässä</Dropdown.Item>
        <Dropdown.Item eventKey='4' onClick={showInactive}>Epäaktiiviset</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const ClientsFilter = ({ setFilterByUser }) => {
  const [filteredBy, setFilteredBy] = useState('Omat asiakkaat')

  const filterOwn = () => {
    setFilteredBy('Omat asiakkaat')
    setFilterByUser(true)
  }

  const filterAll = () => {
    setFilteredBy('Kaikki asiakkaat')
    setFilterByUser(false)
  }

  const dateToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}>
      {children}
      &#x25bc;
    </a>
  ))

  dateToggle.displayName = 'dateToggle'

  return (
    <Dropdown id='dropdown_clients_sorter'>
      <Dropdown.Toggle as={dateToggle}>
        <b>{filteredBy}</b>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey='1' onClick={filterOwn}>Omat asiakkaat</Dropdown.Item>
        <Dropdown.Item eventKey='2' onClick={filterAll}>Kaikki asiakkaat</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export { ClientsOrder, ClientsFilter }