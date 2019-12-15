import { newSpecPage } from "@stencil/core/testing"
import { Drawer } from "./drawer"

describe("Test oui-drawer component", () => {
  it("should render oui-drawer with drawer-title", async () => {
    const page = await newSpecPage({
      components: [Drawer],
      html: `<oui-drawer drawer-title="Hello Test" />`,
    })

    const cllp = page.doc.querySelector("oui-drawer")
    const title = cllp.querySelector(".oui-drawer__title") as HTMLElement

    expect(title.textContent).toBe("Hello Test")
  })

  it("should opened prop be true", async () => {
    const page = await newSpecPage({
      components: [Drawer],
      html: `<oui-drawer opened />`,
    })

    const cllp = page.doc.querySelector("oui-drawer")

    expect(cllp.opened).toBe(true)
  })

  it("should position=right add class reverse", async () => {
    const page = await newSpecPage({
      components: [Drawer],
      html: `<oui-drawer position="right" />`,
    })

    const cllp = page.doc.querySelector(".reverse")

    expect(cllp).not.toBeNull()
  })

  it("should prop size=20em set width to 20em to element aside", async () => {
    const page = await newSpecPage({
      components: [Drawer],
      html: `<oui-drawer size="20em" />`,
    })

    const cllp = page.doc.querySelector("aside")

    expect(cllp.style.width).toBe("20em")
  })

  it("should emit open event", async () => {
    const page = await newSpecPage({
      components: [Drawer],
      html: `<oui-drawer />`,
    })

    const fn = jest.fn()
    const cllp = page.doc.querySelector("oui-drawer")

    cllp.addEventListener("open", fn)

    cllp.opened = true

    page.waitForChanges()

    expect(fn).toBeCalled()
  })

  it("should emit close event", async () => {
    const page = await newSpecPage({
      components: [Drawer],
      html: `<oui-drawer opened/>`,
    })

    const fn = jest.fn()
    const cllp = page.doc.querySelector("oui-drawer")

    cllp.addEventListener("close", fn)

    cllp.opened = false

    page.waitForChanges()

    expect(fn).toBeCalled()
  })

  it("should emit close event whenthe backdrop is clicked", async () => {
    const page = await newSpecPage({
      components: [Drawer],
      html: `<oui-drawer opened/>`,
    })

    const fn = jest.fn()
    const cllp: HTMLElement = page.doc.querySelector("oui-drawer") as HTMLElement
    const backdrop: HTMLElement = cllp.querySelector(".backdrop") as HTMLElement

    cllp.addEventListener("close", fn)
    backdrop.click()

    page.waitForChanges()

    expect(fn).toBeCalled()
  })
})
