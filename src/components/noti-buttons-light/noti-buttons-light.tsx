import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "oui-noti-buttons-light",
  styleUrl: "noti-buttons-light.css",
})
export class NotiButtonsLight {
  render() {
    return (
      <Host>
        <button class="button-unused">
          <oui-svg name="noti-bell-unused" scale={0.25}></oui-svg>
        </button>

        <button class="button-read">
          <oui-svg name="noti-bell-read" scale={0.25}></oui-svg>
        </button>

        <button class="button-unread">
          <oui-svg name="noti-bell-unread" scale={0.25}></oui-svg>
        </button>

        <slot />
      </Host>
    );
  }
}
