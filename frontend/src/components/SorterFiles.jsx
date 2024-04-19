// ./files (admin) ; järjestä aineistot
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-bootstrap'

const FilesOrder = ({ setSortingCriteria }) => {
  /* arrival time newest, arrival time oldest, due date
    sets the text in the menu box
    arrival time newest is the default */
  const [sortedBy, setSortedBy] = useState('Saapumisaika (uusin ensin)')

  const orderByArrivalNewest = () => {
    setSortingCriteria('arrival time newest')
    setSortedBy('Saapumisaika (uusin ensin)')
  }

  const orderByArrivalOldest = () => {
    setSortingCriteria('arrival time oldest')
    setSortedBy('Saapumisaika (vanhin ensin)')
  }

  const orderByDueDate = () => {
    setSortingCriteria('due date')
    setSortedBy('Eräpäivän mukaan')
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
    <Dropdown id='dropdown_files_sorter'>
      <Dropdown.Toggle as={dateToggle}>
        <b>{sortedBy}</b>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey='1' onClick={orderByArrivalNewest}>Saapumisaika (uusin ensin)</Dropdown.Item>
        <Dropdown.Item eventKey='2' onClick={orderByArrivalOldest}>Saapumisaika (vanhin ensin)</Dropdown.Item>
        <Dropdown.Item eventKey='3' onClick={orderByDueDate}>Eräpäivän mukaan</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const FilesFilter = ({ user, files, clients, setFilteredFiles }) => {
  const [filteredBy, setFilteredBy] = useState('Omat asiakkaat')

  const filterOwn = () => {
    setFilteredBy('Omat asiakkaat')
    setFilteredFiles(files.filter(f =>
      clients.some(c => c.id === f.owner && c.user_id === user.id)))
  }

  const filterAll = () => {
    setFilteredBy('Kaikki asiakkaat')
    setFilteredFiles(files)
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
    <Dropdown id='dropdown_files_sorter'>
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

export { FilesOrder, FilesFilter }