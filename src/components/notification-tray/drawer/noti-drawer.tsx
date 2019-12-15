import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

import { NotificationProps } from "../status-type"

@Component({
  tag: "oui-noti-drawer",
  styleUrl: "noti-drawer.css",
})
export class NotiDrawer {
  /**
   * Array of notifivation objects
   */
  @Prop() public notifications: NotificationProps[] = []

  /**
   * Emited when the clear all btn is clicked
   */
  @Event() public dismissall: EventEmitter
  public dismissAllHandler = (evt: UIEvent) => {
    evt.stopPropagation()
    this.dismissall.emit()
  }

  public render() {
    const disabled = !!this.notifications.length && !!this.notifications.every((msg) => msg.read)

    return (
      <Host>
        <section class="oui-noti-drawer__statuses">
          <button
            disabled={disabled}
            class="oui-noti-drawer__clear"
            onClick={disabled ? () => {/*noop*/ } : this.dismissAllHandler}
          >
            Clear All
          </button>

          <ul class="oui-noti-drawer__status-list">
            <li class=".oui-noti-drawer__status-list">
              {
                this.notifications.map((noti: NotificationProps) =>
                  (<oui-noti-item notification={noti} read={noti.read} />))
              }
            </li>
          </ul>
        </section>
      </Host>
    )
  }
}
