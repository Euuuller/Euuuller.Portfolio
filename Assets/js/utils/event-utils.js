/**
 * Event Utilities
 * Common event handling functions
 */

export class EventUtils {
  /**
   * Add event listener with options
   * @param {EventTarget} target - Event target
   * @param {string} eventType - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event listener options
   */
  static addListener(target, eventType, handler, options = {}) {
    if (target && typeof target.addEventListener === 'function') {
      target.addEventListener(eventType, handler, options);
    }
  }

  /**
   * Remove event listener
   * @param {EventTarget} target - Event target
   * @param {string} eventType - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event listener options
   */
  static removeListener(target, eventType, handler, options = {}) {
    if (target && typeof target.removeEventListener === 'function') {
      target.removeEventListener(eventType, handler, options);
    }
  }

  /**
   * Create a debounced function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Whether to trigger immediately
   * @returns {Function} Debounced function
   */
  static debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  }

  /**
   * Create a throttled function
   * @param {Function} func - Function to throttle
   * @param {number} limit - Throttle limit in milliseconds
   * @returns {Function} Throttled function
   */
  static throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Wait for element to exist in DOM
   * @param {string} selector - Element selector
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<HTMLElement>} Promise that resolves with the element
   */
  static waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = document.querySelector(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Dispatch a custom event
   * @param {string} eventName - Event name
   * @param {*} detail - Event detail data
   * @param {EventTarget} target - Target to dispatch event on (defaults to document)
   */
  static dispatchCustomEvent(eventName, detail = null, target = document) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail: detail
    });
    target.dispatchEvent(event);
  }

  /**
   * Listen for a custom event once
   * @param {string} eventName - Event name
   * @param {Function} handler - Event handler
   * @param {EventTarget} target - Target to listen on (defaults to document)
   */
  static once(eventName, handler, target = document) {
    target.addEventListener(eventName, handler, { once: true });
  }

  /**
   * Prevent default and stop propagation
   * @param {Event} event - Event object
   */
  static preventAndStop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Check if event target matches selector
   * @param {Event} event - Event object
   * @param {string} selector - Selector to match
   * @returns {Element|null} Matching element or null
   */
  static matches(event, selector) {
    if (event.target.matches(selector)) {
      return event.target;
    } else {
      const closest = event.target.closest(selector);
      return closest;
    }
  }

  /**
   * Get mouse position relative to element
   * @param {MouseEvent} event - Mouse event
   * @param {HTMLElement} element - Reference element
   * @returns {{x: number, y: number}} Position object
   */
  static getMousePosition(event, element) {
    const rect = element.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  /**
   * Check if key is pressed
   * @param {KeyboardEvent} event - Keyboard event
   * @param {string} key - Key to check
   * @returns {boolean} True if key is pressed
   */
  static isKeyPressed(event, key) {
    return event.key === key || event.code === key;
  }

  /**
   * Wait for specified time
   * @param {number} ms - Time in milliseconds
   * @returns {Promise} Promise that resolves after specified time
   */
  static wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Execute function when document is ready
   * @param {Function} callback - Function to execute
   */
  static documentReady(callback) {
    if (document.readyState !== 'loading') {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }
}