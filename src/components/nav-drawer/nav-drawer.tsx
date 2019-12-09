import { Component, h, Host, Method, Prop, State } from "@stencil/core"

@Component({
  tag: "nav-drawer",
  styleUrl: "./nav-drawer.css",
})
export class NavDrawer {

  @Prop() public title: string
  @Prop() public opened: boolean

  @State() public showContactInfo = false

  @Method()
  public async open() {
    this.opened = true
  }

  public render() {
    return (
      <Host opened={this.opened}>
        <div class="backdrop" onClick={this.onCloseDrawer} />
        <aside>
          <header>
            <h1>{this.title}</h1>
            <button onClick={this.onCloseDrawer}>
              <oui-svg name="icon-close" scale={1} />
            </button>
          </header>
          <slot  />
        </aside>
      </Host>
    )
  }

  private onCloseDrawer = () => {
    this.opened = false
  }
}
