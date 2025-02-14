import { css, appendNode, divClass } from "./_lib.js";

export default class ComboBox extends HTMLElement {
  static styles() {
    return css`
      :host {
        --content-height: 200px;
        display: block;
        position: relative;
        width: var(--width, 250px);
      }
      button[role="button"][aria-haspopup="true"] {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 100px;
        width: 100%;
        box-sizing: border-box;
        background: none;
        border: var(--border, solid 1px #e7e7e7);
        padding: 5px 10px;
      }
      button[role="button"][aria-haspopup="true"] span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .combo-box-menu {
        --max-height: none;
      }
      .popover-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .combo-box-menu-options {
        max-height: var(--content-height);
        overflow-y: auto;
      }
      .combo-box-multi-options {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .combo-box-multi-options label {
        padding: 5px;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .combo-box-search {
        padding: 5px;
        border: var(--border, 1px solid #e7e7e7);
      }
      .combo-box-search input {
        border: none;
        width: 100%;
        box-sizing: border-box;
      }
      .combo-box-search input:focus,
      .combo-box-search input:focus-visible {
        outline: none;
      }
      oui-popover {
        width: 100%;
      }
    `;
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.initDOM();
  }
  static get observedAttributes() {
    return ["placeholder", "open"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "placeholder") {
      this.updateButtonLabel(this.getSelectedOptions());
    }
    if (name === "open") {
      this.currentIndex = null;
      this.updateExpandedDOM(newValue === "");
    }
  }
  initDOM() {
    this.shadowRoot.appendChild(ComboBox.styles());
    this.toggleButton = appendNode(
      this.shadowRoot,
      "button",
      {
        role: "button",
        "aria-haspopup": "true",
        "aria-expanded": "false",
      },
      `<span></span><oui-icon name="chevron-down"></oui-icon>`
    );
    this.toggleButton.querySelector("span").textContent =
      this.getAttribute("placeholder") ?? "All";
    this.popoverMenu = appendNode(this.shadowRoot, "oui-popover", {
      class: "combo-box-menu",
    });
    this.popoverContent = appendNode(this.popoverMenu, "div", {
      class: "popover-content",
    });
    this.comboBoxMultiOptions = appendNode(
      this.popoverContent,
      "div",
      { class: "combo-box-multi-options" },
      [
        "<label><input type='checkbox' id='all' name='all' value='all'><div>All</div></label>",
        // "<oui-icon name='eye' title='Show Selected Only'></oui-icon>",
      ]
    );
    this.comboBoxSearch = appendNode(
      this.popoverContent,
      "div",
      {
        class: "combo-box-search",
      },
      "<input type='search' placeholder='Search'>"
    );
    this.comboBoxSearchInput = this.comboBoxSearch.querySelector("input");
    this.allCheckbox = this.comboBoxMultiOptions.querySelector("input");
    this.comboBoxMenuOptions = appendNode(
      this.popoverContent,
      "div",
      { class: "combo-box-menu-options" },
      "<slot></slot>"
    );
  }
  connectedCallback() {
    this.toggleButton.addEventListener("mousedown", this.toggle);
    this.shadowRoot.addEventListener("change:selected", this.changeSelected);
    this.allCheckbox.addEventListener("change", this.changeAll);
    this.comboBoxSearchInput.addEventListener("input", this.search);
    this.comboBoxSearchInput.addEventListener("keydown", this.searchKeyPress);
    window.addEventListener("mousedown", this.checkClickOutside);
    const options = this.getSelectedOptions();
    this.value = Array.from(
      options.selected.map((n) => n.getAttribute("value"))
    );
  }
  changeSelected = () => {
    const { selected, unselected } = this.getSelectedOptions();
    this.updateButtonLabel({ selected, unselected });
    this.value = Array.from(selected.map((n) => n.getAttribute("value")));
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value,
        bubbles: true,
        composed: true,
      })
    );
  };
  changeAll = (event) => {
    const isSelected = this.allCheckbox.checked;
    const nodes = this.shadowRoot.querySelector("slot").assignedNodes();
    for (const node of nodes) {
      if (node.tagName === "OUI-OPTION") {
        node.setSelected(isSelected);
        node.classList.remove("active");
      }
    }
    const options = this.getSelectedOptions();
    this.value = Array.from(
      options.selected.map((n) => n.getAttribute("value"))
    );
    this.selectedIndex = null;
    this.updateButtonLabel(options);
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value,
        bubbles: true,
        composed: true,
      })
    );
  };
  toggle = () => {
    const isExpanded =
      this.toggleButton.getAttribute("aria-expanded") === "true";
    const newExpanded = !isExpanded;
    if (newExpanded) {
      this.setAttribute("open", "");
    } else {
      this.removeAttribute("open");
    }
    this.currentIndex = null;
    this.updateExpandedDOM(newExpanded);
    this.dispatchEvent(
      new CustomEvent("toggle", { detail: { epanded: newExpanded } })
    );
  };
  updateExpandedDOM(isExpanded) {
    this.toggleButton.setAttribute(
      "aria-expanded",
      isExpanded ? "true" : "false"
    );
    if (isExpanded) {
      this.popoverMenu.setAttribute("open", "");
      setTimeout(() => this.comboBoxSearchInput.focus(), 10);
    } else {
      this.popoverMenu.removeAttribute("open");
    }
  }
  disconnectedCallback() {
    this.toggleButton.removeEventListener("mousedown", this.toggle);
    this.shadowRoot.removeEventListener("change:selected", this.changeSelected);
    this.allCheckbox.removeEventListener("change", this.changeAll);
    this.comboBoxSearchInput.removeEventListener("input", this.search);
    this.comboBoxSearchInput.removeEventListener(
      "keydown",
      this.searchKeyPress
    );
    window.removeEventListener("mousedown", this.checkClickOutside);
  }
  checkClickOutside = (event) => {
    if (!this.hasAttribute("open")) {
      return;
    }
    const isInside = this.contains(event.target);
    if (!isInside) {
      this.removeAttribute("open");
      this.updateExpandedDOM(false);
    }
  };
  updateButtonLabel({ selected, unselected }) {
    const allLabel = (this.getAttribute("placeholder") + " (All)").trim();
    const noneLabel = (this.getAttribute("placeholder") + " (None)").trim();
    const toggleText = this.toggleButton.querySelector("span");
    if (unselected.length === 0) {
      toggleText.textContent = allLabel;
      this.toggleButton.title = allLabel;
      this.allCheckbox.style.opacity = 1;
      this.allCheckbox.checked = true;
    } else if (selected.length === 0) {
      toggleText.textContent = noneLabel;
      this.toggleButton.title = noneLabel;
      this.allCheckbox.checked = false;
    } else if (selected.length === 1) {
      toggleText.textContent = selected[0].textContent;
      this.toggleButton.title = selected[0].textContent;
      if (unselected.length) {
        this.allCheckbox.checked = true;
        this.allCheckbox.style.opacity = 0.5;
      }
    } else {
      toggleText.textContent = `${selected.length} selected`;
      this.toggleButton.title = `${selected.length} selected`;
      this.allCheckbox.checked = true;
      this.allCheckbox.style.opacity = 0.5;
    }
  }
  getSelectedOptions() {
    // peruse slotted children for selected options
    const nodes = this.shadowRoot.querySelector("slot").assignedNodes();
    const allOptions = [];
    const selectedOptions = [];
    const unselectedOptions = [];
    for (const node of nodes) {
      if (node.tagName === "OUI-OPTION") {
        allOptions.push(node);
        if (node.hasAttribute("selected")) {
          selectedOptions.push(node);
        } else {
          unselectedOptions.push(node);
        }
      }
    }
    return {
      all: allOptions,
      selected: selectedOptions,
      unselected: unselectedOptions,
    };
  }
  search = (event) => {
    const value = this.comboBoxSearchInput.value;
    const { all } = this.getSelectedOptions();
    if (!value.trim()) {
      for (const node of all) {
        node.style.display = "flex";
      }
      return;
    }
    for (let i = 0; i < all.length; i++) {
      if (fuzzyMatch(value, all[i].textContent)) {
        all[i].style.display = "flex";
      } else {
        all[i].style.display = "none";
      }
    }
  };
  searchKeyPress = (event) => {
    if (event.key === "Escape") {
      if (this.comboBoxSearchInput.value) {
        event.preventDefault();
        this.comboBoxSearchInput.value = "";
        const { all } = this.getSelectedOptions();
        for (const node of all) {
          node.style.display = "flex";
        }
        this.comboBoxSearchInput.focus();
        return;
      }
      this.removeAttribute("open");
      this.updateExpandedDOM(false);
      return;
    }
    if (event.key === " " && this.currentIndex !== null && this.keySelectMode) {
      event.preventDefault();
      const { all } = this.getSelectedOptions();
      const visible = all.filter((n) => n.style.display !== "none");
      visible[this.currentIndex].toggle();
      this.changeSelected();
      this.comboBoxSearchInput.focus();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      const { all } = this.getSelectedOptions();
      const visible = all.filter((n) => n.style.display !== "none");
      this.keySelectMode = true;
      let currentIndex = this.currentIndex ?? -1;
      let nextIndex = this.currentIndex;
      if (event.key === "ArrowDown") {
        nextIndex = currentIndex + 1;
      } else {
        nextIndex = currentIndex - 1;
      }
      if (nextIndex < 0) {
        nextIndex = all.length - 1;
      }
      if (nextIndex >= all.length) {
        nextIndex = 0;
      }
      this.currentIndex = nextIndex;
      for (const i in visible) {
        if (i == this.currentIndex) {
          visible[i].classList.add("active");
        } else {
          visible[i].classList.remove("active");
        }
      }
      return;
    }
    if (this.keySelectMode === true) {
      this.keySelectMode = false;
      this.currentIndex = null;
      const { all } = this.getSelectedOptions();
      for (const node of all) {
        node.classList.remove("active");
      }
    }
  };
}

function fuzzyMatch(query, subject) {
  const queryLower = query.toLowerCase();
  const subjectLower = subject.toLowerCase();
  const subMatch = subjectLower.indexOf(queryLower);
  if (subMatch === -1) {
    return false;
  } else {
    return [subMatch, subMatch + queryLower.length];
  }
}

customElements.define("oui-combo-box", ComboBox);

class OuiOption extends HTMLElement {
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
      `<oui-icon name="check"></oui-icon>`
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
      })
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

class PopoverMenu extends HTMLElement {
  static styles() {
    return css`
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
        padding: 5px;
        overflow-y: auto;
      }
      .content {
        /** exit state **/
        transform: translateY(0px);
        opacity: 0;
        transition: transform 0.2s, opacity 0.2s, display 0.2s allow-discrete;
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
  attributeChangedCallback(name, oldValue, newValue) {
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
    this.shadowRoot.appendChild(PopoverMenu.styles());
    appendNode(this.shadowRoot, "div", { class: "content" }, "<slot></slot>");
  }
}

customElements.define("oui-popover", PopoverMenu);

class OuiIcon extends HTMLElement {
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
  static iconMap = import.meta.glob("./icons/*.svg", {
    import: "default",
    query: "?raw",
    eager: true,
  });
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
