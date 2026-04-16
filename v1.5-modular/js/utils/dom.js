// DOM manipulation utilities

export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function hide(element) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.style.display = "none";
  }
}

export function show(element, displayType = "block") {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.style.display = displayType;
  }
}

export function addClass(element, className) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.classList.add(className);
  }
}

export function removeClass(element, className) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.classList.remove(className);
  }
}

export function toggleClass(element, className) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.classList.toggle(className);
  }
}

export function on(element, event, handler) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.addEventListener(event, handler);
  }
}

export function onAll(selector, event, handler) {
  $$(selector).forEach((el) => {
    el.addEventListener(event, handler);
  });
}

export function setHTML(element, html) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.innerHTML = html;
  }
}

export function setText(element, text) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.textContent = text;
  }
}

export function getValue(element) {
  if (typeof element === "string") {
    element = $(element);
  }
  return element ? element.value : "";
}

export function setValue(element, value) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.value = value;
  }
}

export function disable(element) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.disabled = true;
  }
}

export function enable(element) {
  if (typeof element === "string") {
    element = $(element);
  }
  if (element) {
    element.disabled = false;
  }
}

export function createElement(tag, attributes = {}, children = []) {
  const element = document.createElement(tag);

  Object.keys(attributes).forEach((key) => {
    if (key === "className") {
      element.className = attributes[key];
    } else if (key === "dataset") {
      Object.keys(attributes[key]).forEach((dataKey) => {
        element.dataset[dataKey] = attributes[key][dataKey];
      });
    } else {
      element.setAttribute(key, attributes[key]);
    }
  });

  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });

  return element;
}

// Made with Bob
