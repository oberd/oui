import { Component, Element, h, Host, Listen } from "@stencil/core"

@Component({
  tag: "oui-accordion",
})
export class Accordion {
  @Element() private self: HTMLElement

  public render() {
    return (
      <Host>
        <slot />
      </Host>
    )
  }

  @Listen("expand")
  private expandHandler(evt: CustomEvent) {
    const target = evt.target as HTMLOuiCollapsableElement

    this.self.querySelectorAll("oui-collapsable").forEach((el: HTMLOuiCollapsableElement) => {
      if (el.label !== target.label) {
        el.expanded = false
      }
    })
  }
}