import { Component, Event, EventEmitter, h, Host, Prop, State, Watch } from "@stencil/core"
import { FileUploadEvent } from "./FileUploadEvent"
import { FileUploadAction, FileUploadActionType, FileUploadState } from "./FileUploadState"

/**
 * Usage:
 *
 * (this will place a button on the page, but drag and drop is enabled globally on the page)
 * <oui-file-upload id="my-files"></oui-file-upload>
 * <script>
    const el = document.getElementById("files")
    el.addEventListener("dropped", async (formData) => {
        el.isUploading = true
        await fetch("/my-upload", { body: formData })
        el.isUploading = false
    })
  </script>
 */

@Component({
    tag: "oui-file-upload",
    styleUrl: "file-upload.css",
})
export class FileUpload {

    @Prop() public accept: string
    @Prop() public isUploading: boolean = false

    @Event() public dropped: EventEmitter<FileUploadEvent>

    @State() public version: number = 0

    private state: FileUploadState = new FileUploadState({ status: "ready" })
    private unsubscribe: () => void

    constructor() {
        this.state = new FileUploadState({ status: "ready" })
    }

    public render() {
        return (
            <Host class="oui-file-upload">
                <button onClick={this.handleButtonClick}>Upload</button>
                {this.state.isModalShowing() ? (
                    <oui-file-upload-modal onClose={this.handleClose}>
                        <span slot="title">Upload a File</span>
                        {this.renderModalContent()}
                    </oui-file-upload-modal>
                ) : undefined}
                <slot />
            </Host>
        )
    }

    public connectedCallback() {
        this.unsubscribe = this.state.onChange(() => {
            this.version++
        })
        this.dispatch({ type: "initialize-state", state: { status: "ready" } })
        document.addEventListener("dragover", this.handleDragOver)
        document.addEventListener("dragexit", this.handleDragExit)
        document.addEventListener("dragleave", this.handleDragExit)
        document.addEventListener("drop", this.handleDrop)
    }

    public disconnectedCallback() {
        document.removeEventListener("dragover", this.handleDragOver)
        document.removeEventListener("dragexit", this.handleDragExit)
        document.removeEventListener("dragleave", this.handleDragExit)
        document.removeEventListener("drop", this.handleDrop)
        this.unsubscribe()
    }

    public handleClose = () => {
        this.dispatchActionType("modal-closed")
    }

    public handleDragExit = () => this.dispatchActionType("drag-cancelled")
    public handleDragOver = (e: DragEvent) => {
        e.preventDefault()
        this.dispatchActionType("drag-start")
    }

    public handleDrop = (e: DragEvent) => {
        e.preventDefault()
        const event = new FileUploadEvent(e, (this.accept || "*/*").split(/[\s]+/))
        if (!event.hasValidFiles) {
            return this.dispatch({
                type: "dropped-bad-files",
                message: "only files of type " + this.accept + " are supported",
            })
        }
        this.dispatch({ type: "files-dropped", files: event.files })
        event.onStarted(() => {
            this.dispatchActionType("upload-started")
        })
        event.onComplete(() => {
            this.dispatchActionType("upload-finished")
        })
        event.onError((reason) => {
            this.dispatch({ type: "upload-finished", error: reason })
        })
        this.dropped.emit(event)
    }

    public handleButtonClick = () => {
        this.dispatchActionType("initialize-modal")
    }

    @Watch("isUploading")
    public uploadingChanged(newValue: boolean, oldValue: boolean) {
        if (newValue && !oldValue) {
            this.dispatchActionType("upload-started")
        }
        if (!newValue && oldValue) {
            this.dispatchActionType("upload-finished")
        }
    }

    private dispatchActionType(type: FileUploadActionType) {
        this.state.dispatch({ type } as FileUploadAction)
    }
    private dispatch(action: FileUploadAction) {
        this.state.dispatch(action)
    }

    private renderModalContent() {
        return (
            <div>
                <oui-documents-icon
                    isFannedOut={this.state.isIconFannedOut()}
                    isHighlighted={this.state.isIconHighlighted()}
                    isAnimating={this.state.isUploading()} />
                <div class="file-upload-message">{this.state.getCurrentMessage()}</div>
            </div>
        )
    }
}
