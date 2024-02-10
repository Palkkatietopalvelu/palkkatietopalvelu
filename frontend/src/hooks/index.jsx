import { useState } from 'react'

export const useField = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    onReset
  }
}