# oui-noti-tray



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                      | Default     |
| ----------- | ----------- | ----------- | ------------------------- | ----------- |
| `direction` | `direction` |             | `"to-left" \| "to-right"` | `"to-left"` |
| `messages`  | --          |             | `NotiMessageProps[]`      | `[]`        |
| `opened`    | `opened`    |             | `boolean`                 | `false`     |


## Dependencies

### Depends on

- [oui-noti-button](button)
- [oui-noti-drawer](drawer)

### Graph
```mermaid
graph TD;
  oui-noti-tray --> oui-noti-button
  oui-noti-tray --> oui-noti-drawer
  oui-noti-button --> oui-svg
  oui-noti-drawer --> oui-noti-item
  oui-noti-item --> oui-svg
  style oui-noti-tray fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
