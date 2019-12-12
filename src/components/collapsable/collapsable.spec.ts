import { newSpecPage } from "@stencil/core/testing"
import { Collapsable } from "./collapsable"

describe("Test oui-modal component", () => {
  it("should Should render with lable", async () => {
    const page = await newSpecPage({
      components: [Collapsable],
      html: `
        <oui-collapsable label="Collapsable One">
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud e
          </p>
        </oui-collapsable>
      `,
    })

    const cllp = page.doc.querySelector("oui-collapsable") as HTMLOuiCollapsable
    const title = cllp.querySelector(".oui-collapsable__title") as HTMLElement

    expect(title.textContent).toBe("Collapsable One")
  })

  it("should initial state be collapsed", async () => {
    const page = await newSpecPage({
      components: [Collapsable],
      html: `
        <oui-collapsable label="Collapsable One">
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud e
          </p>
        </oui-collapsable>
      `,
    })

    const cllp = page.doc.querySelector("oui-collapsable") as HTMLOuiCollapsable

    // initial state should be collapsed
    expect(cllp.expanded).toBe(false)
  })

  it("should expand collapsable when the title element gets clicked", async () => {
    const page = await newSpecPage({
      components: [Collapsable],
      html: `
        <oui-collapsable label="Collapsable One">
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud e
          </p>
        </oui-collapsable>
      `,
    })

    const cllp = page.doc.querySelector("oui-collapsable") as HTMLOuiCollapsable
    const title = cllp.querySelector(".oui-collapsable__title") as HTMLElement

    // initial state should be collapsed
    expect(cllp.expanded).toBe(false)

    // click on the collapsable to expand it
    title.click()

    // check that the first collapsable is expanded
    page.waitForChanges()
    expect(cllp.expanded).toBe(true)
  })

  it("should a click on title trigger expand event", async () => {
    const fn = jest.fn()
    const page = await newSpecPage({
      components: [Collapsable],
      html: `
        <oui-collapsable label="Collapsable One">
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud e
          </p>
        </oui-collapsable>
      `,
    })

    page.doc.addEventListener("expand", fn)

    const cllp = page.doc.querySelector("oui-collapsable") as HTMLOuiCollapsable
    const title = cllp.querySelector(".oui-collapsable__title") as HTMLElement

    // a click on title should trigger expand event
    title.click()

    page.waitForChanges()

    expect(fn).toBeCalled()
  })

  it("should a click on a expanded collapsable title trigger collapse event", async () => {
    const fn = jest.fn()
    const page = await newSpecPage({
      components: [Collapsable],
      html: `
        <oui-collapsable label="Collapsable One">
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud e
          </p>
        </oui-collapsable>
      `,
    })

    page.doc.addEventListener("collapse", fn)

    const cllp = page.doc.querySelector("oui-collapsable") as HTMLOuiCollapsable
    const title = cllp.querySelector(".oui-collapsable__title") as HTMLElement

    // a click on title should trigger expand event
    title.click()

    page.waitForChanges()

    // confirm that it is expanded
    expect(cllp.expanded).toBe(true)

    // a click on expanded title should trigger collapse event
    title.click()

    page.waitForChanges()

    expect(fn).toBeCalled()
  })
})
