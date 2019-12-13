import {
  Component,
  // Event,
  // EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch
} from "@stencil/core"

// import { StatusType } from "./status-type"

@Component({
  tag: "oui-noti-tray",
  styleUrl: "noti-tray.css",
})
export class NotiTray {
  @Prop({ reflect: true, mutable: true }) public opened = false
  @Prop({ reflect: true, mutable: true }) public status: object[]

  @State() private counter: number = 0
  @State() private oldStatus: object[]

  // public componentWillLoad() {
  //   // setInterval(this.demoImport.bind(this), 60000)
  // }

  @Watch("opened")
  public openedChange(newValue: boolean, oldValue: boolean) {
    console.log(newValue, oldValue)
  }

  @Watch("status")
  public stausChange(newValue: boolean, oldValue: boolean) {
    console.log(newValue, oldValue)
  }

  public render() {
    return (
      <Host>
        {
          (this.opened && this.status.length) &&
          <aside>
            <section class="oui-noti-tray__statuses">
              <button
                class="oui-noti-tray__clear"
                onClick={this.onClearNoti.bind(this)}
              >
                Clear All
              </button>
              <ul class="oui-noti-tray__status-list">
              </ul>
            </section>
          </aside>
        }
        <oui-noti-button />
      </Host>
    )
  }

  private onClearNoti() {
    document.querySelector(".oui-noti-tray__status-list").innerHTML = ""
    this.counter = 0
  }

  private open() {
    if (!this.opened) {
      this.opened = true
      document.querySelector("aside").style.height = "17.6875em"
      document.querySelector("aside").style.transform = "translateY(0px)"
      return
    }

    this.opened = false
    document.querySelector("aside").style.height = "0"
    document.querySelector("aside").style.transform = "translateY(-0px)"
  }

  // public demoImport(addStatusDone) {
  //   if (this.oldStatus !== this.status) {
  //     this.status.map((noti: StatusType) => {
  //       const newStatus = document.createElement("li")
  //       const notiList = document.querySelector(".oui-noti-tray__status-list")
  //       const iconName = noti.linkType === "href" ? "status-link" : "status-info"
  //       const statusClass =  (noti.valence === "success")
  //          ? "oui-noti-tray__success-light"
  //          : "oui-noti-tray__error-light"
  //       newStatus.innerHTML = `
  //       <div class='${statusClass}'></div>
  //       <div class="oui-noti-tray__status-text-div">
  //         <p>
  //           ${noti.notification}
  //         </p>
  //       </div>
  //       <a href="${noti.link}">
  //         <oui-svg name="${iconName}" scale={0.25}></oui-svg>
  //       </a>
  //     `
  //       notiList.appendChild(newStatus)
  //       this.counter++
  //       this.addStatusDone.emit(addStatusDone)
  //       this.oldStatus = JSON.parse(JSON.stringify(noti))
  //     })
  //   }
  // }
}
