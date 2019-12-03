import { Component, h, Method, State } from "@stencil/core"

@Component({
  tag: "oui-noti-tray",
  styleUrl: "noti-tray.css",
})
export class NotiTray {
  @State() private showNoti = false

  // @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;

  public componentDidLoad() {
    setInterval(this.demoImport.bind(this), 5000)
  }

  public componentDidUnload() {
    clearInterval(this.demoImport.bind(this))
  }

  @Method()
  public async open() {
    if (this.showNoti) {
      this.showNoti = false
      document.querySelector("oui-noti-tray").style.display = "block"
    } else {
      this.showNoti = true
      document.querySelector("oui-noti-tray").style.display = "none"
    }
  }

  public render() {
    return (
      <aside>
        <header>
          <button class="oui-noti-tray__clear" onClick={this.onClearNoti.bind(this)}>
            Clear All
          </button>
        </header>
        <section class="oui-noti-tray__statuses">
          <ul class="oui-noti-tray__statusList"></ul>
        </section>
      </aside>
    )
  }

  private demoImport() {
    const newStatus = document.createElement("li")
    const notiList = document.querySelector(".oui-noti-tray__statusList")
    const isDark = document.querySelector("body.dark")
    newStatus.textContent = "EXPORT COMPLETED"
    notiList.appendChild(newStatus)
    if (isDark === null) {
      newStatus.style.cssText =
        "padding: 0.125rem 0; text-align: center; width: 100%; margin: 1rem 0; background-color: rgb(247, 247, 247); box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.26);"
    } else {
      newStatus.style.cssText =
        "color: white; padding: 0.125rem 0; text-align: center; width: 100%; margin: 1rem 0; background-color: rgb(40, 51, 68); box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.26);"
    }
  }

  private onClearNoti() {
    document.querySelector(".oui-noti-tray__statusList").innerHTML = ""
  }
}
