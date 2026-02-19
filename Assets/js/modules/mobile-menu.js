/**
 * Mobile Menu Module
 * Handles the mobile menu functionality
 */

export class MobileMenu {
  constructor(menuToggleId = 'menuToggle', mobileMenuId = 'mobileMenu', closeMenuId = 'closeMenu') {
    this.menuToggle = document.getElementById(menuToggleId);
    this.mobileMenu = document.getElementById(mobileMenuId);
    this.closeMenu = document.getElementById(closeMenuId);
    this.body = document.body;
    this.mobileLinks = document.querySelectorAll('.mobile-link, .btn-cv-mobile');
    
    this.init();
  }
  
  init() {
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => this.open());
    }
    
    if (this.closeMenu) {
      this.closeMenu.addEventListener('click', () => this.close());
    }
    
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.close());
    });
    
    if (this.mobileMenu) {
      this.mobileMenu.addEventListener('click', (e) => {
        if (e.target === this.mobileMenu) {
          this.close();
        }
      });
    }
  }
  
  open() {
    if (this.mobileMenu) {
      this.mobileMenu.classList.add('active');
    }
    if (this.body) {
      this.body.classList.add('menu-open');
    }
  }
  
  close() {
    if (this.mobileMenu) {
      this.mobileMenu.classList.remove('active');
    }
    if (this.body) {
      this.body.classList.remove('menu-open');
    }
  }
  
  isOpen() {
    return this.mobileMenu?.classList.contains('active') || false;
  }
  
  toggle() {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }
}