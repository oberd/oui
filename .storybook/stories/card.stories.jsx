import React from 'react'

import Readme from './Readme'
import readmeCard from '../../src/components/card/readme.md'
import readmeHeading from '../../src/components/card-heading/readme.md'

export default {
  title: 'Card',
}

const style = {
  padding: "1em",
  width: "1024px",
  margin: " 2em auto 0",
  lineHeight: "1.5em",
  fontSize: "1.1em"
}

export const card = () => (
  <>
    <oui-card style={ style }>
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
    <Readme content={ readmeCard } />
  </>
)

export const cardWithHeading = () => (
  <>
    <oui-card style={ style }>
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
  </>
)
