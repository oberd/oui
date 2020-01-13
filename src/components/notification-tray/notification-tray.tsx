import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
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

  /**
   *
   */
  @Prop({ reflect: true, mutable: true }) public count: number = 0

  /**
   *
   */
  @Prop({ reflect: true, mutable: true }) public unread: number = 0

  /**
   *
   */
  @Event() public dismissall: EventEmitter
  public dismissallHandler = () => {
    this.dismissall.emit()
  }

  /**
   *
   */
  @Event() public dismiss: EventEmitter
  public dismissHandler = (el: HTMLElement) => {
    this.dismiss.emit(el.dataset.notificationName)
  }

  @Listen("click")
  public todoCompletedHandler(evt: UIEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    const target: HTMLElement = evt.target as HTMLElement

    if (target.closest("oui-notification-item")) {
      this.dismissHandler(target.closest("oui-notification-item"))
      return
    }

    if (target.tagName === "BUTTON") {
      this.dismissallHandler()
      return
    }

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
