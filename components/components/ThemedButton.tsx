import React from 'react'
import { getState } from '../state'
import { changeTheme } from '../state/action'

const ThemedButton = () => {
  const [{ theme }, dispatch] = getState()

  const primaryColor = {
    backgroundColor: theme,
  }

  return (
    <button
      className="m-2 btn btn-primary"
      style={primaryColor}
      onClick={() => {
        dispatch(changeTheme('blue'))
      }}
    >
      Make me blue!
    </button>
  )
}

export default ThemedButton
