class InputBMI extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "Hello, World! (oberd-inputs-bmi)";
  }
}

customElements.define("oui-inputs-bmi", InputBMI);
