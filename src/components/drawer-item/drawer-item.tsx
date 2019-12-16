import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "oui-drawer-item",
  styleUrl: "./drawer-item.css",
})
export class DrawerItem {
  /**
   * Set drawer item link if string will be treated as a url or as a callback if it is a function
   */
  @Prop() public link: string

  /**
   * Open link in a new tab. Only for links
   */
  @Prop() public external: boolean

  public render() {
    const extraProps = this.external ? { target: "_blank", rel: "noopener noreferrer" } : {}

    return (
      <Host>
        {
          this.link
            ? <a class="oui-drawer-item__label" href={this.link} {...extraProps}><slot /></a>
            : <span class="oui-drawer-item__label"><slot /></span>
        }
      </Host>
    )
  }
}
