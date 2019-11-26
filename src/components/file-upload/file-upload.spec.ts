import { newSpecPage } from "@stencil/core/testing"
import { FileUpload } from "./file-upload"

describe("Test oui-file-upload component", () => {
  it("should render oui-file-upload with content", async () => {
    const page = await newSpecPage({
      components: [FileUpload],
      html: `
        <oui-file-upload>
          <p>Success</p>
        </oui-file-upload>
      `,
    })

    const content = page.doc
      .querySelector("oui-file-upload")
      .querySelector("p")
      .textContent

    expect(content).toBe("Success")
  })

  it("should render oui-file-upload with title", async () => {
    const page = await newSpecPage({
      components: [FileUpload],
      html: `
        <oui-file-upload btn-label="Click Here">
          <p>Success</p>
        </oui-file-upload>
      `,
    })

    const content = page.doc
      .querySelector("oui-file-upload")
      .querySelector("button")
      .textContent

    expect(content).toBe("Click Here")
  })

  it("should render file-upload modal on button click", async () => {
    const page = await newSpecPage({
      components: [FileUpload],
      html: `
        <oui-file-upload>
          <p>Success</p>
        </oui-file-upload>
      `,
    })

    page.doc
      .querySelector("oui-file-upload")
      .querySelector("button")
      .click()

    await page.waitForChanges()

    const modal = page.doc.querySelector("#oui-file-upload__drop-area")

    expect(modal).not.toBeNull()
  })

  it("should render file-upload modal on dragover", async () => {
    const dragEvent = new MouseEvent("dragover")
    const page = await newSpecPage({
      components: [FileUpload],
      html: `
        <oui-file-upload>
          <p>Success</p>
        </oui-file-upload>
      `,
    })

    page.doc.dispatchEvent(dragEvent)

    await page.waitForChanges()

    const modal = page.doc.querySelector("#oui-file-upload__drop-area")
    expect(modal).not.toBeNull()
  })
})
