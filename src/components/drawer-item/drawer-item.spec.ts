import { newSpecPage } from "@stencil/core/testing"
import { DrawerItem } from "./drawer-item"

describe("Test oui-modal component", () => {
  it("should render oui-draw-item with label", async () => {
    const page = await newSpecPage({
      components: [DrawerItem],
      html: `<oui-drawer-item label="Hello Test" />`,
    })

    const content = page.doc
      .querySelector("oui-drawer-item")
      .childNodes

    expect(content[0].textContent).toBe("Hello Test")
  })

  it("should render oui-draw-item as a link (a tag)", async () => {
    const page = await newSpecPage({
      components: [DrawerItem],
      html: `<oui-drawer-item label="Hello Test" link="https://ubuntu.com" />`,
    })

    const content = page.doc
      .querySelector("oui-drawer-item")
      .querySelector("a")

    expect(content).not.toBeNull()
  })

  it("should render oui-draw-item with the a tag href to match link prop", async () => {
    const page = await newSpecPage({
      components: [DrawerItem],
      html: `<oui-drawer-item label="Hello Test" link="https://ubuntu.com" />`,
    })

    const content = page.doc
      .querySelector("oui-drawer-item")
      .querySelector("a")

    expect(content.href).toBe("https://ubuntu.com/")
  })

  it("should render oui-draw-item with with target and rel attributes", async () => {
    const page = await newSpecPage({
      components: [DrawerItem],
      html: `<oui-drawer-item label="Hello Test" link="https://ubuntu.com" external />`,
    })

    const content = page.doc
      .querySelector("oui-drawer-item")
      .querySelector("a")

    const attrVals = `${content.getAttribute("target")} ${content.getAttribute("rel")}`
    expect(attrVals).toBe("_blank noopener noreferrer")
  })
})
