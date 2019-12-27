import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "oui-notification-button",
  styleUrl: "notification-button.css",
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
      <Host class={`oui-notification-button__${btnCls}`} aria-role="button">
        {
          (btnCls === "unread") &&
          <span class="oui-notification-button__status-counter">{this.unread}</span>
        }
        <oui-svg name="noti-bell" scale={2} />
      </Host>
    )
  }
}
