import { Component, Event, EventEmitter, h, Host } from "@stencil/core"
import { onEscape } from "../../lib/keyboard/KeyCodes"

@Component({
    tag: "oui-file-upload-modal",
    styleUrl: "file-upload-modal.css",
})
export class FileUploadModal {

    /**
     * Emitted when modal is closed via button or esc
     */
    @Event() public close: EventEmitter

    private subscriptions: Array<() => void> = []

    public render() {
        return (
            <Host class="oui-file-upload-modal">
                <heading><slot name="title" /><a onClick={this.handleClose}>Close (esc)</a></heading>
                <div class="oui-file-upload-modal-content">
                    <slot />
                </div>
            </Host>
        )
    }

    public connectedCallback() {
        this.subscriptions.push(onEscape(this.handleClose))
    }
    public disconnectedCallback() {
        this.subscriptions.forEach((s) => s())
        this.subscriptions = []
    }

    private handleClose = () => this.close.emit()
}
