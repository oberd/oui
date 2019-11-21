import { UnreachableCaseError } from "../../lib/errors/UnreachableCaseError"

export type IFileUploadStatus = "ready" | "modal-initial" | "modal-dragging" | "modal-dropped" | "modal-invalid-input" | "modal-uploading" | "modal-finished"
export interface IFileUploadState {
    status: IFileUploadStatus
    message?: string
    files?: File[]
}
export type FileUploadAction =
    IInitializeState |
    IInitializeModal |
    IDragStart |
    IDragCancelled |
    IFilesDropped |
    IDroppedBadFiles |
    IUploadStarted |
    IUploadFinished |
    IModalClosed

export type FileUploadActionType = FileUploadAction["type"]

export class FileUploadState {
    private state: IFileUploadState = {
        status: "ready",
    }
    constructor(initial: IFileUploadState) {
        this.dispatch({ type: "initialize-state", state: initial })
    }
    public isUploading() {
        return this.statusIsOneOf("modal-uploading")
    }
    public isModalShowing() {
        return this.statusIsOneOf(
            "modal-initial",
            "modal-invalid-input",
            "modal-dragging",
            "modal-dropped",
            "modal-uploading",
            "modal-finished",
        )
    }
    public dispatch(action: FileUploadAction) {
        const initialState = this.state
        switch (action.type) {
            case "initialize-state":
                this.state = { ...this.state, ...action.state }
                break
            case "initialize-modal":
                this.state = { status: "modal-initial" }
                break
            case "drag-start":
                this.state = { status: "modal-dragging" }
                break
            case "drag-cancelled":
                this.state = { status: "modal-initial" }
                break
            case "dropped-bad-files":
                this.state = { status: "modal-invalid-input", message: action.message }
                break
            case "files-dropped":
                this.state = { status: "modal-dropped", files: action.files }
                break
            case "upload-started":
                this.state = { status: "modal-uploading" }
                break
            case "upload-finished":
                this.state = { status: "modal-finished", message: action.error }
                break
            case "modal-closed":
                this.state = { status: "ready" }
                break
            default:
                throw new UnreachableCaseError(action)
        }
        if (this.state !== initialState) {
            this.changed()
        }
    }
    public isIconHighlighted() {
        return this.statusIsOneOf(
            "modal-dragging",
            "modal-uploading",
        )
    }
    public isIconFannedOut() {
        return this.statusIsOneOf(
            "modal-uploading",
            "modal-dragging",
        )
    }
    public getCurrentMessage() {
        if (this.statusIsOneOf("modal-invalid-input")) {
            return "Invalid Files Dropped: " + this.state.message
        }
        if (this.statusIsOneOf("modal-uploading", "modal-dropped")) {
            return "Uploading..."
        }
        if (this.statusIsOneOf("modal-finished")) {
            if (this.state.message) {
                return "Error During Upload: " + this.state.message
            }
            return "Files Uploaded"
        }
        return "Drop Files Here to Upload"
    }
    public onChange(callback: (state: IFileUploadState) => void) {
        this.callback = callback
        return () => { this.callback = null }
    }
    private callback: (state: IFileUploadState) => void = () => { /** no-op */}
    private changed() {
        this.callback(this.state)
    }
    private statusIsOneOf(...status: IFileUploadStatus[]) {
        return status.includes(this.state.status)
    }
}
interface IInitializeState {
    type: "initialize-state"
    state: Partial<IFileUploadState>
}
interface IInitializeModal {
    type: "initialize-modal"
}
interface IDragStart {
    type: "drag-start"
}
interface IDragCancelled {
    type: "drag-cancelled"
}
interface IFilesDropped {
    type: "files-dropped"
    files: File[]
}
interface IDroppedBadFiles {
    type: "dropped-bad-files"
    message: string
}
interface IUploadStarted {
    type: "upload-started"
}
interface IUploadFinished {
    type: "upload-finished"
    error?: string
}
interface IModalClosed {
    type: "modal-closed"
}
