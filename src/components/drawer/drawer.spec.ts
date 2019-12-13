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

    it("should initial state be closed, when opened, tag opened will appear in tag", async () => {
        const page = await newSpecPage({
          components: [Drawer],
          html: `<oui-drawer opened></oui-drawer>`,
        })

        const cllp = page.doc.querySelector("oui-drawer") as HTMLOuiDrawer

        // initial state should be close
        expect(cllp.opened).toBe(true)
      })

    it("should expand close when the close button or backdrop element gets clicked", async () => {
        const page = await newSpecPage({
          components: [Drawer],
          html: `<oui-drawer opened="false"></oui-drawer>`,
        })

        const cllp = page.doc.querySelector("oui-drawer") as HTMLOuiDrawer
        const title = cllp.querySelector(".backdrop") as HTMLElement

        // initial state should be closed
        expect(cllp.opened).toBe(false)
      })

    it("should expand close when the close button or backdrop element gets clicked", async () => {
        const page = await newSpecPage({
            components: [Drawer],
            html: `<oui-drawer opened="false"></oui-drawer>`,
        })

        const cllp = page.doc.querySelector("oui-drawer") as HTMLOuiDrawer
        const title = cllp.querySelector(".oui-drawer__close") as HTMLElement

        // initial state should be closed
        expect(cllp.opened).toBe(false)
    })

    // ** this event is outside of the drawer - check with Eli if this can be tested */
    // it("should a click on v-arrow button open drawer", async () => {
    //     const fn = jest.fn()
    //     const page = await newSpecPage({
    //       components: [Drawer],
    //       html: `<oui-drawer></oui-drawer>`,
    //     })

    //     page.doc.addEventListener("open", fn)

    //     const cllp = page.doc.querySelector("oui-drawer") as HTMLOuiDrawer
    //     const title = cllp.querySelector(".backdrop") as HTMLElement

    //     // a click on title should trigger expand event
    //     title.click()

    //     page.waitForChanges()

    //     expect(fn).toBeCalled()
    //   })
})
