/**
 * Navbar Module
 * Handles navbar scroll effects
 */

export class Navbar {
  constructor(navbarId = 'navbar') {
    this.navbar = document.getElementById(navbarId);
    this.init();
  }
  
  init() {
    if (!this.navbar) return;
    
    window.addEventListener('scroll', () => {
      this.navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }
  
  addScrollClass() {
    if (this.navbar) {
      this.navbar.classList.add('scrolled');
    }
  }
  
  removeScrollClass() {
    if (this.navbar) {
      this.navbar.classList.remove('scrolled');
    }
  }
  
  isScrolled() {
    return this.navbar?.classList.contains('scrolled') || false;
  }
}