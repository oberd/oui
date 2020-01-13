import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "oui-notification-drawer",
  styleUrl: "notification-drawer.css",
})
export class NotiDrawer {
  /**
   *
   */
  @Prop() public disabled: boolean = false

  public render() {
    return (
      <Host class="oui-notification-drawer__statuses">
        <button
          disabled={this.disabled}
          class="oui-notification-drawer__clear"
          onClick={(evt: UIEvent) => this.onClickHandler(evt, this.disabled)}
        >Clear All</button>

        <div class="oui-notification-drawer__status-list">
          <slot />
        </div>
      </Host>
    )
  }

  private onClickHandler(evt: UIEvent, disabled: boolean) {
    if (disabled) {
      evt.stopPropagation()
      evt.preventDefault()
    }
  }

}
