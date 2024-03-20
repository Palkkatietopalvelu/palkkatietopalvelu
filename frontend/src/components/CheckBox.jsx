const CheckBox = ({ name, inputs, setInputs, checked }) => {
  const handleCheckChange = () => {
    if (Array.isArray(inputs)) {
      // for array inputs
      if (inputs.includes(name)) {
        setInputs(inputs.filter((input) => input !== name))
      } else {
        setInputs(inputs.concat(name))
      }
    } else {
      // for boolean inputs
      setInputs(!inputs)
    }
  }

  return (
    <input
      type='checkbox'
      name={name}
      onChange={handleCheckChange}
      checked={checked}
    />
  )
}

export default CheckBox