import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "oui-notification-item",
  styleUrl: "notification-item.css",
})
export class NotificationItem {
  /**
   * A single notification message
   */
  @Prop() public detail: string = ""

  /**
   * Topic/Header of the notification message
   */
  @Prop() public name: string = ""

  /**
   * Types of the linkref
   */
  @Prop() public type: "link" | "info" = "link"

  /**
   * Status of the action represented by the message
   */
  @Prop() public valence: "success" | "fail" = "success"

  /**
   * A single notification object
   */
  @Prop() public read: boolean = false

  public render() {
    const cls = this.read ? "oui-notification-item__read" : ""

    return (
      <Host class={`${cls}`} data-notification-name={this.name}>
        <div class={`oui-notification-item__${this.valence}-light`} />
        <div class="oui-notification-item__content">
          <span class="oui-notification-item__title">{this.name}</span>
          <span class="oui-notification-item__detail">{this.detail}</span>
        </div>
        <oui-svg name={`status-${this.type}`} scale={0.15} />
      </Host >
    )
  }
}
