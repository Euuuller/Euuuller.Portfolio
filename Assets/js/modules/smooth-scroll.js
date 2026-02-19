/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */

export class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    // Handle scroll down button
    const scrollDownBtn = document.getElementById('scrollDown');
    if (scrollDownBtn) {
      scrollDownBtn.addEventListener('click', () => {
        const target = document.getElementById('sobre');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }
  
  scrollToElement(element, behavior = 'smooth') {
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior });
    } else if (typeof element === 'string') {
      const target = document.querySelector(element);
      if (target) {
        target.scrollIntoView({ behavior });
      }
    }
  }
  
  scrollToTop(behavior = 'smooth') {
    window.scrollTo({ top: 0, behavior });
  }
  
  scrollToBottom(behavior = 'smooth') {
    window.scrollTo({ top: document.body.scrollHeight, behavior });
  }
}