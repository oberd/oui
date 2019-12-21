import React from 'react'

import './svg.css'

export default {
  title: 'Svg'
}

export const Svg = () => {
  return (
    <div id="svg" className="container">
      <div className="itm dark">
        <label>logo</label>
        <oui-svg name="logo" scale={ 0.25 }></oui-svg>
      </div>

      <div className="itm">
        <label>logo-light-bg</label>
        <oui-svg name="logo-light-bg" scale={ 0.25 }></oui-svg>
      </div>

      <div className="itm">
        <label>icon-close</label>
        <oui-svg name="icon-close" scale={ 1 }></oui-svg>
      </div>

      <div className="itm">
        <label>icon-filter</label>
        <oui-svg name="icon-filter" scale={ 1 }></oui-svg>
      </div>
    </div>
  )
}
