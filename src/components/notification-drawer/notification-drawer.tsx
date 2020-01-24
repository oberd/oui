const buttonText: string = "Clear All"

import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "oui-notification-drawer",
  styleUrl: "notification-drawer.css",
})
export class NotiDrawer {
  /**
   * This property enables/disables the "Clear All" Button
   */
  @Prop() public disabled: boolean = false

  public render() {
    return (
      <Host class="oui-notification-drawer__statuses">
        <button
          disabled={this.disabled}
          class="oui-notification-drawer__clear"
          onClick={(evt: UIEvent) => this.onClickHandler(evt, this.disabled)}
    >{buttonText}</button>

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
