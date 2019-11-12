import { Component, h, Host } from "@stencil/core"

@Component({
    tag: "oui-card",
    styleUrl: "card.css",
})
export class Card {
    public render() {
        return (
            <Host class="oui-card">
                <slot />
            </Host>
        )
    }
}
