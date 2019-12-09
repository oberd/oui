# oui-modal

![oui-modal](./screenshot.png)

![oui-modal](./animation01.gif)

![oui-modal](./animation02.gif)

## Usage

```html
<oui-modal>
  <span slot="title">Oui Modal</span>
  <h1>Lorem Ipsum</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam similique, quibusdam aliquid
    officia eveniet, recusandae iste ab cupiditate pariatur accusamus alias ratione provident
    sequi vitae facilis, qui sint fugiat earum?
  </p>
</oui-modal>
```

<!-- Auto Generated Below -->


## Events

| Event   | Description                                    | Type               |
| ------- | ---------------------------------------------- | ------------------ |
| `close` | Emitted when modal is closed via button or esc | `CustomEvent<any>` |


## Dependencies

### Used by

 - [oui-file-upload](../file-upload)

### Graph
```mermaid
graph TD;
  oui-file-upload --> oui-modal
  style oui-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
