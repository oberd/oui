import { html } from "./html";
class ValueAsJson extends HTMLElement {
  #target;
  #timeout;
  #events;
  constructor() {
    super();
    this.appendChild(
      html`
        <style>
          pre {
            margin: 0;
            background: #f0f0f0;
            color: #333;
            padding: 10px;
            border-radius: 2px;
            border: 1px solid #e9e9e9;
          }
        </style>
        <pre></pre>
      `.cloneNode(true),
    );
  }
  static get observedAttributes() {
    return ["target", "events"];
  }
  connectedCallback() {
    this.bindTarget();
  }
  disconnectedCallback() {}
  attributeChangedCallback(name, _oldValue, newValue) {
    this.bindTarget();
  }
  bindTarget() {
    const target = this.getAttribute("target");
    if (!target && this.#target) {
      this.unbindTarget();
      return;
    }
    const newTarget = document.querySelector(target);
    if (!newTarget) {
      this.innerHTML = `target ${target} not found`;
      this.unbindTarget();
      return;
    }
    if (this.#target) {
      this.unbindTarget();
    }
    this.#target = newTarget;
    this.#events = (this.getAttribute("events") ?? "change")
      .split(",")
      .map((e) => e.trim());
    for (const event of this.#events) {
      this.#target.addEventListener(event, this.valueUpdated);
    }
    this.#timeout = setTimeout(() => this.valueUpdated(), 500);
  }
  valueUpdated = () => {
    this.querySelector("pre").innerText = JSON.stringify(this.#target.value);
  };
  unbindTarget = () => {
    if (this.#timeout) {
      clearTimeout(this.#timeout);
    }
    for (const event of this.#events) {
      this.#target.removeEventListener(event, this.valueUpdated);
    }
  };
}

customElements.define("value-as-json", ValueAsJson);
