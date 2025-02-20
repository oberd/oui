export function html(input) {
  const node = document.createElement("template");
  node.innerHTML = input[0];
  return node.content.cloneNode(true);
}

export function css(input) {
  const node = document.createElement("style");
  node.innerHTML = input[0];
  return node;
}

/**
 * @param {string} className
 * @returns {HTMLElement}
 */
export function divClass(className) {
  const node = document.createElement("div");
  node.className = className;
  return node;
}

/**
 *
 * @param {HTMLElement} element
 * @param {string} tag
 * @param {Record<string,string>} attributes
 * @param {string|HTMLElement|string[]|HTMLElement[]} children
 * @returns {HTMLElement}
 */
export function appendNode(element, tag, attributes = {}, children = "") {
  const node = document.createElement(tag);
  for (const key in attributes) {
    node.setAttribute(key, attributes[key]);
  }
  appendChildren(node, children);
  element.appendChild(node);
  return node;
}

/**
 *
 * @param {HTMLElement} element
 * @param {string|HTMLElement|string[]|HTMLElement[]} children
 * @returns
 */
export function appendChildren(element, children) {
  if (typeof children === "string") {
    appendChild(element, children);
  } else if (Array.isArray(children)) {
    children.forEach((child) => appendChild(element, child));
  }
}

/**
 *
 * @param {HTMLElement} element
 * @param {string|HTMLElement} child
 */
export function appendChild(element, child) {
  if (typeof child === "string") {
    element.innerHTML += child;
  } else {
    element.appendChild(child);
  }
}

export function getSlotText(slot) {
  const assignedNodes = slot.assignedNodes();
  let output = [];
  for (const node of assignedNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      output.push(node.textContent);
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      output.push(node.innerText);
    }
    if (node instanceof HTMLSlotElement) {
      output.push(getSlotText(node));
    }
  }
  return output.join(" ").trim();
}

export function isOverflowing(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}
