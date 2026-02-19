/**
 * Project Modal Module
 * Handles the project detail modal functionality
 */

export class ProjectModal {
  constructor(modalId = 'projectModal', closeModalId = 'closeModal') {
    this.modalOverlay = document.getElementById(modalId);
    this.modalTitle = document.getElementById('modalTitle');
    this.modalDesafio = document.getElementById('modalDesafio');
    this.modalSolucao = document.getElementById('modalSolucao');
    this.modalImpacto = document.getElementById('modalImpacto');
    this.modalTags = document.getElementById('modalTags');
    this.modalMetrics = document.getElementById('modalMetrics');
    this.modalLinks = document.getElementById('modalLinks');
    this.closeModalBtn = document.getElementById(closeModalId);
    this.body = document.body;
    
    this.projectsData = [
      {
        title: 'Segmentação de Clientes (RFM)',
        desafio: 'Empresa de e-commerce com dificuldade em personalizar campanhas de marketing devido à falta de segmentação adequada.',
        solucao: 'Aplicação da análise RFM (Recência, Frequência, Valor Monetário) com clustering K-Means para agrupar clientes em perfis de compra.',
        impacto: 'Aumento de 23% na taxa de conversão das campanhas e redução de 15% no custo de aquisição de clientes.',
        tags: ['Python', 'SQL', 'Pandas', 'Scikit-learn'],
        metrics: ['1.5k Registros', '5 Segmentos'],
        github: '#',
        demo: '#'
      },
      {
        title: 'Dashboard de Vendas',
        desafio: 'Diretoria sem visibilidade em tempo real dos indicadores de vendas, dificultando decisões estratégicas.',
        solucao: 'Criação de um dashboard interativo no Power BI conectado diretamente ao banco de dados transacional, com atualização automática.',
        impacto: 'Redução de 30% no tempo de reuniões de análise e identificação de oportunidades de cross-selling.',
        tags: ['Power BI', 'DAX', 'SQL', 'Excel'],
        metrics: ['KPIs em Tempo Real', '+15 usuários'],
        github: '#',
        demo: '#'
      },
      {
        title: 'Detecção de Fraudes (ML)',
        desafio: 'Instituição financeira com alta taxa de fraudes não detectadas, gerando prejuízos significativos.',
        solucao: 'Desenvolvimento de modelo XGBoost com balanceamento de classes e validação cruzada para identificar transações suspeitas.',
        impacto: 'Acurácia de 95%, redução de 70% nos falsos negativos e economia anual estimada em R$ 2 milhões.',
        tags: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas'],
        metrics: ['95% Precisão', '2% Falsos Positivos'],
        github: '#',
        demo: '#'
      }
    ];
    
    this.init();
  }
  
  init() {
    // Add click listeners to project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('a')) {
          const cardIndex = card.getAttribute('data-index');
          if (cardIndex !== null) {
            this.open(parseInt(cardIndex));
          }
        }
      });
    });
    
    // Add event listener to close button
    if (this.closeModalBtn) {
      this.closeModalBtn.addEventListener('click', () => this.close());
    }
    
    // Add event listener to modal overlay
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.close();
        }
      });
    }
    
    // Add keyboard event listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay?.classList.contains('active')) {
        this.close();
      }
    });
  }
  
  open(index) {
    const project = this.projectsData[index];
    if (!project) return;
    
    // Set modal content
    if (this.modalTitle) this.modalTitle.textContent = project.title;
    if (this.modalDesafio) this.modalDesafio.textContent = project.desafio;
    if (this.modalSolucao) this.modalSolucao.textContent = project.solucao;
    if (this.modalImpacto) this.modalImpacto.textContent = project.impacto;
    
    // Set tags
    if (this.modalTags) {
      this.modalTags.innerHTML = '';
      project.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'modal-tag';
        span.textContent = tag;
        this.modalTags.appendChild(span);
      });
    }
    
    // Set metrics
    if (this.modalMetrics) {
      this.modalMetrics.innerHTML = '';
      project.metrics.forEach(metric => {
        const parts = metric.split(' ');
        const value = parts[0];
        const label = parts.slice(1).join(' ') || '';
        const div = document.createElement('div');
        div.className = 'metric-item';
        div.innerHTML = `<span class="metric-value">${value}</span><span class="metric-label">${label}</span>`;
        this.modalMetrics.appendChild(div);
      });
    }
    
    // Set links
    if (this.modalLinks) {
      this.modalLinks.innerHTML = `
        <a href="${project.github}" class="modal-link" target="_blank">GitHub</a>
        <a href="${project.demo}" class="modal-link secondary" target="_blank">Ver Demo</a>
      `;
    }
    
    // Show modal
    if (this.modalOverlay) this.modalOverlay.classList.add('active');
    if (this.body) this.body.classList.add('modal-open');
  }
  
  close() {
    if (this.modalOverlay) this.modalOverlay.classList.remove('active');
    if (this.body) this.body.classList.remove('modal-open');
  }
  
  isOpen() {
    return this.modalOverlay?.classList.contains('active') || false;
  }
  
  getProjectsData() {
    return [...this.projectsData];
  }
  
  updateProjectData(index, newData) {
    if (index >= 0 && index < this.projectsData.length) {
      this.projectsData[index] = { ...this.projectsData[index], ...newData };
    }
  }
}