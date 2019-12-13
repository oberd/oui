import { Component, h, Host, Listen, State } from "@stencil/core"

@Component({
  tag: "oui-noti-buttons",
  styleUrl: "noti-buttons.css",
})
export class NotiButtons {

  @State() private statusCounter = 0

  public componentDidload() {
    const notiTray = document.querySelector("oui-noti-tray")
    const statusSlot = document.querySelector(".oui-noti-buttons__status-counter")
    statusSlot.appendChild(notiTray)
  }

  public render() {

    const openTray = () => {
      const notiTray = document.querySelector("oui-noti-tray")
      notiTray.opened = true
    }

    return (
      <Host>
        <button class="oui-noti-buttons__unread" onClick={openTray}>
          <span class="oui-noti-buttons__status-counter">{this.statusCounter}</span>
          <oui-svg name="noti-bell-unread" scale={0.25}></oui-svg>
        </button>

        <button class="oui-noti-buttons__read">
          <oui-svg name="noti-bell-read" scale={0.25}></oui-svg>
        </button>

        <button class="oui-noti-buttons__unused">
          <oui-svg name="noti-bell-unused" scale={0.25}></oui-svg>
        </button>
      </Host>
    )
  }

  @Listen("addStatusDone", { target: "body" })
  public addStatusDoneHandler(event: CustomEvent) {
    this.statusCounter++
    Notification.requestPermission().then(() => {
      const statusAdded = new Notification(`Event ${event.type} has been completed!`, {
        body: "New Status has been received!",
      })
      return statusAdded
    })
  }

  @Listen("clearStatusDone", { target: "body" })
  public clearStatusDoneHandler(event: CustomEvent) {
    this.statusCounter = 0
    Notification.requestPermission().then(() => {
      const statusCleared = new Notification(`Event ${event.type} has been completed!`, {
        body: "New Status has been received!",
      })
      return statusCleared
    })
  }
}
