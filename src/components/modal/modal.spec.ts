import { newSpecPage } from "@stencil/core/testing"
import { Modal } from "./modal"

describe("Test oui-modal component", () => {
  it("should render oui-modal with content", async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
        <oui-modal>
          <p>Success</p>
        </oui-modal>
      `,
    })

    const content = page.doc.querySelector("oui-modal").querySelector("p").textContent

    expect(content).toBe("Success")
  })

  it("should render oui-modal with header", async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
        <oui-modal>
          <span slot="title">Modal Title</span>
          <p>Success</p>
        </oui-modal>
      `,
    })

    const titleContent = page.doc
                          .querySelector("oui-modal")
                          .querySelector("header")
                          .querySelector(".oui-modal__title")
                          .textContent

    expect(titleContent).toBe("Modal Title")
  })
})
