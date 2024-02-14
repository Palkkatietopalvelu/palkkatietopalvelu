import React, { useState } from "react"

export const DateSelect = () => {
  const [value, setValue] = useState(new Date())

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