import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "oui-nav-bar",
  styleUrl: "nav-bar.css"
})
export class NavBar {
  @Prop() Dark: boolean;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
