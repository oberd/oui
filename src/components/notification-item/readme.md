# oui-notification-item



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                     | Type                  | Default     |
| --------- | --------- | ----------------------------------------------- | --------------------- | ----------- |
| `detail`  | `detail`  | A single notification message                   | `string`              | `""`        |
| `name`    | `name`    | Topic/Header of the notification message        | `string`              | `""`        |
| `read`    | `read`    | A single notification object                    | `boolean`             | `false`     |
| `type`    | `type`    | Types of the linkref                            | `"info" \| "link"`    | `"link"`    |
| `valence` | `valence` | Status of the action represented by the message | `"fail" \| "success"` | `"success"` |


## Dependencies

### Depends on

- [oui-svg](../svg)

### Graph
```mermaid
graph TD;
  oui-notification-item --> oui-svg
  style oui-notification-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
