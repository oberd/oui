# oui-noti-tray



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute | Description | Type                 | Default     |
| ---------- | --------- | ----------- | -------------------- | ----------- |
| `messages` | --        |             | `NotiMessageProps[]` | `undefined` |
| `opened`   | `opened`  |             | `boolean`            | `false`     |


## Dependencies

### Depends on

- [oui-noti-drawer](drawer)
- [oui-noti-button](button)

### Graph
```mermaid
graph TD;
  oui-noti-tray --> oui-noti-drawer
  oui-noti-tray --> oui-noti-button
  oui-noti-drawer --> oui-noti-item
  oui-noti-item --> oui-svg
  oui-noti-button --> oui-svg
  style oui-noti-tray fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
