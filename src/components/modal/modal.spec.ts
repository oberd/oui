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

    const content = page.doc
                      .querySelector("oui-modal")
                      .querySelector("p")
                      .textContent

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

  it("should title on click fire close event", async () => {
    const page = await newSpecPage({
      components: [Modal],
      html: `
        <oui-modal>
          <span slot="title">Modal Title</span>
          <p>Success</p>
        </oui-modal>
      `,
    })

    const modal = page.doc.querySelector("oui-modal")
    let closed = false

    modal.addEventListener("close", () => { closed = true })
    modal.querySelector("header").querySelector("a").click()

    page.waitForChanges()
    expect(closed).toBe(true)
  })
})
