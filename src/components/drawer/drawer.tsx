import { Component, Event, EventEmitter, h, Host, Prop, Watch } from "@stencil/core"

@Component({
  tag: "oui-drawer",
  styleUrl: "./drawer.css",
})
export class Drawer {
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
  @Prop() public open: boolean

  /**
   * Set drawer size
   */
  @Prop() public size: string = "auto"

  /**
   * Triggered when the drawer close
   */
  @Event() public closed: EventEmitter

   /**
    * Triggered when the drawer open
    */
  @Event() public opened: EventEmitter

  @Watch("open")
  public openhandler(newValue: boolean) {
    if (newValue === true) {
      this.opened.emit()
    }
  }

  public render() {
    const cls = (this.position === "right") ? "reverse" : "default"
    return (
      <Host opened={this.open} class={cls}>
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
    /** TODO: it is possible to implement preventDefault() ???? */
    this.closed.emit()
    this.open = false
  }
}
