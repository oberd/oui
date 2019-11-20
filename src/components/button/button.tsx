import { Component, h, Host, Prop, State } from "@stencil/core"

@Component({
  tag: "oui-button",
  styleUrl: "button.css",
})
export class Button {
  /**
   * Set disabled status of the button.
   */
  @Prop() public disabled: boolean = false

  /**
   * Set primary status of the button.
   */
  @Prop() public primary: boolean = false

  /**
   * Set danger status of the button.
   */
  @Prop() public danger: boolean = false

  /**
   * Set aria-pressed state
   */
  @State() private pressed: boolean = false

  public render() {
    const disabled = this.disabled ? "oui-button__disabled" : ""
    const status = this.primary
      ? "oui-button__primary"
      : this.danger
        ? "oui-button__danger"
        : "oui-button__default"

    return (
      <Host
        role="button"
        class={`${disabled} ${status}`}
        aria-pressed={this.pressed ? "true" : "false"}
        aria-disabled={this.disabled ? "true" : "false"}
        onMouseDown={this.pressedHandler}
        onMouseUp={this.releaseHandler}
      >
        <slot />
      </Host>
    )
  }

  private pressedHandler = () => {
    if (this.disabled) { return }
    this.pressed = true
  }

  private releaseHandler = () => {
    if (this.disabled) { return }
    this.pressed = false
  }
}
