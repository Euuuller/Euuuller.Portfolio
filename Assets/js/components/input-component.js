/**
 * Input Component
 * Reusable input component with validation and styling
 */

import { EventUtils } from '../utils/event-utils.js';
import { DOMUtils } from '../utils/dom-utils.js';
import { Helpers } from '../utils/helpers.js';

export class InputComponent {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element || !['INPUT', 'TEXTAREA', 'SELECT'].includes(this.element.tagName)) {
      throw new Error('Input element not found or invalid type');
    }
    
    this.options = {
      label: options.label || '',
      placeholder: options.placeholder || '',
      required: options.required || false,
      validateOn: options.validateOn || 'blur', // 'blur', 'input', 'submit'
      validator: options.validator || null,
      errorMessage: options.errorMessage || 'Invalid input',
      successMessage: options.successMessage || '',
      showValidationFeedback: options.showValidationFeedback !== false,
      ...options
    };
    
    this.isValid = null;
    this.validationMessage = '';
    this.init();
  }
  
  init() {
    this.setupLabel();
    this.setPlaceholder();
    this.setRequired();
    this.bindEvents();
    this.createValidationElements();
  }
  
  setupLabel() {
    if (this.options.label) {
      // Look for existing label or create one
      let label = this.element.previousElementSibling;
      if (!label || !label.tagName === 'LABEL') {
        label = document.createElement('label');
        label.setAttribute('for', this.element.id);
        this.element.parentElement.insertBefore(label, this.element);
      }
      label.textContent = this.options.label;
    }
  }
  
  setPlaceholder() {
    if (this.options.placeholder) {
      this.element.placeholder = this.options.placeholder;
    }
  }
  
  setRequired() {
    if (this.options.required) {
      this.element.required = true;
    }
  }
  
  bindEvents() {
    // Validation event
    if (this.options.validateOn === 'input') {
      this.element.addEventListener('input', () => this.validate());
    } else if (this.options.validateOn === 'blur') {
      this.element.addEventListener('blur', () => this.validate());
    }
    
    // Real-time validation feedback
    this.element.addEventListener('input', () => {
      if (this.isValid === false) {
        this.validate(); // Re-validate as user types
      }
    });
  }
  
  createValidationElements() {
    if (this.options.showValidationFeedback) {
      // Create validation message container
      this.validationContainer = document.createElement('div');
      this.validationContainer.className = 'input-validation-message';
      this.validationContainer.style.display = 'none';
      this.element.parentNode.insertBefore(this.validationContainer, this.element.nextSibling);
    }
  }
  
  validate(value = this.element.value) {
    // Reset validation state
    this.isValid = true;
    this.validationMessage = '';
    
    // Required validation
    if (this.options.required && !value.trim()) {
      this.isValid = false;
      this.validationMessage = 'This field is required';
    }
    // Custom validator
    else if (this.options.validator && !this.options.validator(value)) {
      this.isValid = false;
      this.validationMessage = this.options.errorMessage;
    }
    
    // Update UI
    this.updateValidationUI();
    
    // Return validation result
    return this.isValid;
  }
  
  updateValidationUI() {
    // Remove previous validation classes
    this.element.classList.remove('input-valid', 'input-invalid');
    
    if (this.options.showValidationFeedback && this.validationContainer) {
      this.validationContainer.style.display = this.isValid === null ? 'none' : 'block';
      
      if (this.isValid === true) {
        this.validationContainer.textContent = this.options.successMessage;
        this.validationContainer.className = 'input-validation-message input-validation-success';
        this.element.classList.add('input-valid');
      } else if (this.isValid === false) {
        this.validationContainer.textContent = this.validationMessage;
        this.validationContainer.className = 'input-validation-message input-validation-error';
        this.element.classList.add('input-invalid');
      }
    }
  }
  
  setValue(value) {
    this.element.value = value;
    // Trigger validation if needed
    if (this.options.validateOn === 'input') {
      this.validate(value);
    }
  }
  
  getValue() {
    return this.element.value;
  }
  
  setError(message) {
    this.isValid = false;
    this.validationMessage = message;
    this.updateValidationUI();
  }
  
  clearError() {
    this.isValid = true;
    this.validationMessage = '';
    this.updateValidationUI();
  }
  
  focus() {
    this.element.focus();
  }
  
  blur() {
    this.element.blur();
  }
  
  disable() {
    this.element.disabled = true;
    this.element.classList.add('input-disabled');
  }
  
  enable() {
    this.element.disabled = false;
    this.element.classList.remove('input-disabled');
  }
  
  destroy() {
    // Remove event listeners
    if (this.options.validateOn === 'input') {
      this.element.removeEventListener('input', () => this.validate());
    } else if (this.options.validateOn === 'blur') {
      this.element.removeEventListener('blur', () => this.validate());
    }
    
    // Remove validation container
    if (this.validationContainer && this.validationContainer.parentNode) {
      this.validationContainer.parentNode.removeChild(this.validationContainer);
    }
  }
  
  // Static method to create a new input
  static create(type = 'text', options = {}) {
    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'input-wrapper';
    
    // Create input element
    let input;
    if (type === 'textarea') {
      input = document.createElement('textarea');
    } else if (type === 'select') {
      input = document.createElement('select');
    } else {
      input = document.createElement('input');
      input.type = type;
    }
    
    // Set common attributes
    if (options.id) input.id = options.id;
    if (options.name) input.name = options.name;
    if (options.value) input.value = options.value;
    if (options.classes) input.className = options.classes;
    
    // Add to wrapper
    wrapper.appendChild(input);
    
    // Add to document if parent specified
    if (options.parent) {
      const parent = typeof options.parent === 'string' ? 
        document.querySelector(options.parent) : options.parent;
      if (parent) {
        parent.appendChild(wrapper);
      }
    }
    
    // Create and return the component instance
    return new InputComponent(input, options);
  }
  
  // Common validation helpers
  static validators = {
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^\+?[\d\s\-\(\)]+$/.test(value),
    url: (value) => /^https?:\/\/.+/.test(value),
    minLength: (min) => (value) => value.length >= min,
    maxLength: (max) => (value) => value.length <= max,
    pattern: (regex) => (value) => regex.test(value),
    required: (value) => value.trim() !== ''
  };
}