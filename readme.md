<img alt="Oberd Oui!" src="src/components/svg/svg/oui-logo-light-bg.svg" width="100px" />

### Development

npm commands:

* **build** - Build Stencil distributable files and documentation
* **start** - Start Stencil's dev server and build process
* **test** - Run all tests once
* **test.watch** -  Run all tests and watch for changes
* **generate** - Run the new component boilerplate wizard
* **storybook** - Start both Stencil and Storybook dev servers and processes
* **storybook:start** - Start Storybook dev server

#### Add Component Stories

1. Create a file i `.storybook/stories` using this pattern:

    `.storybook/stories/<component>.stories.jsx`

2. Basic story skel:

    ```jsx
    // import react
    import React from 'react'

    // import the Readme parser component
    import Readme from './Readme'

    // import the component readme file
    import readmeCard from '../../src/components/card/readme.md'

    // this is the stories section
    export default {
      title: 'Card',
    }

    // this is one story under the prev exported stories section
    export const card = () => {
      return (
        <oui-card>
          <p>
            Hello world...
          </p>
        </oui-card>
        <Readme content={ readmeCard } />
      )
    }

    // Note: You can export more stories related to this section, by exporting more components...
    ```

### Usage

Install the repo

`git clone git@github.com:oberd/oui.git "$OBERD_DEV_ROOT"/oui`

Include in your package.json

```json
{
    "dependencies": {
        "@oberd/oui": "file:../oui"
    }
}
```

Run NPM install

`npm i`

Register the web-components with the DOM, and include the types in your typescript for JSX (for example if you want to use them from a React app)

```typescript
// for example: src/globals.ts

// Registers all @oberd/oui with the dom, and augments
// the JSX intrinsic elements type to include our custom elements
// generated from @oberd/oui

import { defineCustomElements, JSX as LocalJSX } from "@oberd/oui/loader"
import { HTMLAttributes } from "react"

type StencilToReact<T> = {
  [P in keyof T]?: T[P] & Omit<HTMLAttributes<Element>, "className"> & {
    class?: string;
  };
}

declare global {
  export namespace JSX {
    interface IntrinsicElements extends StencilToReact<LocalJSX.IntrinsicElements> {
    }
  }
}

defineCustomElements(window)
```

In React (for example)

```tsx
import React from "react"

export function MyConsumer() {
  return (
    <oui-card>
      <oui-button color="blue">Bonjour, oui!</oui-button>
    </oui-card>
  )
}
```


### Bigger Picture

![component arch](component-lifecycle.png)

### Roadmap

This repository is intended to provide standardized styling of UI widgets and common patterns in Oberd and Oberd related views.

Good components to add:
  - Common widgets such as dropdowns, menus, app bars

Good components to have in your app:
  - Anything touching APIs (these components should be backend agnostic)
