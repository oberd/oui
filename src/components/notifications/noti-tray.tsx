import {
  Component,
  Event,
  EventEmitter,
  h,
  Method,
  Prop,
  State,
} from "@stencil/core"

import { StatusType } from "./status-type"

@Component({
  tag: "oui-noti-tray",
  styleUrl: "noti-tray.css",
})
export class NotiTray {
  @Event({
    eventName: "addStatusDone",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  public addStatusDone: EventEmitter

  @Event({
    eventName: "clearStatusDone",
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  public clearStatusDone: EventEmitter

  @Prop({ reflectToAttr: true, mutable: true }) public opened = false
  @Prop({ reflectToAttr: true, mutable: true }) public status: object[]

  @State() public counter: number = 0
  @State() public oldStatus: object[]

  public componentWillLoad() {
    setInterval(this.demoImport.bind(this), 60000)
  }

  @Method()
  public async open() {
    switch (this.opened) {
      case false:
        this.opened = true
        document.querySelector("aside").style.height = "17.6875em"
        document.querySelector("aside").style.transform = "translateY(0px)"
        break
      default:
        this.opened = false
        document.querySelector("aside").style.height = "0"
        document.querySelector("aside").style.transform = "translateY(-0px)"
        break
    }
  }

  public render() {
    return (
      <aside>
        <section class="oui-noti-tray__statuses">
          <button
            class="oui-noti-tray__clear"
            onClick={this.onClearNoti.bind(this)}
          >
            Clear All
          </button>
          <ul class="oui-noti-tray__status-list"></ul>
        </section>
      </aside>
    )
  }

  public demoImport(addStatusDone) {
    if (this.oldStatus !== this.status) {
    this.status.map((noti: StatusType) => {
      const newStatus = document.createElement("li")
      const notiList = document.querySelector(".oui-noti-tray__status-list")
      const statusClass = noti.valence === "success" ? "oui-noti-tray__success-light" : "oui-noti-tray__error-light"
      const iconName = noti.linkType === "href" ? "status-link" : "status-info"
      newStatus.innerHTML = `
        <div class='${statusClass}'></div>
        <div class="oui-noti-tray__status-text-div">
          <p>
            ${noti.notification}
          </p>
        </div>
        <a href="${noti.link}">
          <oui-svg name="${iconName}" scale={0.25}></oui-svg>
        </a>
      `
      notiList.appendChild(newStatus)
      this.counter++
      this.addStatusDone.emit(addStatusDone)
      this.oldStatus = JSON.parse(JSON.stringify(noti))
    })
  }
  }

  private onClearNoti(clearStatusDone) {
    document.querySelector(".oui-noti-tray__status-list").innerHTML = ""
    this.counter = 0
    this.clearStatusDone.emit(clearStatusDone)
  }
}
