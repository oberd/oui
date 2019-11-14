
export class FileUploadEvent {
    private static acceptAll = "*/*"
    public readonly hasValidFiles: boolean
    public readonly files: File[] = []
    constructor(event: DragEvent, private acceptedTypes: string[] = [FileUploadEvent.acceptAll]) {
        this.acceptedTypes = acceptedTypes
        this.hasValidFiles = this.dropHasValidFiles(event)
        if (!this.hasValidFiles) {
            return
        }
        this.files = this.eventToFilesArray(event)
    }
    public async uploadWith<T= any | void>(fetch: (formData: FormData) => Promise<T>): Promise<T> {
        this.uploadStarted()
        return fetch(this.toFormData())
            .then((val) => { this.uploadCompleted(); return val })
            .catch((e: any) => { this.uploadErrored(e.toString()); throw e })
    }
    public uploadStarted: () => void = () => { /** no-op */}
    public uploadCompleted: () => void = () => { /** no-op */ }
    public uploadErrored: (reason?: string) => void = () => { /** no-op */ }
    public onStarted(callback: () => void) {
        this.uploadStarted = callback
    }
    public onComplete(callback: () => void) {
        this.uploadCompleted = callback
    }
    public onError(callback: (reason?: string) => void) {
        this.uploadErrored = callback
    }
    public toFormData(key: string = "files") {
        const formData = new FormData()
        this.files.forEach((file) => formData.append(key, file))
        return formData
    }
    private dropHasValidFiles(e: DragEvent) {
        const files = e.dataTransfer.files
        if (!files.length) {
            return false
        }
        for (let i = 0; i < files.length; i++) {
            if (!this.isValidFile(files.item(i))) {
                return false
            }
        }
        return true
    }

    private eventToFilesArray(e: DragEvent) {
        const files: File[] = []
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            files.push(e.dataTransfer.files.item(i))
        }
        return files
    }

    private isValidFile(file: File) {
        return this.doesAcceptMimeType(this.fileTypeToMimeType(file.type))
    }

    private doesAcceptMimeType(mimeType: string) {
        if (this.acceptedTypes.includes(FileUploadEvent.acceptAll)) {
            return true
        }
        return this.acceptedTypes.includes(this.fileTypeToMimeType(mimeType))
    }

    private fileTypeToMimeType(type: string) {
        return type
    }
}
