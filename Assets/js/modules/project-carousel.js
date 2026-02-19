/**
 * Project Carousel Module
 * Handles the project carousel functionality
 */

export class ProjectCarousel {
  constructor(trackId = 'projectsTrack', prevBtnId = 'prevProject', nextBtnId = 'nextProject') {
    this.track = document.getElementById(trackId);
    this.prevBtn = document.getElementById(prevBtnId);
    this.nextBtn = document.getElementById(nextBtnId);
    this.dots = document.querySelectorAll('.carousel-dots .dot');
    this.cards = this.track ? [...this.track.querySelectorAll('.project-card')] : [];
    
    this.current = 0;
    this.total = this.cards.length;
    this.observer = null;
    
    this.init();
  }
  
  init() {
    if (!this.track || !this.prevBtn || !this.nextBtn || this.total === 0) return;
    
    this.updateUI();
    
    // Set up event listeners
    this.nextBtn.addEventListener('click', () => this.goTo(this.current + 1));
    this.prevBtn.addEventListener('click', () => this.goTo(this.current - 1));
    
    // Set up dot navigation
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });
    
    // Set up intersection observer for automatic slide detection
    this.setupIntersectionObserver();
  }
  
  getStep() {
    const card = this.cards[0];
    const gap = parseInt(getComputedStyle(this.track).gap) || 32;
    return card.offsetWidth + gap;
  }
  
  goTo(index) {
    this.current = Math.max(0, Math.min(index, this.total - 1));
    this.track.scrollTo({ left: this.current * this.getStep(), behavior: 'smooth' });
    this.updateUI();
  }
  
  updateUI() {
    if (this.prevBtn) this.prevBtn.disabled = this.current === 0;
    if (this.nextBtn) this.nextBtn.disabled = this.current === this.total - 1;
    
    this.dots.forEach((dot, i) => {
      if (dot) dot.classList.toggle('active', i === this.current);
    });
  }
  
  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const idx = Number(entry.target.dataset.index);
              if (!isNaN(idx)) {
                this.current = idx;
                this.updateUI();
              }
            }
          });
        },
        { root: this.track, threshold: 0.6 }
      );
      
      this.cards.forEach(card => this.observer.observe(card));
    }
  }
  
  destroy() {
    if (this.observer) {
      this.cards.forEach(card => this.observer.unobserve(card));
    }
  }
  
  next() {
    if (this.current < this.total - 1) {
      this.goTo(this.current + 1);
    }
  }
  
  prev() {
    if (this.current > 0) {
      this.goTo(this.current - 1);
    }
  }
  
  getCurrentIndex() {
    return this.current;
  }
  
  getTotalItems() {
    return this.total;
  }
}