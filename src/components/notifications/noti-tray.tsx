import { Component, Event, EventEmitter, h, Method, Prop, State } from "@stencil/core"

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

  @Prop({ reflectToAttr: true, mutable: true }) public opened = false
  @Prop({ reflectToAttr: true, mutable: true }) public status: string =
    "placeholder"
  @Prop({ reflectToAttr: true, mutable: true }) public link: string =
    "https://placeholder.com"
  @Prop({ reflectToAttr: true, mutable: true }) public info: string =
    "placeholder"
  @Prop({ reflectToAttr: true, mutable: true }) public linkType: string =
    "href"
  @Prop({ reflectToAttr: true, mutable: true }) public valence: string =
    "success"

  @State() private counter = 0

  public componentDidLoad() {
    setInterval(this.demoImport.bind(this), 60000)
  }

  // public componentDidUnload() {
  //   this.onClearNoti.bind(this)
  // }

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
        <header>
          <button
            class="oui-noti-tray__clear"
            onClick={this.onClearNoti.bind(this)}
          >
            Clear All
          </button>
        </header>
        <section class="oui-noti-tray__statuses">
          <ul class="oui-noti-tray__status-list"></ul>
        </section>
      </aside>
    )
  }

  private demoImport(addDone) {
    const newStatus = document.createElement("li")
    const notiList = document.querySelector(".oui-noti-tray__status-list")

    switch (true) {
      case this.valence === "success":
        newStatus.innerHTML =
          `
          <div class="oui-noti-tray__success-light"></div>
          <div class="oui-noti-tray__status-text-div"><p>` +
          this.status +
          `
          </p></div><a href="` +
          this.link +
          `"><oui-svg name="status-link" scale={0.25}></oui-svg></a>
        `

      default:
        newStatus.innerHTML =
          `
          <div class="oui-noti-tray__error-light"></div>
          <div class="oui-noti-tray__status-text-div"><p>` +
          this.info +
          `
          </p></div><a href="` +
          this.link +
          `"><oui-svg name="status-info" scale={0.25}></oui-svg></a>
        `
        break
    }

    notiList.appendChild(newStatus)
    this.addStatusDone.emit(addDone)
    this.counter += 1
  }

  private onClearNoti() {
    document.querySelector(".oui-noti-tray__status-list").innerHTML = ""
    this.counter = 0
  }
}
