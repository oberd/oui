# oui-notification-item



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description                  | Type                | Default     |
| -------------- | --------- | ---------------------------- | ------------------- | ----------- |
| `notification` | --        | A single noti message        | `NotificationProps` | `undefined` |
| `read`         | `read`    | A single notification object | `boolean`           | `false`     |


## Events

| Event     | Description | Type               |
| --------- | ----------- | ------------------ |
| `dismiss` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [oui-notification-drawer]()

### Depends on

- [oui-svg](../../svg)

### Graph
```mermaid
graph TD;
  oui-notification-item --> oui-svg
  oui-notification-drawer --> oui-notification-item
  style oui-notification-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
