# oui-collapsable



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                          | Type      | Default     |
| ---------- | ---------- | ------------------------------------ | --------- | ----------- |
| `expanded` | `expanded` | Set drawer position to right or left | `boolean` | `false`     |
| `label`    | `label`    | Set drawer drawerTitle               | `string`  | `undefined` |


## Events

| Event      | Description                     | Type               |
| ---------- | ------------------------------- | ------------------ |
| `collapse` | Triggered when item collaspes   | `CustomEvent<any>` |
| `expand`   | Triggered when the item expands | `CustomEvent<any>` |


## Dependencies

### Depends on

- [oui-svg](../svg)

### Graph
```mermaid
graph TD;
  oui-collapsable --> oui-svg
  style oui-collapsable fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
