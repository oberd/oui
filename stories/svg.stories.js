import React from 'react'

export default {
  title: 'Svg'
}

const containerStyle = {
  width: '80%',
  margin: '2em auto',
  display: 'flex',
  justifyContent: 'center'
}

const itmStyle = {
  flex: '1 25%',
  textAlign: 'center',
  padding: '1em'
}

export const Svg = () => {
  return (
    <div style={ containerStyle }>
      <div style={ { ...itmStyle, backgroundColor: "#333" } }>
        <oui-svg name="logo" scale={ 0.25 }></oui-svg>
      </div>

      <div style={ itmStyle }>
        <oui-svg name="logo-light-bg" scale={ 0.25 }></oui-svg>
      </div>

      <div style={ itmStyle }>
        <oui-svg name="icon-close" scale={ 1 }></oui-svg>
      </div>

      <div style={ itmStyle }>
        <oui-svg name="icon-filter" scale={ 1 }></oui-svg>
      </div>
    </div>
  )
}
