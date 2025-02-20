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

class TestNav extends HTMLElement {
  static template() {
    return html`
      <style>
        :host {
          display: block;
        }
        nav {
          display: flex;
          justify-content: space-between;
          padding: 6px 8px;
          background: #f0f0f0;
          border-bottom: 1px solid #e9e9e9;
        }
        ul {
          display: flex;
          gap: 10px;
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
      </style>
      <nav>
        <ul>
          <li>
            <a href="/">Testing Home</a>
          </li>
        </ul>
      </nav>
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(TestNav.template().cloneNode(true));
  }
}

customElements.define("test-nav", TestNav);
