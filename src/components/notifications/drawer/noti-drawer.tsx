import {
  Component,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from "@stencil/core"

@Component({
  tag: "oui-noti-drawer",
  styleUrl: "noti-drawer.css",
})
export class NotiDrawer {
  public render() {
    return (
      <Host>
        <section class="oui-noti-drawer__statuses">
          <button class="oui-noti-drawer__clear">
            Clear All
          </button>

          <ul class="oui-noti-drawer__status-list">
            <li class=".oui-noti-drawer__status-list">
              <div class="oui-noti-drawer__success-light"></div>
              <div class="oui-noti-drawer__status-text-div">
                <p>
                  Hello
                </p>
              </div>
              <a href="${noti.link}">
                <oui-svg name="status-link" scale={0.25}></oui-svg>
              </a>
            </li>
          </ul>
        </section>
      </Host>
    )
  }
}

  //     this.status.map((noti: StatusType) => {
  //       const iconName = noti.linkType === "href" ? "status-link" : "status-info"
  //       const statusClass =  (noti.valence === "success")
  //          ? "oui-noti-drawer__success-light"
  //          : "oui-noti-drawer__error-light"
