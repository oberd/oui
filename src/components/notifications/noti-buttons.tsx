import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "oui-noti-buttons",
  styleUrl: "noti-buttons.css"
})
export class NotiButtons {
  render() {
    const openTray = () => {
      const notiTray = document.querySelector("oui-noti-tray");
      console.log(notiTray);
      notiTray.open();
    };

    return (
      <Host>
        <button id="buttonUnused">
          <oui-svg name="noti-bell-unused" scale={0.25}></oui-svg>
        </button>

        <button id="buttonRead">
          <oui-svg name="noti-bell-read" scale={0.25}></oui-svg>
        </button>

        <button id="buttonUnread" onClick={() => openTray()}>
          <oui-svg name="noti-bell-unread" scale={0.25}></oui-svg>
        </button>
      </Host>
    );
  }
}
