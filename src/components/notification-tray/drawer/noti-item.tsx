import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"
import { NotiMessageProps } from "../status-type"

@Component({
  tag: "oui-noti-item",
})
export class NotiItem {
  /**
   * A single noti message
   */
  @Prop() public message: NotiMessageProps

  /**
   * A single noti message
   */
  @Prop() public read: boolean = false

  @Event() public dismiss: EventEmitter
  public dismissHandler = (evt: UIEvent) => {
    evt.stopPropagation()
    this.dismiss.emit((evt.currentTarget as HTMLLIElement).dataset.mst)
  }

  public render() {
    const { detail, link = "", title, type, valence } = this.message
    const cls = this.read ? "oui-noti-item__read" : ""

    return (
      <Host class={cls} onCLick={this.dismissHandler} data-mst={title}>
        <div class={`oui-noti-drawer__${valence}-light`} />
        <div class="oui-noti-drawer__content">
          <span class="oui-noti-drawer__title">{title}</span>
          <span class="oui-noti-drawer__detail">{detail}</span>
        </div>
        <a href={link}>
          <oui-svg name={`status-${type}`} scale={0.15} />
        </a>
      </Host >
    )
  }
}
