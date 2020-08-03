import { Component, ComponentInterface, Host, h, Prop } from "@stencil/core"

import * as Icons from "../../assets/svg"

@Component({
    tag: "oui-icon",
    styleUrl: "oui-icon.css",
    shadow: true,
})
export class OuiIcon implements ComponentInterface {
    @Prop() public icon!: string
    render() {
        return (
            <Host>
                <div innerHTML={Icons[this.icon]} />
            </Host>
        )
    }
}
