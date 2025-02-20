import { html, getSlotText, isOverflowing } from "./lib/html";

class OuiCheck extends HTMLElement {
  #input;
  #active;
  static template() {
    return html` <style>
        :host {
          display: block;
        }
        :host([disabled]) {
          opacity: 0.6;
          cursor: not-allowed;
        }
        label {
          display: flex;
          align-items: center;
          gap: 3px;
          border-radius: 4px;
          padding: 5px;
        }
        :host(:hover) label,
        :host(.active) {
          background-color: #f0f0f0;
        }
        input[type="checkbox"] {
          box-sizing: border-box;
          display: inline-block;
          appearance: none;
          flex-shrink: 0;
          height: 14px;
          width: 14px;
          padding: 2px;
          margin: 0px 8px 0px 0px;
          vertical-align: middle;
          transition: 80ms ease-out;
          fill-opacity: 0;
          border-radius: 3px;
          background-position: 1px 2px;
          box-shadow: none;
          border: 1px solid var(--oui-border-color, #a0a0a0);
          background-repeat: no-repeat;
        }
        input[type="checkbox"]:checked {
          border: 1px solid lch(47.918 59.303 288.421);
          background-color: lch(47.918 59.303 288.421);
          background-image: url(data:image/svg+xml;utf8,%3Csvg%20width=%2210%22%20height=%229%22%20viewBox=%220%200%2010%208%22%20xmlns=%22http://www.w3.org/2000/svg%22%20fill=%22lch%28100%25%205%20288.421%20/%201%29%22%3E%3Cpath%20d=%22M3.46975%205.70757L1.88358%204.1225C1.65832%203.8974%201.29423%203.8974%201.06897%204.1225C0.843675%204.34765%200.843675%204.7116%201.06897%204.93674L3.0648%206.93117C3.29006%207.15628%203.65414%207.15628%203.8794%206.93117L8.93103%201.88306C9.15633%201.65792%209.15633%201.29397%208.93103%201.06883C8.70578%200.843736%208.34172%200.843724%208.11646%201.06879C8.11645%201.0688%208.11643%201.06882%208.11642%201.06883L3.46975%205.70757Z%22%20stroke-width=%220.2%22%20/%3E%3C/svg%3E);
        }
        .label-slot {
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        :host([wrap]) .label-slot {
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
        }
      </style>
      <label>
        <input type="checkbox" />
        <div class="label-slot">
          <slot></slot>
        </div>
      </label>`;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(OuiCheck.template());
    this.#input = this.shadowRoot.querySelector("input");
  }
  static get observedAttributes() {
    return [
      "checked",
      "value",
      "name",
      "disabled",
      "required",
      "readonly",
      "indeterminate",
      "active",
    ];
  }
  connectedCallback() {
    this.#input.addEventListener("change", this.handleChange);
    this.shadowRoot.addEventListener("mouseover", this.updateTitle);
    this.updateCheckProps();
    this.updateTitle();
  }
  disconnectedCallback() {
    this.#input.removeEventListener("change", this.handleChange);
    this.shadowRoot.removeEventListener("mouseover", this.updateTitle);
  }
  attributeChangedCallback() {
    this.updateCheckProps();
  }
  updateTitle = () => {
    // if text is overflowing, set title
    if (this.hasAttribute("wrap")) {
      return;
    }
    const labelSlot = this.shadowRoot.querySelector(".label-slot");
    if (isOverflowing(labelSlot)) {
      this.setAttribute(
        "title",
        getSlotText(this.shadowRoot.querySelector("slot")),
      );
    }
  };
  handleChange = () => {
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
      }),
    );
  };
  get checked() {
    return this.#input.checked;
  }
  set checked(value) {
    this.#input.checked = value;
  }
  toggle = () => {
    this.checked = !this.checked;
  };
  get active() {
    return this.#active;
  }
  set active(value) {
    if (value) {
      this.classList.add("active");
    } else {
      this.classList.remove("active");
    }
  }
  updateCheckProps() {
    const input = this.#input;
    input.checked = this.hasAttribute("checked");
    input.value = this.getAttribute("value");
    input.name = this.getAttribute("name");
    input.disabled = this.hasAttribute("disabled");
    input.required = this.hasAttribute("required");
    input.readOnly = this.hasAttribute("readonly");
    input.indeterminate = this.hasAttribute("indeterminate");
  }
}

customElements.define("oui-check", OuiCheck);
