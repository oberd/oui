import { Component, h, Host, Prop, State } from "@stencil/core"

@Component({
  tag: "oui-button",
  styleUrl: "button.css",
})
export class Button {
  /**
   * Set disabled status of the button. Default `false`
   */
  @Prop() public disabled: boolean = false

  @State() private pressed: boolean = false

  public render() {
    return (
      <Host
        role="button"
        class={this.disabled ? "oui-button__disabled" : ""}
        aria-pressed={this.pressed ? "true" : "false"}
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
