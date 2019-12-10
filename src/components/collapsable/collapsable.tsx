import { Component, Event, EventEmitter, h, Host, Prop } from "@stencil/core"

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
  @Prop() public expanded: boolean = false

  /**
   * Triggered when item collaspes
   */
  @Event() public collapse: EventEmitter

  /**
   * Triggered when the item expands
   */
  @Event() public expand: EventEmitter

  public render() {
    return (
      <Host expanded={this.expanded}>
        <div class="oui-collapsable__title" onClick={this.toggle}>
          <oui-svg name="icon-varrow" scale={0.45} />
          <span>{this.label}</span>
        </div>
        <section class="oui-collapsable__content">
          <slot />
        </section>
      </Host>
    )
  }

  private toggle = () => {
    this.expanded = !this.expanded

    if (!this.expanded) {
      this.collapse.emit()
      return
    }

    this.expand.emit()
  }
}
