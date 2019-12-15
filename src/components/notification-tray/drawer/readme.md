# oui-noti-item



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

 - [oui-noti-drawer]()

### Depends on

- [oui-svg](../../svg)

### Graph
```mermaid
graph TD;
  oui-noti-item --> oui-svg
  oui-noti-drawer --> oui-noti-item
  style oui-noti-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
