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
    const eventSpy = jest.fn()
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
    modal.addEventListener("close", eventSpy)
    modal.querySelector("header").querySelector("a").click()
    expect(eventSpy).toHaveBeenCalled()
  })

  it("should esc key fire close event", async () => {
    const eventSpy = jest.fn()
    const escEvent = new KeyboardEvent("keydown", { keyCode: 27 } as KeyboardEventInit)
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
    modal.addEventListener("close", eventSpy)
    page.doc.dispatchEvent(escEvent)
    expect(eventSpy).toHaveBeenCalled()
  })
})
