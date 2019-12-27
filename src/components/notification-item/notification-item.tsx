import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "oui-notification-item",
  styleUrl: "notification-item.css",
})
export class NotificationItem {
  /**
   * A single noti message
   */
  @Prop() public detail: string = ""
  @Prop() public title: string = ""
  @Prop() public type: "link" | "info" = "link"
  @Prop() public valence: "success" | "fail" = "success"

  /**
   * A single notification object
   */
  @Prop() public read: boolean = false

  @Event() public dismiss: EventEmitter
  public dismissHandler = (evt: UIEvent) => {
    evt.stopPropagation()
    this.dismiss.emit((evt.currentTarget as HTMLLIElement).dataset.mst)
  }

  public render() {
    const cls = this.read ? "oui-notification-item__read" : ""

    return (
      <Host class={`${cls}`} onCLick={this.dismissHandler} data-mst={this.title}>
        <div class={`oui-notification-item__${this.valence}-light`} />
        <div class="oui-notification-item__content">
          <span class="oui-notification-item__title">{this.title}</span>
          <span class="oui-notification-item__detail">{this.detail}</span>
        </div>
        <oui-svg name={`status-${this.type}`} scale={0.15} />
      </Host >
    )
  }
}
