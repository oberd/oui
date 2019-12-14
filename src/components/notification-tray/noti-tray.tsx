import {
  Component,
  h,
  Host,
  Listen,
  Prop,
} from "@stencil/core"

import { NotiMessageProps } from "./status-type"

@Component({
  tag: "oui-noti-tray",
  styleUrl: "noti-tray.css",
})
export class NotiTray {

  /**
   *
   */
  @Prop({ reflect: true, mutable: true }) public opened = false

  /**
   *
   */
  @Prop() public messages: NotiMessageProps[] | null = []

  /**
   *
   */
  @Prop() public direction: "to-right" | "to-left" = "to-left"

  @Listen("click")
  public todoCompletedHandler(evt: UIEvent) {
    evt.preventDefault()
    evt.stopPropagation()

    this.opened = !this.opened
  }

  public render() {
    const count = this.messages ? this.messages.length : 0
    const unread = count
      ? this.messages.reduce((acc, itm) => {
        return itm.read ? acc : ++acc
      }, 0)
      : count

    return (
      <Host class={this.direction}>
        <oui-noti-button count={count} unread={unread} />
        {
          (!!this.opened && (this.messages && !!this.messages.length)) &&
          <oui-noti-drawer messages={this.messages} />
        }
      </Host>
    )
  }
}
