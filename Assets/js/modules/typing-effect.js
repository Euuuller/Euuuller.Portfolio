/**
 * Typing Effect Module
 * Handles the animated typing effect in the hero section
 */

export class TypingEffect {
  constructor(elementId = 'typedText', words = []) {
    this.elementId = elementId;
    this.words = words.length > 0 ? words : ['Data Analyst', 'Data Scientist', 'Python Developer', 'SQL Expert'];
    this.wordIndex = 0;
    this.charIndex = 0;
    this.deleting = false;
    this.timeoutId = null;
    
    this.init();
  }
  
  init() {
    this.type();
  }
  
  type() {
    const typedEl = document.getElementById(this.elementId);
    if (!typedEl) return;
    
    const currentWord = this.words[this.wordIndex];
    
    if (this.deleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }
    
    typedEl.textContent = currentWord.slice(0, this.charIndex);
    
    let delay = this.deleting ? 60 : 110;
    
    if (!this.deleting && this.charIndex === currentWord.length) {
      delay = 1800;
      this.deleting = true;
    } else if (this.deleting && this.charIndex === 0) {
      this.deleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      delay = 400;
    }
    
    this.timeoutId = setTimeout(() => this.type(), delay);
  }
  
  stop() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
  
  restart() {
    this.stop();
    this.wordIndex = 0;
    this.charIndex = 0;
    this.deleting = false;
    this.type();
  }
  
  setWords(newWords) {
    this.words = newWords;
    this.restart();
  }
}