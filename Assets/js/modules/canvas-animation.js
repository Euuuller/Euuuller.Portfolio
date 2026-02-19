/**
 * Canvas Animation Module
 * Handles the mathematical symbols animation in the background
 */

export class CanvasAnimation {
  constructor(canvasId = 'mathCanvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.symbols = [
      'e^{iπ}+1=0', 'f(x)=∫g(t)dt', '∇²φ=ρ/ε₀', 'lim_{x→∞}', 'Σaₙxⁿ',
      '∂f/∂x', 'P(A|B)', 'μ=Σx/n', 'σ²=Var(X)', 'z=R+jX', 'F=ma',
      'y=mx+b', 'det(A)', 'E[X]', 'χ²', 'R²', '∞', '√(x²+y²)',
      'β₀+β₁x', 'log₂(n)', '∀x∈ℝ', '∃ε>0', '∬f dA', '∮F·ds'
    ];
    this.particles = [];
    this.animationFrameId = null;
    
    this.init();
  }
  
  init() {
    if (!this.canvas) return;
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.animate();
  }
  
  createParticle(fromTop = true) {
    return {
      x: Math.random() * this.canvas.width,
      y: fromTop ? Math.random() * this.canvas.height : this.canvas.height + 20,
      text: this.symbols[Math.floor(Math.random() * this.symbols.length)],
      size: 11 + Math.random() * 12,
      opacity: 0.035 + Math.random() * 0.1,
      speed: 0.1 + Math.random() * 0.25,
      angle: Math.random() * Math.PI * 2
    };
  }
  
  resizeCanvas() {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const count = Math.floor(this.canvas.width * this.canvas.height / 26000);
    this.particles = Array.from({ length: count }, () => this.createParticle(true));
    this.draw();
  }
  
  draw() {
    if (!this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const color = isDark ? '255,255,255' : '0,0,0';

    for (let p of this.particles) {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);
      this.ctx.font = `${p.size}px Georgia, serif`;
      this.ctx.fillStyle = `rgba(${color},${p.opacity})`;
      this.ctx.fillText(p.text, 0, 0);
      this.ctx.restore();
    }
  }
  
  animate() {
    if (!this.canvas) return;
    
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].y -= this.particles[i].speed;
      this.particles[i].angle += 0.0008;
      if (this.particles[i].y < -50) {
        this.particles[i] = this.createParticle(false);
      }
    }
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}