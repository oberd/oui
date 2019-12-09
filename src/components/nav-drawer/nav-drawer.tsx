import { Component, h, Host, Method, Prop, State } from "@stencil/core"

@Component({
  tag: "nav-drawer",
  styleUrl: "./nav-drawer.css",
})
export class NavDrawer {
  /**
   * Set drawer drawerTitle
   */
  @Prop() public drawerTitle: string

  /**
   * Set drawer position to right or left
   */
  @Prop() public position: string = "left"

  /**
   * Open and close drawer
   */
  @Prop() public opened: boolean

  /**
   * Set drawer size
   */
  @Prop() public size: string = "auto"

  @State() public showContactInfo = false

  public render() {
    const cls = (this.position === "right") ? "reverse" : "default"
    return (
      <Host opened={this.opened} class={cls}>
        <div class="backdrop" onClick={this.onCloseDrawer} />
        <aside style={{ width: this.size }}>
          <header class={cls}>
            <h1>{this.drawerTitle}</h1>
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
