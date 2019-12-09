import { Component, h, Host, Method, Prop, State } from "@stencil/core"

@Component({
  tag: "nav-drawer",
  styleUrl: "./nav-drawer.css",
})
export class NavDrawer {

  @Prop() public title: string
  @Prop() public position: string = "left"
  @Prop() public opened: boolean

  @State() public showContactInfo = false

  @Method()
  public async open() {
    this.opened = true
  }

  public render() {
    const cls = (this.position === "right") ? "reverse" : ""

    return (
      <Host opened={this.opened} class={cls}>
        <div class="backdrop" onClick={this.onCloseDrawer} />
        <aside>
          <header class={cls}>
            <h1>{this.title}</h1>
            <oui-svg name="icon-close" scale={1} onClick={this.onCloseDrawer} />
          </header>
          <slot />
        </aside>
      </Host>
    )
  }

  private onCloseDrawer = () => {
    this.opened = false
  }
}
