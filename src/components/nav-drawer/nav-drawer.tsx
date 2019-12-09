import { Component, h, Host, Method, Prop, State } from "@stencil/core"

@Component({
  tag: "nav-drawer",
  styleUrl: "./nav-drawer.css",
})
export class NavDrawer {

  @Prop() public navTitle: string
  @Prop() public opened: boolean

  @State() public showContactInfo = false

  @Method()
  public open() {
    this.opened = true
  }

  public render() {
    return (
      <Host>
        <div class="backdrop" onClick={this.onCloseDrawer} />
        <aside>
          <header>
            <h1>{this.navTitle}</h1>
            <button onClick={this.onCloseDrawer}>X</button>
          </header>
          <slot  />
        </aside>
      </Host>
    )
  }

  private onCloseDrawer = () => {
    this.opened = false
  }

  private onContentChange(content: string) {
    this.showContactInfo = content === "contact"
  }
}
