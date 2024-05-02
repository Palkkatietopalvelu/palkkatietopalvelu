// UseDateSelect.js hook päivämäärien hakemiseen
import { useState, useCallback } from 'react'

export const useDateSelect = (initialValue = []) => {
  const [value, setValue] = useState(initialValue)

  const onChange = useCallback((newDates) => {
    setValue(newDates)
  }, [])

  const onReset = useCallback(() => {
    setValue([])
  }, [])

  return {
    value,
    onChange,
    onReset
  }
}
