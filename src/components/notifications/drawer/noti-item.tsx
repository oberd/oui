import { Component, h, Host, Prop } from "@stencil/core"
import { NotiMessageProps } from "../status-type"

@Component({
  tag: "oui-noti-item",
})
export class NotiItem {
  /**
   * A single noti message
   */
  @Prop() public message: NotiMessageProps

  public render() {
    const { detail, link = "", title, type, valence } = this.message

    return (
      <Host>
        <a href={link}>
          <div class={`oui-noti-drawer__${valence}-light`} />
          <div class="oui-noti-drawer__content">
            <span class="oui-noti-drawer__title">{title}</span>
            <span class="oui-noti-drawer__detail">{detail}</span>
          </div>
          <oui-svg name={`status-${type}`} scale={0.25} />
        </a>
      </Host >
    )
  }
}
