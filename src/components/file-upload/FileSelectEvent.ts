import { noop } from "../../lib/fn/noop"

export type DropOrPickEvent = DragEvent|MouseEvent

export class FileSelectEvent {
  public static acceptAll = "*/*"
  public readonly hasValidFiles: boolean
  public readonly files: File[] = []
  public uploadStarted = noop
  public uploadCompleted = noop
  public uploadErrored: (reason?: string) => void = noop

  constructor(input: HTMLInputElement, private acceptedTypes: string[]) {
    this.acceptedTypes = acceptedTypes
    this.hasValidFiles = this.dropHasValidFiles(input)

    if (!this.hasValidFiles) { return }

    this.files = Array.from(input.files)
  }

  public async uploadWith<T = any | void>(fetch: (formData: FormData) => Promise<T>): Promise<T> {
    this.uploadStarted()
    return fetch(this.toFormData())
      .then((val) => { this.uploadCompleted(); return val })
      .catch((e: any) => { this.uploadErrored(e.toString()); throw e })
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
    this.files.forEach((file) => formData.append(key, file))
    return formData
  }

  private dropHasValidFiles(input: HTMLInputElement) {
    const validFileCount = Array.from(input.files).filter(this.isValidFile).length
    return (validFileCount > 0)
  }

  private isValidFile = (file: File) => {
    return this.doesAcceptMimeType(file.type)
  }

  private doesAcceptMimeType(mimeType: string) {
    if (this.acceptedTypes.includes(FileSelectEvent.acceptAll)) {
      return true
    }
    return this.acceptedTypes.includes(mimeType)
  }
}
