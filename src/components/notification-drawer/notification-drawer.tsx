import { Component, Event, EventEmitter, h, Host } from "@stencil/core"

@Component({
  tag: "oui-notification-drawer",
  styleUrl: "notification-drawer.css",
})
export class NotiDrawer {
  /**
   * Emited when the clear all btn is clicked
   */
  @Event() public dismissall: EventEmitter
  public dismissAllHandler = (evt: UIEvent) => {
    evt.stopPropagation()
    this.dismissall.emit()
  }

  public render() {
    const disabled = false

    return (
      <Host class="oui-notification-drawer__statuses">
        <button
          disabled={disabled}
          class="oui-notification-drawer__clear"
          onClick={disabled ? () => {/*noop*/ } : this.dismissAllHandler}
        >Clear All</button>

        <div class="oui-notification-drawer__status-list">
          <slot />
        </div>
      </Host>
    )
  }
}
