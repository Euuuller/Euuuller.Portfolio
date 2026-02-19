/**
 * Scroll Reveal Module
 * Handles the reveal animation on scroll
 */

export class ScrollReveal {
  constructor(selector = '.reveal', options = {}) {
    this.selector = selector;
    this.options = {
      threshold: 0.1,
      ...options
    };
    this.observer = null;
    
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
            }
          });
        },
        this.options
      );
      
      document.querySelectorAll(this.selector).forEach(el => {
        this.observer.observe(el);
      });
    } else {
      // Fallback: show all elements if IntersectionObserver is not supported
      document.querySelectorAll(this.selector).forEach(el => {
        el.classList.add('show');
      });
    }
  }
  
  observe(element) {
    if (this.observer && element) {
      this.observer.observe(element);
    }
  }
  
  unobserve(element) {
    if (this.observer && element) {
      this.observer.unobserve(element);
    }
  }
  
  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  refresh() {
    this.disconnect();
    this.init();
  }
  
  revealAll() {
    document.querySelectorAll(this.selector).forEach(el => {
      el.classList.add('show');
    });
  }
}