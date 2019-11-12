import { Component, h, Host } from "@stencil/core"

@Component({
    tag: "oui-card-heading",
    styleUrl: "card-heading.css",
})
export class CardHeading {
    public render() {
        return (
            <Host class="oui-card-heading">
                <slot />
            </Host>
        )
    }
}
