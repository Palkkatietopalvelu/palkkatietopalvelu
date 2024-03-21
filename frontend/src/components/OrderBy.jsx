import React from 'react'
import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { isPast } from 'date-fns'


const OrderBy = ({ clients, setFilteredCompanies, setSortingCriteria }) => {
  /* alphabetic, due date, late, not late, deactivated
    sets the text in the menu box
    alphabetical order is the default */
  const [sortedBy, setSortedBy] = useState('Aakkosjärjestys')

  const showInactive = () => {
    setSortingCriteria('company') // alphabetical order
    setSortedBy('Deaktivoidut')
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
      client.deadlines[0] && !isPast(client.deadlines[0]) &&
      client.active))
  }

  const orderByDate = () => {
    setSortingCriteria('date')
    setSortedBy('Eräpäivä')
    setFilteredCompanies(clients.filter(client => client.active &&
      client.deadlines[0]))
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
    <div>
      <Dropdown>
        <Dropdown.Toggle as={dateToggle} id="dropdown-client-sorter">
          <b>{sortedBy}</b>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" onClick={showAllCompanies}>Aakkosjärjestys</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={orderByDate}>Eräpäivän mukaan</Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={showLate}>Myöhässä</Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={showNotLate}>Ei myöhässä</Dropdown.Item>
          <Dropdown.Item eventKey="4" onClick={showInactive}>Deaktivoidut</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default OrderBy