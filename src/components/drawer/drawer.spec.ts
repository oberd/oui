  
import { newSpecPage } from "@stencil/core/testing"
import { Drawer } from "./drawer"

describe("Test oui-drawer component", () => {
    it("should render oui-drawer with drawer-title", async () => {
      const page = await newSpecPage({
        components: [Drawer],
        html: `<oui-drawer drawer-title="Hello Test" />`,
      })

      const cllp = page.doc.querySelector("oui-drawer") as HTMLOuiDrawer
      const title = cllp.querySelector(".oui-drawer__title") as HTMLElement

      expect(title.textContent).toBe("Hello Test")
    })
  })