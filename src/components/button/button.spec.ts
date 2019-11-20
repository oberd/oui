import { newSpecPage } from "@stencil/core/testing"
import { Button } from "./button"

describe("button", () => {
  it("builds", () => {
    expect(new Button()).toBeTruthy()
  })

  it("should have role button attribute", async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<oui-button></oui-button>`,
    })

    const role = page.doc.querySelector("oui-button").getAttribute("role")
    expect(role).toBe("button")
  })

  it("should have aria-disabled attribute", async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<oui-button disabled></oui-button>`,
    })

    const disabled = page.doc.querySelector("oui-button").getAttribute("aria-disabled")
    expect(disabled).toBe("true")
  })

  it("should have oui-button__primary class", async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<oui-button primary></oui-button>`,
    })

    expect(page.doc.querySelector(".oui-button__primary")).not.toBeNull()
  })

  it("should have  class", async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<oui-button danger></oui-button>`,
    })

    expect(page.doc.querySelector(".oui-button__danger")).not.toBeNull()
  })

  it("should have aria-pressed attribute equal false", async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `<oui-button danger></oui-button>`,
    })

    const pressed = page.doc.querySelector("oui-button").getAttribute("aria-pressed")
    expect(pressed).toBe("false")
  })
})
