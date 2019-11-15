import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "oui-nav-bar",
  styleUrl: "nav-bar.css",
})
export class NavBar {
  public render() {
    return (
      <Host class="oui-nav-bar">
        <slot>
        </slot>
      </Host>
    );
  }
}
