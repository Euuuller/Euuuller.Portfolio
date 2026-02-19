/**
 * Main Application File
 * Initializes all modules and sets up the application
 */

import { CanvasAnimation } from './modules/canvas-animation.js';
import { ThemeManager } from './modules/theme-manager.js';
import { Navbar } from './modules/navbar.js';
import { TypingEffect } from './modules/typing-effect.js';
import { ProjectCarousel } from './modules/project-carousel.js';
import { SmoothScroll } from './modules/smooth-scroll.js';
import { ScrollReveal } from './modules/scroll-reveal.js';
import { MobileMenu } from './modules/mobile-menu.js';
import { ProjectModal } from './modules/project-modal.js';

// Import utilities
import { DOMUtils } from './utils/dom-utils.js';
import { EventUtils } from './utils/event-utils.js';
import { Helpers } from './utils/helpers.js';

// Import components
import { ButtonComponent } from './components/button-component.js';
import { ModalComponent } from './components/modal-component.js';
import { InputComponent } from './components/input-component.js';

class PortfolioApp {
  constructor() {
    this.modules = {};
    this.init();
  }
  
  init() {
    // Initialize all modules
    this.modules.canvasAnimation = new CanvasAnimation();
    this.modules.themeManager = new ThemeManager();
    this.modules.navbar = new Navbar();
    this.modules.typingEffect = new TypingEffect();
    this.modules.projectCarousel = new ProjectCarousel();
    this.modules.smoothScroll = new SmoothScroll();
    this.modules.scrollReveal = new ScrollReveal();
    this.modules.mobileMenu = new MobileMenu();
    this.modules.projectModal = new ProjectModal();
    
    // Initialize utilities
    this.utils = {
      DOMUtils,
      EventUtils,
      Helpers
    };
    
    // Initialize components
    this.components = {
      ButtonComponent,
      ModalComponent,
      InputComponent
    };
    
    console.log('Portfolio application initialized with all modules, utilities, and components.');
  }
  
  destroy() {
    // Clean up all modules
    if (this.modules.canvasAnimation) {
      this.modules.canvasAnimation.destroy();
    }
    
    if (this.modules.projectCarousel) {
      this.modules.projectCarousel.destroy();
    }
    
    if (this.modules.scrollReveal) {
      this.modules.scrollReveal.disconnect();
    }
    
    console.log('Portfolio application destroyed.');
  }
  
  getModule(moduleName) {
    return this.modules[moduleName];
  }
  
  // Convenience methods to access commonly used modules
  toggleTheme() {
    this.modules.themeManager?.toggleTheme();
  }
  
  openMobileMenu() {
    this.modules.mobileMenu?.open();
  }
  
  closeMobileMenu() {
    this.modules.mobileMenu?.close();
  }
  
  openProjectModal(index) {
    this.modules.projectModal?.open(index);
  }
  
  closeProjectModal() {
    this.modules.projectModal?.close();
  }
  
  goToNextProject() {
    this.modules.projectCarousel?.next();
  }
  
  goToPrevProject() {
    this.modules.projectCarousel?.prev();
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});

// Also initialize when page is fully loaded
window.addEventListener('load', () => {
  if (window.portfolioApp) {
    console.log('Portfolio application fully loaded.');
  }
});

// Export the PortfolioApp class for potential external use
export { PortfolioApp };