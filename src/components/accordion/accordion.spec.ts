import { newSpecPage } from "@stencil/core/testing"
import { Accordion } from "./accordion"

describe("Test oui-modal component", () => {
  it("should render oui-accordion", async () => {
    const page = await newSpecPage({
      components: [Accordion],
      html: `<oui-accordion />`,
    })

    const el = page.doc.querySelector("oui-accordion")

    expect(el).not.toBeNull()
  })

  it("should esc key fire close event", async () => {
    const eventSpy = jest.fn()
    const escEvent = new CustomEvent("expand")
    const page = await newSpecPage({
      components: [Accordion],
      html: `<oui-accordion />`,
    })

    // const modal = page.doc.querySelector("oui-modal")
    // page.doc.dispatchEvent(escEvent)
    // expect(eventSpy).toHaveBeenCalled()
  })
})
