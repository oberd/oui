import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "oui-noti-button",
  styleUrl: "noti-button.css",
})
export class NotiButton {
  /**
   * Number of unread notifications
   */
  @Prop() public count: number = 0

  /**
   * Number of unread notifications
   */
  @Prop() public unread: number = 0

  public render() {
    const btnCls = !this.count ? "unused" : (this.unread ? "unread" : "read")

    return (
      <Host>
        <button class={`oui-noti-button__${btnCls}`}>
          {
            (btnCls === "unread") &&
            <span class="oui-noti-button__status-counter">{this.unread}</span>
          }
          <oui-svg name={`noti-bell-${btnCls}`} scale={0.25} />
        </button>
      </Host>
    )
  }
}
