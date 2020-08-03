import { Component, ComponentInterface, Host, h, Element, Prop } from "@stencil/core"
import { withAttributes } from "../../dom/withAttributes"

@Component({
    tag: "oui-btn",
    styleUrl: "oui-btn.css",
    shadow: true,
})
export class OuiBtn implements ComponentInterface {
    @Element() private ref: HTMLElement
    @Prop() public type: "button" | "submit" = "button"
    render() {
        return (
            <Host>
                <button {...withAttributes(this.ref)}>
                    <slot></slot>
                </button>
            </Host>
        )
    }
}
