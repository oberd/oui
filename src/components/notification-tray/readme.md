# oui-noti-tray

Notification tray

### Light Theme

![oui-noti-tray light](screenshot01.png)

### Dark Theme

![oui-noti-tray dark](screenshot02.png)

### States

![oui-noti-tray states](screenshot03.png)

![oui-noti-tray states](animation01.gif)

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
    <oui-noti-tray id="noti-one"></oui-noti-tray>
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

| Property        | Attribute   | Description                           | Type                      | Default     |
| --------------- | ----------- | ------------------------------------- | ------------------------- | ----------- |
| `direction`     | `direction` | Direction of the drawer               | `"to-left" \| "to-right"` | `"to-left"` |
| `notifications` | --          | Array of notification objects         | `NotificationProps[]`     | `[]`        |
| `opened`        | `opened`    | Open or close the notification drawer | `boolean`                 | `false`     |


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
