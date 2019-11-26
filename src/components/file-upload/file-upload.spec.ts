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
})
