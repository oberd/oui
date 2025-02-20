import { html } from "./lib/html";

export class OuiButton extends HTMLElement {
  static get observedAttributes() {
    return ["size", "variant", "disabled"];
  }

  static template() {
    return html`
      <style>
        :host {
          display: inline-block;
          font-family: sans-serif;
          --primary: var(--oui-button-primary, #333);
          --primary-text: var(--oui-button-primary-text, #fff);
          --primary-light: var(--oui-button-primary-light, #eee);
          --surface-bg: var(--oui-button-surface-bg, #fff);
          --border-color: var(--oui-button-border-color, #a0a0a0);
        }
        @media (prefers-color-scheme: dark) {
          :host {
            --primary: var(--oui-button-primary-dark, #111);
            --primary-text: var(--oui-button-primary-text-dark, #fff);
            --primary-light-text: var(
              --oui-button-primary-light-text-dark,
              #fff
            );
            --border-color: var(--oui-button-border-color, #333);
            --primary-light: var(--oui-button-primary-light-dark, #222);
            --surface-bg: var(--oui-button-surface-bg-dark, #222);
          }
        }
        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          border-radius: 4px;
          transition:
            background-color 0.2s,
            color 0.2s,
            border-color 0.2s,
            filter 0.2s,
            box-shadow 0.2s;
          font-weight: 500;
        }
        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Size styles */
        :host([size="xs"]) button {
          font-size: 0.75rem;
          padding: 0.25rem 0.4rem;
          gap: 2px;
        }
        :host([size="sm"]) button {
          font-size: 0.875rem;
          padding: 0.375rem 0.6rem;
          gap: 4px;
        }
        :host([size="md"]) button {
          font-size: 1rem;
          padding: 0.5rem 0.8rem;
          gap: 4px;
        }
        :host([size="lg"]) button {
          font-size: 1.125rem;
          padding: 0.625rem 1rem;
          gap: 6px;
        }
        :host([size="xl"]) button {
          font-size: 1.25rem;
          padding: 0.75rem 1.2rem;
          gap: 8px;
        }

        /* Variant styles */

        /* Solid variant: primary background with white text */
        :host([variant="solid"]) button {
          background-color: var(--primary);
          color: var(--primary-text);
        }

        /* Subtle variant: uses a light background with primary text */
        :host([variant="subtle"]) button {
          background-color: var(--primary-light);
          color: var(--primary-light-text);
        }

        /* Surface variant: a neutral surface background with primary text */
        :host([variant="surface"]) button {
          background-color: var(--surface-bg);
          color: var(--primary-light-text);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        /* Outline variant: transparent background with primary border and text */
        :host([variant="outline"]) button {
          background-color: transparent;
          color: var(--primary-light-text);
          border-color: var(--border-color);
        }

        /* Ghost variant: transparent background and primary text (no border) */
        :host([variant="ghost"]) button {
          background-color: transparent;
          color: var(--primary-light-text);
        }

        /* Plain variant: transparent background, default text color, no border */
        :host([variant="plain"]) button {
          background-color: transparent;
          color: inherit;
          border-color: transparent;
        }
        :host([variant]) button:hover:not(:disabled) {
          filter: brightness(0.8);
        }
        :host([variant="solid"]) button:hover:not(:disabled),
        button:hover:not(:disabled) {
          filter: brightness(1.3);
        }

        /* Focus state: show a focus ring */
        button:focus:not(:disabled) {
          outline: none;
          box-shadow: 0 0 0 3px rgba(21, 156, 228, 0.4);
        }
      </style>

      <button>
        <slot></slot>
      </button>
    `;
  }

  #button;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.role = "button";
    this.shadowRoot.appendChild(OuiButton.template().cloneNode(true));
    this.#button = this.shadowRoot.querySelector("button");
  }

  attributeChangedCallback() {
    this.render();
  }

  // A convenient getter for the `disabled` attribute.
  get disabled() {
    return this.hasAttribute("disabled");
  }

  render = () => {
    this.#button.disabled = this.disabled;
  };
}

// Register the custom element
customElements.define("oui-button", OuiButton);
