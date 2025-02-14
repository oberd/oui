import { css, appendNode } from "./lib/html.js";

const iconMap = import.meta.glob("./icons/*.svg", {
  import: "default",
  query: "?raw",
  eager: true,
});

export class OuiIcon extends HTMLElement {
  static styles() {
    return css`
      :host {
        display: inline-block;
      }
      svg {
        width: 14px;
        height: 14px;
      }
    `;
  }
  static iconMap = iconMap;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.initDOM();
  }
  get observedAttributes() {
    return ["name"];
  }
  initDOM() {
    this.updateNameDOM(this.getAttribute("name"));
  }
  connectedCallback() {
    this.updateNameDOM(this.getAttribute("name"));
  }
  updateNameDOM(iconName) {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(OuiIcon.styles());
    this.shadowRoot.appendChild(this.svgNode(iconName));
  }
  svgNode(iconName) {
    const element = document.createElement("div");
    const svgContent = OuiIcon.iconMap[`./icons/${iconName}.svg`];
    if (!svgContent) {
      return element;
    }
    element.innerHTML = svgContent;
    const child = element.children.item(0);
    child.removeAttribute("width");
    child.removeAttribute("height");
    return child;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "name") {
      this.updateNameDOM(newValue);
    }
  }
}
customElements.define("oui-icon", OuiIcon);
