import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  Watch,
} from "@stencil/core"

@Component({
  tag: "oui-notification-tray",
  styleUrl: "notification-tray.css",
})
export class NotificationTray {
  @Element() public tray: HTMLElement

  /**
   * Open or close the notification drawer
   */
  @Prop({ reflect: true, mutable: true }) public opened = false

  /**
   * Direction of the drawer
   */
  @Prop() public direction: "to-right" | "to-left" = "to-left"

  @Prop({ reflect: true, mutable: true }) public count: number = 0

  @Prop({ reflect: true, mutable: true }) public unread: number = 0

  @Listen("click")
  public todoCompletedHandler(evt: UIEvent) {
    evt.preventDefault()
    evt.stopPropagation()

    this.opened = !this.opened
  }

  public render() {
    return (
      <Host class={`${this.opened ? "oui-notification-drawer__opened" : ""} ${this.direction}`}>
        <oui-notification-button count={this.count} unread={this.unread} />
        <slot />
      </Host>
    )
  }
}
