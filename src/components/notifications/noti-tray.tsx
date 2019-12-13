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
  @Prop({ reflect: true, mutable: true }) public opened = false
  @Prop({ reflect: true, mutable: true }) public messages: NotiMessageProps[]

  @Listen("click")
  public todoCompletedHandler(evt: UIEvent) {
    evt.preventDefault()
    evt.stopPropagation()

    this.opened = !this.opened
  }

  public render() {
    return (
      <Host>
        {
          (this.opened && this.messages.length) &&
          <oui-noti-drawer messages={this.messages} />
        }
        <oui-noti-button />
      </Host>
    )
  }
}
