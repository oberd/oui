import { Component, h, Host, Listen, State, } from "@stencil/core"

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
      notiTray.open()
    }

    return (
      <Host>
        <button class="oui-noti-buttons__unread" onClick={openTray}>
          <span class="oui-noti-buttons__status-counter"></span>
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

  @Listen("addStatusDone")
  private addStatusDoneHandler(event: CustomEvent) {
    this.statusCounter += 1
    console.log("Received Custom Event: ", event.detail)
    console.log(`Amount of Status generated: ` + this.statusCounter)
  }
}
