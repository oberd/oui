import React from 'react'

import Readme from './Readme'
import readmeCard from '../../src/components/card/readme.md'
import readmeHeading from '../../src/components/card-heading/readme.md'

export default {
  title: 'Card',
}

const style = {
  width: "1024px",
  margin: " 2em auto 0",
  lineHeight: "1.5em",
  fontSize: "1.1em"
}

export const card = () => (
  <>
    <div style={ style }>
      <oui-card style={{ padding: '0.5em 1em' }}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          repellat qui nobis mollitia aperiam architecto necessitatibus odit? Ullam,
          repellat temporibus, eligendi in, illum a illo minus odio ut nulla dicta!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          repellat qui nobis mollitia aperiam architecto necessitatibus odit? Ullam,
          repellat temporibus, eligendi in, illum a illo minus odio ut nulla dicta!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          repellat qui nobis mollitia aperiam architecto necessitatibus odit? Ullam,
          repellat temporibus, eligendi in, illum a illo minus odio ut nulla dicta!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          repellat qui nobis mollitia aperiam architecto necessitatibus odit? Ullam,
          repellat temporibus, eligendi in, illum a illo minus odio ut nulla dicta!
      </p>
      </oui-card>
    </div>
    <Readme content={ readmeCard } />
  </>
)

export const cardWithHeading = () => (
  <>
    <div style={ style }>
      <oui-card style={{ padding: '0.5em 1em' }}>
        <oui-card-heading>Oui Card</oui-card-heading>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          repellat qui nobis mollitia aperiam architecto necessitatibus odit? Ullam,
          repellat temporibus, eligendi in, illum a illo minus odio ut nulla dicta!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          repellat qui nobis mollitia aperiam architecto necessitatibus odit? Ullam,
          repellat temporibus, eligendi in, illum a illo minus odio ut nulla dicta!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          repellat qui nobis mollitia aperiam architecto necessitatibus odit? Ullam,
          repellat temporibus, eligendi in, illum a illo minus odio ut nulla dicta!
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
          repellat qui nobis mollitia aperiam architecto necessitatibus odit? Ullam,
          repellat temporibus, eligendi in, illum a illo minus odio ut nulla dicta!
      </p>
      </oui-card>
      <Readme content={ readmeHeading } />
    </div>
  </>
)
