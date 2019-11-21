import { Component, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core"
import { FileDropEvent } from "./FileDropEvent"
import { FileUploadAction, FileUploadActionType, FileUploadState } from "./FileUploadState"

@Component({
  tag: "oui-file-upload",
  styleUrl: "file-upload.css",
})
export class FileUpload {
  /**
   * Specify mime types to accept (unrestricted by default)
   * Separate by spaces for multiple:
   * `text/html text/xml`
   */
  @Prop() public accept: string = FileDropEvent.acceptAll

  /**
   * Files dropped onto page, and validated. You can use this
   * event to perform an upload in javscript
   */
  @Event() public dropped: EventEmitter<FileDropEvent>

  @State() public version: number = 0

  private state: FileUploadState = new FileUploadState({ status: "ready" })
  private unsubscribe: () => void

  constructor() {
    this.state = new FileUploadState({ status: "ready" })
  }

  public connectedCallback() {
    this.unsubscribe = this.state.onChange(() => this.version++)
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

  public render() {
    return (
      <Host class="oui-file-upload">
        <button class="oui-btn oui-btn__primary" onClick={this.handleButtonClick}>Upload</button>
        {this.renderModal()}
        <slot />
      </Host>
    )
  }

  private renderModal() {
    if (!this.state.isModalShowing()) {
      return
    }
    return (
      <oui-file-upload-modal onClose={this.handleClose}>
        <span slot="title">Upload Files</span>
        <div>
          <oui-documents-icon
            isFannedOut={this.state.isIconFannedOut()}
            isHighlighted={this.state.isIconHighlighted()}
            isAnimating={this.state.isUploading()} />
          <div class="file-upload-message">
            {this.state.getCurrentMessage()}
          </div>
        </div>
      </oui-file-upload-modal>
    )
  }

  private handleButtonClick = () => this.dispatchActionType("initialize-modal")

  private handleClose = () => this.dispatchActionType("modal-closed")

  private handleDragExit = () => this.dispatchActionType("drag-cancelled")

  private handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    this.dispatchActionType("drag-start")
  }

  private handleDrop = (e: DragEvent) => {
    e.preventDefault()
    const event = this.makeDropEvent(e)
    if (!event.hasValidFiles) {
      return this.dispatch({
        type: "dropped-bad-files",
        message: "only files of type " + this.accept + " are supported",
      })
    }
    this.dispatch({ type: "files-dropped", files: event.files })
    this.dropped.emit(event)
  }

  private makeDropEvent(e: DragEvent) {
    const event = new FileDropEvent(e, this.accept.split(/[\s]+/))
    event.onStarted(() => this.dispatchActionType("upload-started"))
    event.onComplete(() => this.dispatchActionType("upload-finished"))
    event.onError((reason) => this.dispatch({ type: "upload-finished", error: reason }))
    return event
  }

  private dispatchActionType(type: FileUploadActionType) {
    this.state.dispatch({ type } as FileUploadAction)
  }
  private dispatch(action: FileUploadAction) {
    this.state.dispatch(action)
  }
}
