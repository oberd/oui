import {
  Component,
  h,
  Host,
  Listen,
  Prop,
} from "@stencil/core"

import { NotificationProps } from "./status-type"

@Component({
  tag: "oui-noti-tray",
  styleUrl: "noti-tray.css",
})
export class NotiTray {

  /**
   * Open or close the notification drawer
   */
  @Prop({ reflect: true, mutable: true }) public opened = false

  /**
   * Array of notification objects
   */
  @Prop() public notifications: NotificationProps[] | null = []

  /**
   * Direction of the drawer
   */
  @Prop() public direction: "to-right" | "to-left" = "to-left"

  @Listen("click")
  public todoCompletedHandler(evt: UIEvent) {
    evt.preventDefault()
    evt.stopPropagation()

    this.opened = !this.opened
  }

  public render() {
    const count = this.notifications ? this.notifications.length : 0
    const unread = count
      ? this.notifications.reduce((acc, itm) => {
        return itm.read ? acc : ++acc
      }, 0)
      : count

    return (
      <Host class={this.direction}>
        <oui-noti-button count={count} unread={unread} />
        {
          (!!this.opened && (this.notifications && !!this.notifications.length)) &&
          <oui-noti-drawer notifications={this.notifications} />
        }
      </Host>
    )
  }
}
