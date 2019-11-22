import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "oui-nav-bar-light",
  styleUrl: "nav-bar-light.css"
})
export class NavBarLight {
  public render() {
    return (
      <Host class="oui-nav-bar-light">
        <slot></slot>
      </Host>
    );
  }
}
