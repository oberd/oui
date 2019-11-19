import { Component, h, Host } from "@stencil/core"

@Component({
  tag: "oui-button",
  styleUrl: "button.css",
})
export class Button {
  public render() {
    return (
      <Host>
        <slot />
      </Host>
    )
  }
}
