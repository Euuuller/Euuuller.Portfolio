/**
 * DOM Utilities
 * Common DOM manipulation functions
 */

export class DOMUtils {
  /**
   * Safely get an element by ID
   * @param {string} id - Element ID
   * @returns {HTMLElement|null} The element or null if not found
   */
  static getElementById(id) {
    return document.getElementById(id);
  }

  /**
   * Safely query an element
   * @param {string} selector - CSS selector
   * @returns {HTMLElement|null} The element or null if not found
   */
  static querySelector(selector) {
    return document.querySelector(selector);
  }

  /**
   * Query multiple elements
   * @param {string} selector - CSS selector
   * @returns {NodeList} List of elements
   */
  static querySelectorAll(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Create an element with attributes
   * @param {string} tagName - Tag name
   * @param {Object} attributes - Attributes to set
   * @param {string} textContent - Text content to add
   * @returns {HTMLElement} Created element
   */
  static createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createElement(tagName);

    for (const [key, value] of Object.entries(attributes)) {
      if (key.startsWith('on') && typeof value === 'function') {
        element[key] = value;
      } else {
        element.setAttribute(key, value);
      }
    }

    if (textContent) {
      element.textContent = textContent;
    }

    return element;
  }

  /**
   * Add class to element
   * @param {HTMLElement} element - Target element
   * @param {string} className - Class name to add
   */
  static addClass(element, className) {
    if (element && element.classList) {
      element.classList.add(className);
    }
  }

  /**
   * Remove class from element
   * @param {HTMLElement} element - Target element
   * @param {string} className - Class name to remove
   */
  static removeClass(element, className) {
    if (element && element.classList) {
      element.classList.remove(className);
    }
  }

  /**
   * Toggle class on element
   * @param {HTMLElement} element - Target element
   * @param {string} className - Class name to toggle
   */
  static toggleClass(element, className) {
    if (element && element.classList) {
      element.classList.toggle(className);
    }
  }

  /**
   * Check if element has class
   * @param {HTMLElement} element - Target element
   * @param {string} className - Class name to check
   * @returns {boolean} True if element has class
   */
  static hasClass(element, className) {
    return element && element.classList ? element.classList.contains(className) : false;
  }

  /**
   * Get data attribute value
   * @param {HTMLElement} element - Target element
   * @param {string} name - Attribute name (without 'data-' prefix)
   * @returns {string|null} Attribute value or null
   */
  static getDataAttribute(element, name) {
    return element ? element.getAttribute(`data-${name}`) : null;
  }

  /**
   * Set data attribute value
   * @param {HTMLElement} element - Target element
   * @param {string} name - Attribute name (without 'data-' prefix)
   * @param {string} value - Attribute value
   */
  static setDataAttribute(element, name, value) {
    if (element) {
      element.setAttribute(`data-${name}`, value);
    }
  }

  /**
   * Remove data attribute
   * @param {HTMLElement} element - Target element
   * @param {string} name - Attribute name (without 'data-' prefix)
   */
  static removeDataAttribute(element, name) {
    if (element) {
      element.removeAttribute(`data-${name}`);
    }
  }

  /**
   * Append child to parent
   * @param {HTMLElement} parent - Parent element
   * @param {HTMLElement} child - Child element
   */
  static appendChild(parent, child) {
    if (parent && child) {
      parent.appendChild(child);
    }
  }

  /**
   * Remove element from DOM
   * @param {HTMLElement} element - Element to remove
   */
  static removeElement(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  /**
   * Insert element after another element
   * @param {HTMLElement} newNode - Node to insert
   * @param {HTMLElement} referenceNode - Reference node
   */
  static insertAfter(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  }

  /**
   * Check if element is in viewport
   * @param {HTMLElement} element - Element to check
   * @returns {boolean} True if element is in viewport
   */
  static isInViewport(element) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Get computed style property
   * @param {HTMLElement} element - Element to check
   * @param {string} property - Style property name
   * @returns {string} Computed style value
   */
  static getStyle(element, property) {
    return element ? window.getComputedStyle(element)[property] : null;
  }
}