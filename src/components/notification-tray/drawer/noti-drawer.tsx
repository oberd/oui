import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

import { NotiMessageProps } from "../status-type"

@Component({
  tag: "oui-noti-drawer",
  styleUrl: "noti-drawer.css",
})
export class NotiDrawer {
  /**
   * Messages array
   */
  @Prop() public messages: NotiMessageProps[] = []

  @Event() public dismissall: EventEmitter
  public dismissAllHandler = (evt: UIEvent) => {
    evt.stopPropagation()
    this.dismissall.emit()
  }

  public render() {
    const disabled = !!this.messages.length && !!this.messages.every((msg) => msg.read)

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
                this.messages.map((msg: NotiMessageProps) =>
                  (<oui-noti-item message={msg} read={msg.read} />))
              }
            </li>
          </ul>
        </section>
      </Host>
    )
  }
}
