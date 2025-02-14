import { css, appendNode } from "./lib/html.js";

export class OuiOption extends HTMLElement {
  static styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        padding: 5px;
        justify-content: space-between;
        cursor: default;
        user-select: none;
      }
      :host(:hover),
      :host(.active) {
        background-color: #f7f7f7;
      }
      oui-icon {
        transition: transform 0.2s;
      }
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.role = "button";
    this.initDOM();
  }
  initDOM() {
    this.shadowRoot.appendChild(OuiOption.styles());
    appendNode(this.shadowRoot, "span", { class: "label" }, "<slot></slot>");
    appendNode(
      this.shadowRoot,
      "div",
      {},
      `<oui-icon name="check"></oui-icon>`,
    );
    this.icon = this.shadowRoot.querySelector("oui-icon");
    this.updateIcon();
  }
  connectedCallback() {
    this.addEventListener("mousedown", this.toggle);
  }

  toggle = () => {
    const isSelected = !this.hasAttribute("selected");
    this.setSelected(isSelected);
    this.dispatchEvent(
      new CustomEvent("change:selected", {
        detail: { isSelected },
        bubbles: true,
        composed: true,
      }),
    );
  };
  setSelected = (isSelected) => {
    if (isSelected) {
      this.setAttribute("selected", "");
    } else {
      this.removeAttribute("selected");
    }
    this.updateIcon();
  };
  updateIcon() {
    const isSelected = this.hasAttribute("selected");
    this.icon.style.transform = isSelected ? `scale(1)` : `scale(0)`;
  }
  disconnectedCallback() {
    this.removeEventListener("mousedown", this.toggle);
  }
}

customElements.define("oui-option", OuiOption);
