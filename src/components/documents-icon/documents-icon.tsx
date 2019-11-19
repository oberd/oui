import { Component, h, Host, Prop } from "@stencil/core"
import { joinFilteredKeys } from "../../lib/strings/joinFilteredKeys"

const placeholderStyles = [
    { width: (10 + (Math.random() * 60)) + "%" },
    { width: (10 + (Math.random() * 60)) + "%" },
    { width: (10 + (Math.random() * 60)) + "%" },
]

@Component({
    tag: "oui-documents-icon",
    styleUrl: "documents-icon.css",
})
export class DocumentsIcon {
    @Prop() public isFannedOut = true
    @Prop() public isHighlighted = false
    @Prop() public isAnimating = false

    public render() {
        const className = joinFilteredKeys({
            "oui-documents-icon": true,
            "is-fanned": this.isFannedOut,
            "is-highlighted": this.isHighlighted,
            "is-animating": this.isAnimating,
        })
        return (
            <Host class={className}>
                {this.renderDocuments()}
            </Host>
        )
    }

    private renderDocuments() {
        return Array.from("   ").map((_, i: number) => {
            return (
                <div class={`document-${i}`}>
                    <div class="oui-documents-icon-content">
                        <div class="scanner"></div>
                        {placeholderStyles.map((style) => {
                            return <div style={style} class="doc-line"></div>
                        })}
                    </div>
                </div>
            )
        })
    }
}
