import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "oui-noti-button",
  styleUrl: "noti-button.css",
})
export class NotiButton {
  /**
   * Set the noti-try status icon
   */
  @Prop() public icon: string = "read"

  /**
   * Number of unread notifications
   */
  @Prop() public count: number = 0

  public render() {
    return (
      <Host>
        {/* <button class="oui-noti-button__unread" onClick={openTray}>
          <span class="oui-noti-button__status-counter">{this.statusCounter}</span>
          <oui-svg name="noti-bell-unread" scale={0.25}></oui-svg>
        </button> */}

        <button class="oui-noti-button__read">
          <oui-svg name={`noti-bell-${this.icon}`} scale={0.25} />
        </button>

        {/* <button class="oui-noti-button__unused">
          <oui-svg name="noti-bell-unused" scale={0.25}></oui-svg>
        </button> */}
      </Host>
    )
  }
}
