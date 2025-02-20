import { css, appendNode } from "./lib/html.js";

export class OuiOption extends HTMLElement {
  #check;
  #active;
  #selected;
  static styles() {
    return css`
      :host oui-check {
        box-sizing: border-box;
        display: block;
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
    this.#check = appendNode(this.shadowRoot, "oui-check", {}, "<slot></slot>");
    this.#check.addEventListener("change", this.handleChange);
    this.setSelected(this.hasAttribute("selected"));
    this.updateIcon();
  }
  disconnectedCallback() {
    this.#check.removeEventListener("change", this.handleChange);
  }
  static get observedAttributes() {
    return ["selected", "wrap", "disabled"];
  }
  attributeChangedCallback() {
    this.setSelected(this.hasAttribute("selected"));
    this.updateIcon();
    if (this.hasAttribute("wrap")) {
      this.#check.setAttribute("wrap", "");
    } else {
      this.#check.removeAttribute("wrap");
    }
  }
  handleChange = (e) => {
    e.preventDefault();
    this.toggle();
  };
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
  get selected() {
    return this.#selected;
  }
  setSelected = (isSelected) => {
    if (isSelected === this.#selected) {
      return;
    }
    this.#selected = isSelected;
    if (isSelected) {
      this.setAttribute("selected", "");
    } else {
      this.removeAttribute("selected");
    }
    this.updateIcon();
  };
  updateIcon() {
    this.#check.checked = this.#selected;
  }
  disconnectedCallback() {
    this.removeEventListener("mousedown", this.toggle);
  }
  get active() {
    return this.#active;
  }
  set active(value) {
    this.#active = value;
    if (value) {
      this.setAttribute("active", "");
      this.#check.classList.add("active");
    } else {
      this.removeAttribute("active");
      this.#check.classList.remove("active");
    }
  }
}

customElements.define("oui-option", OuiOption);
