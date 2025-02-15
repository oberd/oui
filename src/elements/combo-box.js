import { css, appendNode } from "./lib/html.js";
import "./option.js";
import "./icon.js";
import "./popover.js";

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
        class: "combo-box-toggle",
      },
      `<span></span><oui-icon name="chevron-down"></oui-icon>`,
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
      ],
    );
    this.comboBoxSearch = appendNode(
      this.popoverContent,
      "div",
      {
        class: "combo-box-search",
      },
      "<input type='search' placeholder='Search'>",
    );
    this.comboBoxSearchInput = this.comboBoxSearch.querySelector("input");
    this.allCheckbox = this.comboBoxMultiOptions.querySelector("input");
    this.comboBoxMenuOptions = appendNode(
      this.popoverContent,
      "div",
      { class: "combo-box-menu-options" },
      "<slot></slot>",
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
      options.selected.map((n) => n.getAttribute("value")),
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
      }),
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
      options.selected.map((n) => n.getAttribute("value")),
    );
    this.selectedIndex = null;
    this.updateButtonLabel(options);
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
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
      new CustomEvent("toggle", { detail: { epanded: newExpanded } }),
    );
  };
  updateExpandedDOM(isExpanded) {
    this.toggleButton.setAttribute(
      "aria-expanded",
      isExpanded ? "true" : "false",
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
      this.searchKeyPress,
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
    const withPlaceholder = (label) => {
      if (this.getAttribute("placeholder")) {
        return `${this.getAttribute("placeholder")} (${label})`;
      }
      return label;
    };
    const allLabel = withPlaceholder("All");
    const noneLabel = withPlaceholder("None");
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
    const actionKeys = [" ", "Enter"];
    if (
      actionKeys.includes(event.key) &&
      this.currentIndex !== null &&
      this.keySelectMode
    ) {
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
