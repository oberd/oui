import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "oui-fab-buttons",
  styleUrl: "fab-buttons.css",
  shadow: true
})
export class FabButtons {
  render() {
    return (
      <button role="button">
        <slot />
      </button>
    );
  }
}
