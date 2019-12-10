import { Component, h, Host, Prop } from "@stencil/core"

type DrawerItemAction = (evt: UIEvent) => void

@Component({
  tag: "oui-drawer-item",
  styleUrl: "./drawer-item.css",
})
export class DrawerItem {
  /**
   * Set drawer item label
   */
  @Prop() public label: string

  /**
   * Set drawer item action if string will be treated as a url or as a callback if it is a function
   */
  @Prop() public action: string | DrawerItemAction

  public render() {
    return (
      <Host>
        {
          (typeof this.action === "function")
            ? <span class="oui-drawer-item__label"  onClick={this.action}>{this.label}</span>
            : <a class="oui-drawer-item__label" href={this.action}>{this.label}</a>
        }
      </Host>
    )
  }
}
