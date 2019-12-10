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
  @Prop() public opened: boolean

  /**
   * Set drawer size
   */
  @Prop() public size: string = "auto"

  /**
   * Triggered when the drawer close
   */
  @Event() public close: EventEmitter

   /**
    * Triggered when the drawer open
    */
  @Event() public open: EventEmitter

  @Watch("opened")
  public openhandler(newValue: boolean) {
    if (newValue) {
      this.open.emit()
    }
  }

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
    /** TODO: it is possible to implement preventDefault() ???? */
    this.close.emit()
    this.opened = false
  }
}
