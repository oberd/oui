class InputBMI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = "Hello, Worlds! (oberd-inputs-bmi)"
    }
}

customElements.define("oui-inputs-bmi", InputBMI)
