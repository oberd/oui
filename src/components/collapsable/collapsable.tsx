import { Component, h, Host, Prop } from "@stencil/core"

@Component({
  tag: "oui-collapsable",
  styleUrl: "./collapsable.css",
})
export class Collapsable {
  /**
   * Set drawer drawerTitle
   */
  @Prop() public label: string

  /**
   * Set drawer position to right or left
   */
  @Prop() public collapsed: boolean = false


  public render() {
    return (
      <Host collapsed={this.collapsed}>
        <div class="oui-collapsable__title" onClick={this.toggle}>
          <oui-svg name="icon-varrow" scale={0.45}  />
          <span>{this.label}</span>
        </div>
        <section class="oui-collapsable__content">
          <slot />
        </section>
      </Host>
    )
  }

  private toggle = () => {
    this.collapsed = !this.collapsed
  }
}
