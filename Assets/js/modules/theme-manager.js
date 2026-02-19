/**
 * Theme Manager Module
 * Handles dark/light theme switching
 */

export class ThemeManager {
  constructor() {
    this.html = document.documentElement;
    this.themeToggle = document.getElementById('themeToggle');
    this.sunIcon = document.getElementById('iconSun');
    this.moonIcon = document.getElementById('iconMoon');
    
    this.init();
  }
  
  init() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
    
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => {
        const current = this.html.getAttribute('data-theme');
        this.setTheme(current === 'dark' ? 'light' : 'dark');
      });
    }
  }
  
  setTheme(theme) {
    this.html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (this.sunIcon && this.moonIcon) {
      this.sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
      this.moonIcon.style.display = theme === 'light' ? 'block' : 'none';
    }
  }
  
  getCurrentTheme() {
    return this.html.getAttribute('data-theme');
  }
  
  toggleTheme() {
    const current = this.getCurrentTheme();
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }
}