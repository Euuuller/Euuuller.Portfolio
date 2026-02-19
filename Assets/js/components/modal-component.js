/**
 * Modal Component
 * Reusable modal component with various configurations
 */

import { EventUtils } from '../utils/event-utils.js';
import { DOMUtils } from '../utils/dom-utils.js';
import { Helpers } from '../utils/helpers.js';

export class ModalComponent {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    if (!this.element) {
      throw new Error('Modal element not found');
    }
    
    this.options = {
      closable: options.closable !== undefined ? options.closable : true,
      closeOnEscape: options.closeOnEscape !== undefined ? options.closeOnEscape : true,
      closeOnOutsideClick: options.closeOnOutsideClick !== undefined ? options.closeOnOutsideClick : true,
      backdrop: options.backdrop !== undefined ? options.backdrop : true,
      animation: options.animation !== undefined ? options.animation : 'fade',
      onOpen: options.onOpen || null,
      onClose: options.onClose || null,
      ...options
    };
    
    this.isOpen = false;
    this.originalBodyOverflow = '';
    this.init();
  }
  
  init() {
    this.createStructure();
    this.bindEvents();
  }
  
  createStructure() {
    // Ensure the modal has the proper structure
    if (this.options.backdrop) {
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'modal-backdrop';
      this.backdrop.style.display = 'none';
      document.body.appendChild(this.backdrop);
    }
    
    // Add animation class if specified
    if (this.options.animation) {
      this.element.classList.add(`modal-${this.options.animation}`);
    }
  }
  
  bindEvents() {
    // Bind close button events
    if (this.options.closable) {
      const closeButtons = this.element.querySelectorAll('.modal-close, .modal__close, [data-modal-close]');
      closeButtons.forEach(button => {
        button.addEventListener('click', () => this.close());
      });
    }
    
    // Bind escape key event
    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }
    
    // Bind outside click event
    if (this.options.closeOnOutsideClick) {
      this.element.addEventListener('click', (event) => {
        if (event.target === this.element) {
          this.close();
        }
      });
    }
  }
  
  open() {
    if (this.isOpen) return;
    
    // Store original body overflow
    this.originalBodyOverflow = document.body.style.overflow;
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    
    // Show backdrop if exists
    if (this.backdrop) {
      this.backdrop.style.display = 'block';
      // Trigger reflow to ensure display is applied before adding active class
      this.backdrop.offsetHeight;
      this.backdrop.classList.add('active');
    }
    
    // Show modal
    this.element.style.display = 'block';
    // Trigger reflow to ensure display is applied before adding active class
    this.element.offsetHeight;
    this.element.classList.add('active');
    
    this.isOpen = true;
    
    // Focus on modal for accessibility
    this.element.setAttribute('tabindex', '-1');
    this.element.focus();
    
    // Execute onOpen callback
    if (this.options.onOpen) {
      this.options.onOpen(this);
    }
    
    // Dispatch custom event
    EventUtils.dispatchCustomEvent('modal:open', { modal: this });
  }
  
  close() {
    if (!this.isOpen) return;
    
    // Hide modal
    this.element.classList.remove('active');
    
    // Hide backdrop if exists
    if (this.backdrop) {
      this.backdrop.classList.remove('active');
    }
    
    // Restore body scroll after transition
    setTimeout(() => {
      this.element.style.display = 'none';
      
      if (this.backdrop) {
        this.backdrop.style.display = 'none';
      }
      
      // Restore original body overflow
      document.body.style.overflow = this.originalBodyOverflow;
      
      this.isOpen = false;
      
      // Execute onClose callback
      if (this.options.onClose) {
        this.options.onClose(this);
      }
      
      // Dispatch custom event
      EventUtils.dispatchCustomEvent('modal:close', { modal: this });
    }, 300); // Match CSS transition duration
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  setContent(content) {
    const contentElement = this.element.querySelector('.modal-content') || 
                          this.element.querySelector('.modal__content') ||
                          this.element;
    
    if (Helpers.isString(content)) {
      contentElement.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      contentElement.innerHTML = '';
      contentElement.appendChild(content);
    }
  }
  
  setTitle(title) {
    const titleElement = this.element.querySelector('.modal-title') || 
                        this.element.querySelector('.modal__title');
    
    if (titleElement) {
      titleElement.textContent = title;
    }
  }
  
  destroy() {
    // Remove event listeners
    if (this.options.closeOnEscape) {
      // We can't easily remove the specific event listener since it's an anonymous function
      // In a real implementation, we'd store the handler function to be able to remove it
    }
    
    // Remove backdrop if it exists
    if (this.backdrop && this.backdrop.parentNode) {
      this.backdrop.parentNode.removeChild(this.backdrop);
    }
  }
  
  // Static method to create a new modal
  static create(options = {}) {
    // Create modal structure
    const modal = document.createElement('div');
    modal.className = `modal ${options.animation ? `modal-${options.animation}` : ''}`;
    modal.style.display = 'none';
    
    // Add modal content
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          ${options.header ? `<div class="modal-header"><h3 class="modal-title">${options.title || ''}</h3></div>` : ''}
          <div class="modal-body">
            ${options.content || ''}
          </div>
          ${options.footer ? `<div class="modal-footer">${options.footer}</div>` : ''}
          ${options.closable !== false ? '<button class="modal-close" aria-label="Close">&times;</button>' : ''}
        </div>
      </div>
    `;
    
    // Append to body
    document.body.appendChild(modal);
    
    // Create and return the component instance
    return new ModalComponent(modal, options);
  }
}