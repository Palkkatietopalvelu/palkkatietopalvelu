import React, { useState } from 'react'

export const DateSelect = (initialValue = []) => {
  const [value, setValue] = useState(initialValue)

  const onChange = setValue

  const onReset = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    onReset
  }
}