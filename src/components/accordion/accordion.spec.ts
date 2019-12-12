import { newSpecPage } from "@stencil/core/testing"
import { Collapsable } from "../collapsable/collapsable"
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

  it("should collapse expanded child collapsables", async () => {
    const page = await newSpecPage({
      components: [Accordion, Collapsable],
      html: `
      <oui-accordion>
        <oui-collapsable class="one" label="Collapsable One">
          <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud e
          </p>
        </oui-collapsable>
        <oui-collapsable class="two" label="Collapsable Two">
          <p>
              entore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
          </p>
        </oui-collapsable>
      </oui-accordion>
      `,
    })

    const cllp1 = page.doc
      .querySelector("oui-accordion")
      .querySelector("oui-collapsable.one") as HTMLOuiCollapsableElement

    const cllp2 = page.doc
      .querySelector("oui-accordion")
      .querySelector("oui-collapsable.two") as HTMLOuiCollapsableElement

    const title1 = cllp1.querySelector(".oui-collapsable__title") as HTMLElement
    const title2 = cllp2.querySelector(".oui-collapsable__title") as HTMLElement

    // click on the first collapsable to expand it
    title1.click()

    // check that the first collapsable is expanded
    page.waitForChanges()
    expect(cllp1.expanded).toBe(true)

    // click on the second collapsable to expand it
    title2.click()

    // check if the first collapsable has collapsed
    page.waitForChanges()
    expect(cllp1.expanded).toBe(false)
  })
})
