import { Component, Event, EventEmitter, h, Host } from "@stencil/core"

@Component({
    tag: "oui-file-upload-modal",
    styleUrl: "file-upload-modal.css",
})
export class FileUploadModal {
    @Event() public close: EventEmitter

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

    private handleClose = () => {
        this.close.emit()
    }
}
