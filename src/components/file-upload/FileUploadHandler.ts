import { noop } from "../../lib/fn/noop"

export type DropOrPickEvent = DragEvent|MouseEvent

export class FileUploadHandler {
  public static acceptAll = "*/*"
  public readonly files: File[] = []
  public uploadStarted = noop
  public uploadCompleted = noop
  public uploadErrored: (reason?: string) => void = noop

  constructor(files: File[], private acceptedTypes: string[]) {
    this.acceptedTypes = acceptedTypes

    if (!this.selectionHasValidFiles(files)) {
      throw new Error("Invalid files")
    }

    this.files = files
  }

  public async uploadWith<T = any | void>(fetch: (formData: FormData) => Promise<T>): Promise<T> {
    this.uploadStarted()
    return fetch(this.toFormData())
      .then((val) => {
        this.uploadCompleted()
        return val
      })
      .catch((err: any) => {
        this.uploadErrored(err.toString())
        throw err
      })
  }

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
    this.files.forEach((file) => { formData.append(key, file) })
    return formData
  }

  private selectionHasValidFiles(files: File[]) {
    const validFileCount = files.filter(this.isValidFile).length
    return (validFileCount > 0)
  }

  private isValidFile = (file: File) => {
    return this.doesAcceptMimeType(file.type)
  }

  private doesAcceptMimeType(mimeType: string) {
    return (
      this.acceptedTypes.includes(FileUploadHandler.acceptAll) ||
      this.acceptedTypes.includes(mimeType)
    )
  }
}
