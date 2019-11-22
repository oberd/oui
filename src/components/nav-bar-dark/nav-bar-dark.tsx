import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "oui-nav-bar-dark",
  styleUrl: "nav-bar-dark.css"
})
export class NavBarDark {
  public render() {
    return (
      <Host class="oui-nav-bar-dark">
        <slot></slot>
      </Host>
    );
  }
}
