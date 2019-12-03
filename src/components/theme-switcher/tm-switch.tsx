import { Component, h, Host, Prop, State } from "@stencil/core";

@Component({ tag: "oui-tm-switch", styleUrl: "tm-switch.css" })
export class ThemeSwitch {
  @Prop() theme: string;

  switchToLight() {
    document.querySelector("oui-nav-bar").classList.remove("dark");
    document.querySelector("oui-noti-tray").classList.remove("dark");
    document.querySelector("oui-noti-buttons").classList.remove("dark");
  }

  switchToDark() {
    document.querySelector("oui-nav-bar").classList.add("dark");
    document.querySelector("oui-noti-tray").classList.add("dark");
    document.querySelector("oui-noti-buttons").classList.add("dark");
  }

  render() {
    return (
      <div>
        <button
          id="tmLight"
          onClick={() => {
            this.switchToLight();
          }}
        >
          Light
        </button>
        <button
          id="tmDark"
          onClick={() => {
            this.switchToDark();
          }}
        >
          Dark
        </button>
      </div>
    );
  }
}
