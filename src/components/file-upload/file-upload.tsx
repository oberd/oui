import { Component, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core"
import { DropOrPickEvent, FileUploadHandler } from "./FileUploadHandler"
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
  @Prop() public accept: string = FileUploadHandler.acceptAll

  /**
   * Specify a label for the button.
   */
  @Prop() public btnLabel: string = "Upload"

  /**
   * Specify a title for the modal.
   */
  @Prop() public modalTitle: string = "Upload Files"

  /**
   * Files dropped onto page, and validated. You can use this
   * event to perform an upload in javscript
   */
  @Event() public dropped: EventEmitter<FileUploadHandler>

  @State() public version: number = 0

  private state: FileUploadState = new FileUploadState({ status: "ready" })
  private unsubscribe: () => void
  private inputRef!: HTMLInputElement

  public connectedCallback() {
    this.unsubscribe = this.state.onChange(() => { this.version++ })
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
      <Host>
        <button class="oui-btn oui-btn__primary" onClick={this.handleButtonClick}>
          {this.btnLabel}
        </button>

        {this.renderModal()}

        <slot />
      </Host>
    )
  }

  private renderModal() {
    return this.state.isModalShowing() && (
      <oui-modal onClose={this.handleClose}>
        <span slot="title">{this.modalTitle}</span>

        <div id="oui-file-upload__drop-area" onClick={this.handleDropAreaClick}>
          <oui-documents-icon
            isFannedOut={this.state.isIconFannedOut()}
            isHighlighted={this.state.isIconHighlighted()}
            isAnimating={this.state.isUploading()}
          />

          <div class="file-upload-message">
            {this.state.getCurrentMessage()}
          </div>

          <input
            type="file"
            accept={this.accept}
            multiple
            ref={(el: HTMLInputElement) => { this.inputRef = el }}
            onChange={this.handleFileSelection}
          />
        </div>
      </oui-modal>
    )
  }

  private handleDropAreaClick = (evt: MouseEvent) => {
    evt.stopPropagation()
    this.inputRef.click()
  }

  private handleButtonClick = () => {
    this.dispatchActionType("initialize-modal")
  }

  private handleClose = () => {
    this.dispatchActionType("modal-closed")
  }

  private handleDragExit = () => {
    this.dispatchActionType("drag-cancelled")
  }

  private handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    this.dispatchActionType("drag-start")
  }

  private handleDrop = (evt: DragEvent) => {
    evt.preventDefault()
    this.handleFileSelection(evt)
  }

  private handleFileSelection = (evt: DropOrPickEvent) => {
    try {
      const event = this.makeUploadHandler(evt)
      this.dispatch({ type: "files-dropped", files: event.files })
      this.dropped.emit(event)
    } catch (err) {
      this.dispatch({
        type: "dropped-bad-files",
        message: "only files of type " + this.accept + " are supported",
      })
    }
  }

  private makeUploadHandler(evt: DropOrPickEvent) {
    const files = Array.from(
      (evt instanceof DragEvent)
        ? evt.dataTransfer.files
        : this.inputRef.files,
    )

    const handler = new FileUploadHandler(files, this.accept.split(/[\s]+/))

    handler.onStarted(() => {
      this.dispatchActionType("upload-started")
    })

    handler.onComplete(() => {
      this.dispatchActionType("upload-finished")
      this.inputRef.value = ""
    })

    handler.onError((reason) => {
      this.dispatch({ type: "upload-finished", error: reason })
      this.inputRef.value = ""
    })

    return handler
  }

  private dispatchActionType(type: FileUploadActionType) {
    this.state.dispatch({ type } as FileUploadAction)
  }

  private dispatch(action: FileUploadAction) {
    this.state.dispatch(action)
  }
}
