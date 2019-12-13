import {
  Component,
  h,
  Host,
  Prop,
} from "@stencil/core"

import { NotiMessageProps } from "../status-type"

@Component({
  tag: "oui-noti-drawer",
  styleUrl: "noti-drawer.css",
})
export class NotiDrawer {
  /**
   * Messages array
   */
  @Prop() public messages: NotiMessageProps[] = []

  public render() {
    return (
      <Host>
        <section class="oui-noti-drawer__statuses">
          <button class="oui-noti-drawer__clear">
            Clear All
          </button>

          <ul class="oui-noti-drawer__status-list">
            <li class=".oui-noti-drawer__status-list">
              {
                this.messages.map((msg: NotiMessageProps) => <oui-noti-item message={msg} />)
              }
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
