import { html } from "./lib/html.js";

export class OuiPopover extends HTMLElement {
  static template() {
    return html`
      <style>
      :host {
        --width: 100%;
        position: relative;
        display: block;
      }
      .content {
        box-sizing: border-box;
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        min-width: 100%;
        max-height: var(--max-height, 230px);
        overflow-y: auto;
        max-width: 100%;
      }
      .content {
        /** exit state **/
        transform: translateY(0px);
        opacity: 0;
        transition:
          transform 0.2s,
          opacity 0.2s,
          display 0.2s allow-discrete;
      }
      :host([open]) .content {
        display: block;
        transform: translateY(5px);
        opacity: 1;

        @starting-style {
          transform: translateY(0px);
          opacity: 0;
        }
      }
      </style>
      <div class="content"><slot></slot></div>
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.initDOM();
  }
  get observedAttributes() {
    return ["open"];
  }
  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "open") {
      this.updateOpenState(newValue);
    }
  }
  updateOpenState(isOpen) {
    if (isOpen) {
      this.classList.add("open");
    } else {
      this.classList.remove("open");
    }
  }
  initDOM() {
    this.shadowRoot.appendChild(OuiPopover.template());
  }
}

customElements.define("oui-popover", OuiPopover);
