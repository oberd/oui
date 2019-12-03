import { Component, h} from "@stencil/core"

@Component({ tag: "oui-tm-switch", styleUrl: "tm-switch.css" })
export class ThemeSwitch {

  public render() {
    return (
      <div>
        <button
          class="oui-tm-switch__Light"
          onClick={
            this.switchToLight
          }
        >
          Light
        </button>
        <button
          class="oui-tm-switch__Dark"
          onClick={
            this.switchToDark
          }
        >
          Dark
        </button>
      </div>
    )
  }
  private switchToLight() {
    document.querySelector("body").classList.remove("dark")
  }

  private switchToDark() {
    document.querySelector("body").classList.add("dark")
  }
}
