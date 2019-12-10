import { Component, h, Host, Prop } from "@stencil/core"

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
   * Set drawer item link if string will be treated as a url or as a callback if it is a function
   */
  @Prop() public link: string


  public render() {
    return (
      <Host>
        {
          this.link
            ? <a class="oui-drawer-item__label" href={this.link}>{this.label}</a>
            : <span class="oui-drawer-item__label">{this.label}</span>
        }
      </Host>
    )
  }
}
