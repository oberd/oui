import { html } from "./lib/html.js";
import "./option.js";
import "./icon.js";
import "./popover.js";
import "./check.js";

/**
 * ComboBox provides an in-page searchable multi-select
 * for use in standard filters
 */
export default class ComboBox extends HTMLElement {
  static template() {
    return html`
      <style>
        :host {
          /* height of the inner content list */
          --content-height: 200px;
          --border: solid 1px #e7e7e7;
          display: block;
          position: relative;
          width: var(--width, 250px);
        }
        .combo-box-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-width: 100px;
          width: 100%;
          box-sizing: border-box;
          background: none;
          border: var(--border, solid 1px #e7e7e7);
          padding: 5px 10px;
          border-radius: 4px;
          font-size: inherit;
        }
        .combo-box-toggle span {
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
        .combo-box-search input {
          padding: 8px;
          border: none;
          width: 100%;
          box-sizing: border-box;
          border-top-right-radius: 4px;
          border-top-left-radius: 4px;
          font-size: inherit;
        }
        .combo-box-search input:focus,
        .combo-box-search input:focus-visible {
          outline: none;
        }
        .combo-box-multi-options {
          border-bottom: var(--border, solid 1px #e7e7e7);
        }
        oui-popover {
          width: 100%;
          max-width: 100%;
        }
      </style>
      <!-- Toggle Button -->
      <button
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
        class="combo-box-toggle"
      >
        <span class="combo-box-label"></span>
        <oui-icon name="chevron-down"></oui-icon>
      </button>

      <!-- Popover Menu -->
      <oui-popover class="combo-box-menu">
        <div class="popover-content">
          <!-- Search Bar -->
          <div class="combo-box-search">
            <input type="search" placeholder="Search" />
          </div>

          <!-- Multi-Options -->
          <div class="combo-box-multi-options">
            <oui-check name="all" id="all">All</oui-check>
          </div>

          <!-- Menu Options Slot -->
          <div class="combo-box-menu-options">
            <slot></slot>
          </div>
        </div>
      </oui-popover>
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
  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "placeholder") {
      this.updateButtonLabel(this.getSelectedOptions());
    }
    if (name === "open") {
      this.currentIndex = null;
      this.updateExpandedDOM(newValue === "");
    }
  }
  initDOM() {
    this.shadowRoot.appendChild(ComboBox.template());
    this.toggleButton = this.shadowRoot.querySelector(".combo-box-toggle");
    this.toggleLabel = this.shadowRoot.querySelector(".combo-box-label");
    this.popoverMenu = this.shadowRoot.querySelector("oui-popover");
    this.popoverContent = this.shadowRoot.querySelector(".popover-content");
    this.comboBoxMultiOptions = this.shadowRoot.querySelector(
      ".combo-box-multi-options",
    );
    this.comboBoxSearch = this.shadowRoot.querySelector(".combo-box-search");
    this.comboBoxSearchInput = this.comboBoxSearch.querySelector("input");
    this.allCheckbox = this.comboBoxMultiOptions.querySelector("[name=all]");
    this.comboBoxMenuOptions = this.shadowRoot.querySelector(
      ".combo-box-menu-options",
    );
    this.toggleLabel.textContent = this.getAttribute("placeholder") ?? "All";
    this.shadowRoot.addEventListener("slotchange", () => {
      this.updateStateFromDOM();
    });
  }
  connectedCallback() {
    this.toggleButton.addEventListener("mousedown", this.toggle);
    this.shadowRoot.addEventListener("change:selected", this.changeSelected);
    this.allCheckbox.addEventListener("change", this.changeAll);
    this.comboBoxSearchInput.addEventListener("input", this.search);
    this.comboBoxSearchInput.addEventListener("keydown", this.searchKeyPress);
    window.addEventListener("mousedown", this.checkClickOutside);
    this.updateStateFromDOM();
    this.dispatchEvent(
      new CustomEvent("ready", { bubbles: true, composed: true }),
    );
  }
  updateStateFromDOM = () => {
    const options = this.getSelectedOptions();
    this.value = Array.from(
      options.selected.map((n) => n.getAttribute("value")),
    );
    this.allCheckbox.checked = this.value.length === options.total;
    this.updateButtonLabel({
      all: options.all,
      selected: options.selected,
      unselected: options.unselected,
    });
  };
  changeSelected = () => {
    const { all, selected, unselected } = this.getSelectedOptions();
    this.updateButtonLabel({ selected, unselected });
    this.updateAllCheck(all);
    this.value = Array.from(selected.map((n) => n.getAttribute("value")));
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: this.value,
        bubbles: true,
        composed: true,
      }),
    );
  };
  changeAll = () => {
    const isSelected = this.allCheckbox.checked;
    const nodes = this.shadowRoot.querySelector("slot").assignedNodes();
    let ignoredCount = 0;
    for (const node of nodes) {
      if (node.tagName === "OUI-OPTION") {
        if (node.style.display === "none") {
          ignoredCount++;
          continue;
        }
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
    // in the case that we have toggled a subset, its likely
    // we want to now remove the filter, focus the box
    if (ignoredCount > 0) {
      this.comboBoxSearchInput.focus();
    }
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
    } else {
      toggleText.textContent = `${selected.length} selected`;
      this.toggleButton.title = `${selected.length} selected`;
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
  search = () => {
    const value = this.comboBoxSearchInput.value;
    const { all } = this.getSelectedOptions();
    if (!value.trim()) {
      for (const node of all) {
        node.style.display = "block";
      }
      this.allCheckbox.innerHTML = "All";
      return;
    }
    this.updateSearchVisibility(all, value);
    this.updateAllCheck(all);
    this.allCheckbox.innerHTML = `"${value}"`;
  };
  updateSearchVisibility = (all, searchValue) => {
    for (let i = 0; i < all.length; i++) {
      if (strirange(searchValue, all[i].innerText)) {
        all[i].style.display = all[i]._initialDisplay || "block";
      } else {
        all[i].style.display = "none";
      }
    }
  };
  updateAllCheck = (all) => {
    let checkedCount = 0;
    let visibleCount = 0;
    for (let i = 0; i < all.length; i++) {
      if (all[i].style.display !== "none") {
        visibleCount++;
        if (all[i].selected) {
          checkedCount++;
        }
      }
    }
    this.allCheckbox.checked = checkedCount > 0;
    this.allCheckbox.style.opacity = 1.0;
    if (checkedCount > 0 && checkedCount !== visibleCount) {
      this.allCheckbox.style.opacity = 0.5;
    }
  };
  searchKeyPress = (event) => {
    if (event.key === "Escape") {
      if (this.comboBoxSearchInput.value) {
        event.preventDefault();
        this.comboBoxSearchInput.value = "";
        const { all } = this.getSelectedOptions();
        for (const node of all) {
          node.style.display = "block";
        }
        this.comboBoxSearchInput.focus();
        return;
      }
      this.removeAttribute("open");
      this.updateExpandedDOM(false);
      return;
    }

    /**
     * if key select mode, toggle selected option on
     * on enter or spacebar
     */
    const actionKeys = [" ", "Enter"];
    if (
      actionKeys.includes(event.key) &&
      this.currentIndex !== null &&
      this.keySelectMode
    ) {
      event.preventDefault();
      const visible = this.getSelectableOptions();
      visible[this.currentIndex].toggle();
      if (this.currentIndex === 0) {
        this.changeAll();
      }
      this.changeSelected();
      this.comboBoxSearchInput.focus();
      return;
    }

    /**
     * moves the focus to the next or previous option
     */
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
        nextIndex = all.length;
      }
      if (nextIndex > all.length) {
        nextIndex = 0;
      }
      this.currentIndex = nextIndex;
      if (this.currentIndex == 0) {
        this.allCheckbox.active = true;
      } else {
        this.allCheckbox.active = false;
      }
      for (const i in visible) {
        const index = parseInt(i, 10) + 1;
        visible[i].active = index === this.currentIndex;
      }
      return;
    }
    if (this.keySelectMode === true) {
      this.keySelectMode = false;
      this.currentIndex = null;
      const { all } = this.getSelectedOptions();
      for (const node of all) {
        node.active = false;
      }
      this.allCheckbox.active = false;
    }
  };

  getSelectableOptions() {
    const { all } = this.getSelectedOptions();
    let visible = all.filter((n) => n.style.display !== "none");
    visible.unshift(this.allCheckbox);
    return visible;
  }
}

function strirange(query, subject) {
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
