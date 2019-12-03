import { Component, h, Host } from "@stencil/core"

@Component({
  tag: "oui-noti-buttons",
  styleUrl: "noti-buttons.css",
})
export class NotiButtons {
  public render() {
    const openTray = () => {
      const notiTray = document.querySelector("oui-noti-tray")
      notiTray.open()
    }

    return (
      <Host>
        <button class="oui-noti-buttons__unused">
          <oui-svg name="noti-bell-unused" scale={0.25}></oui-svg>
        </button>

        <button class="oui-noti-buttons__read">
          <oui-svg name="noti-bell-read" scale={0.25}></oui-svg>
        </button>

        <button class="oui-noti-buttons__unread" onClick={openTray}>
          <oui-svg name="noti-bell-unread" scale={0.25}></oui-svg>
        </button>
      </Host>
    )
  }
}
