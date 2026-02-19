/**
 * Button Component
 * Reusable button component with various styles and behaviors
 */

import { EventUtils } from '../utils/event-utils.js';
import { DOMUtils } from '../utils/dom-utils.js';

export class ButtonComponent {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) {
      throw new Error('Button element not found');
    }
    
    this.options = {
      variant: options.variant || 'primary',
      size: options.size || 'medium',
      disabled: options.disabled || false,
      onClick: options.onClick || null,
      loading: options.loading || false,
      ...options
    };
    
    this.originalText = this.element.textContent || this.element.innerText;
    this.init();
  }
  
  init() {
    this.setVariant();
    this.setSize();
    this.setDisabledState();
    this.setLoadingState();
    this.bindEvents();
  }
  
  bindEvents() {
    if (this.options.onClick) {
      this.element.addEventListener('click', this.options.onClick);
    }
  }
  
  setVariant(variant = this.options.variant) {
    // Remove all variant classes
    this.element.classList.remove(
      'btn-primary', 'btn-secondary', 'btn-outline', 
      'btn-success', 'btn-danger', 'btn-warning', 'btn-info'
    );
    
    // Add the new variant class
    this.element.classList.add(`btn-${variant}`);
    this.options.variant = variant;
  }
  
  setSize(size = this.options.size) {
    // Remove all size classes
    this.element.classList.remove(
      'btn-small', 'btn-medium', 'btn-large'
    );
    
    // Add the new size class
    this.element.classList.add(`btn-${size}`);
    this.options.size = size;
  }
  
  setDisabledState(disabled = this.options.disabled) {
    if (disabled) {
      this.element.disabled = true;
      this.element.classList.add('btn-disabled');
    } else {
      this.element.disabled = false;
      this.element.classList.remove('btn-disabled');
    }
    this.options.disabled = disabled;
  }
  
  setLoadingState(loading = this.options.loading) {
    if (loading) {
      this.element.classList.add('btn-loading');
      this.element.setAttribute('aria-busy', 'true');
      this.originalText = this.element.textContent || this.element.innerText;
      this.element.innerHTML = '<span class="btn-spinner"></span> Loading...';
    } else {
      this.element.classList.remove('btn-loading');
      this.element.removeAttribute('aria-busy');
      this.element.innerHTML = this.originalText;
    }
    this.options.loading = loading;
  }
  
  setText(text) {
    if (!this.options.loading) {
      this.originalText = text;
      this.element.textContent = text;
    }
  }
  
  click() {
    this.element.click();
  }
  
  focus() {
    this.element.focus();
  }
  
  blur() {
    this.element.blur();
  }
  
  destroy() {
    if (this.options.onClick) {
      this.element.removeEventListener('click', this.options.onClick);
    }
  }
  
  // Static method to create a new button element
  static create(options = {}) {
    const button = document.createElement('button');
    button.className = `btn btn-${options.variant || 'primary'} btn-${options.size || 'medium'}`;
    
    if (options.text) {
      button.textContent = options.text;
    }
    
    if (options.classes) {
      button.classList.add(...options.classes.split(' '));
    }
    
    if (options.id) {
      button.id = options.id;
    }
    
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        button.setAttribute(key, value);
      });
    }
    
    if (options.onClick) {
      button.addEventListener('click', options.onClick);
    }
    
    return new ButtonComponent(button, options);
  }
}