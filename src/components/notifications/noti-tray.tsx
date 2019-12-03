import { Component, h, Prop, State, Method } from "@stencil/core";

@Component({
  tag: "oui-noti-tray",
  styleUrl: "noti-tray.css"
})
export class NotiTray {
  @State() showNoti = false;

  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;
  // status: string;

  demoImport() {
    const newStatus = document.createElement("li");
    const notiList = document.querySelector("#statusList");
    const isDark = document.querySelector("oui-noti-tray.dark");
    newStatus.textContent = "EXPORT COMPLETED";
    notiList.appendChild(newStatus);
    if (isDark === null) {
      newStatus.style.cssText =
        "padding: 0.125rem 0; text-align: center; width: 100%; margin: 1rem 0; background-color: rgb(247, 247, 247); box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.26);";
    } else {
      newStatus.style.cssText =
        "color: white; padding: 0.125rem 0; text-align: center; width: 100%; margin: 1rem 0; background-color: rgb(40, 51, 68); box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.26);";
    }
  }

  componentDidLoad() {
    setInterval(this.demoImport.bind(this), 5000);
  }

  componentDidUnload() {
    clearInterval(this.demoImport.bind(this));
  }

  onCloseNoti() {
    this.opened = false;
  }

  onClearNoti() {
    document.querySelector("#statusList").innerHTML = "";
  }

  @Method()
  open() {
    if (this.opened) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  render() {
    return [
      // <div class="overlay" onClick={this.onCloseNoti.bind(this)} />,
      <aside>
        <header>
          <button id="clear" onClick={this.onClearNoti.bind(this)}>
            Clear All
          </button>
        </header>
        <section id="statuses">
          <ul id="statusList"></ul>
        </section>
      </aside>
    ];
  }
}
