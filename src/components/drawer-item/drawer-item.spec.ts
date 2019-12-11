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
})
