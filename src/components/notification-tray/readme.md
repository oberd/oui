# oui-notification-tray

Notification tray

### Light Theme

![oui-notification-tray light](../../../static/images/screenshot01.png)

### Dark Theme

![oui-notification-tray dark](../../../static/images/screenshot02.png)

### States

![oui-notification-tray states](../../../static/images/screenshot03.png)

![oui-notification-tray states](../../../static/images/animation01.gif)

## Notification Object

```js
interface NotificationProps {
  title: string
  link?: string
  type: "link" | "info"
  detail?: string
  valence: "success" | "fail",
  read?: boolean
}
```

## Usage

```js
<oui-tm-switch></oui-tm-switch>

  <oui-nav-bar>
    <div style="flex: 1;"></div>
    <oui-notification-tray id="noti-one"></oui-notification-tray>
  </oui-nav-bar>

  <script>
    let notifications = [
      {
        title: "Ubuntu Release",
        link: "https://ubuntu.com",
        type: "link",
        detail: "Ubuntu 19.10 has been released",
        valence: "success"
      },
      {
        title: "Apple Release",
        type: "info",
        detail: "OSX Catalina has been released",
        valence: "fail"
      }
    ]

    const notiTrayOne = document.querySelector("#noti-one")
    notiTrayOne.notifications = notifications

    // on single item dismiss event
    document.addEventListener('dismiss', (evt) => {
      notifications = notifications.map((noti) => {
        if (noti.title === evt.detail) { noti.read = true }
        return noti
      })

      notiTrayOne.notifications = notifications
    })

    // on dismiss all event
    document.addEventListener('dismissall', (evt) => {
      notifications = notifications.map((noti) => {
        noti.read = true
        return noti
      })

      notiTrayOne.notifications = notifications
    })
  </script>
```


<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                           | Type                      | Default     |
| ----------- | ----------- | ------------------------------------- | ------------------------- | ----------- |
| `count`     | `count`     |                                       | `number`                  | `0`         |
| `direction` | `direction` | Direction of the drawer               | `"to-left" \| "to-right"` | `"to-left"` |
| `opened`    | `opened`    | Open or close the notification drawer | `boolean`                 | `false`     |
| `unread`    | `unread`    |                                       | `number`                  | `0`         |


## Dependencies

### Depends on

- [oui-notification-button](button)

### Graph
```mermaid
graph TD;
  oui-notification-tray --> oui-notification-button
  oui-notification-button --> oui-svg
  style oui-notification-tray fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
