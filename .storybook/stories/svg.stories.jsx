import React from 'react'

import Readme from './Readme'
import { svgs } from '../../dist/collection/components/svg/svgs'

import readme from '../../src/components/svg/readme.md'

import './svg.css'

export default {
  title: 'Svg'
}

const useDarkBg = [
  'logo'
]


export const Svg = () => {
  return (
    <>
      <div id="svg" className="container">
        {
          Object.keys(svgs).map((svg) => {
            const itemCls = `itm ${useDarkBg.includes(svg) ? 'dark' : ''}`
            const scale = (svgs[svg].width === 24) ? 2.5 : 0.5

            return (
              <div key={ svg } className={ itemCls }>
                <label>{ svg }</label>
                <oui-svg name={ svg } scale={ scale } />
              </div>
            )
          })
        }
      </div>
      <Readme content={readme} />
    </>
  )
}
