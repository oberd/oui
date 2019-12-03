import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "oui-nav-bar",
  styleUrl: "nav-bar.css",
})
export class NavBar {
  public render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
