// Komponentti muiden komponenttejen näkyvyyden muuttamiseen
import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    //props.resetFields()
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant={props.variant}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children} <br />
        <Button onClick={toggleVisibility}>Peruuta</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable