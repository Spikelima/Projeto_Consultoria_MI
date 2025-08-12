// Mobile-First Responsive Application for Mentor Interativa Proposal - WITH ACCORDION FUNCTIONALITY - FIXED NAVIGATION

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mentor Interativa Proposal - Inicializando aplicação...');
    
    // Initialize core functionality
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Hide loading overlay first
    hideLoadingOverlay();
    
    // Initialize navigation systems
    initMobileMenu();
    initNavigation();
    
    // Initialize accordion functionality
    initAccordions();
    
    // Initialize timeline stage interactions
    initTimelineStages();
    
    // Initialize interactions
    initInteractions();
    initPWA();
    initAccessibility();
    
    // Show home section by default
    showSection('home');
    
    console.log('✅ Aplicação inicializada com sucesso');
}

// Accordion functionality
function initAccordions() {
    console.log('Inicializando accordions...');
    
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    
    accordionToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const content = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            if (isExpanded) {
                // Close accordion
                this.setAttribute('aria-expanded', 'false');
                content.classList.remove('expanded');
                content.style.maxHeight = '0';
                
                console.log('Accordion fechado:', this.querySelector('.accordion-title').textContent);
            } else {
                // Open accordion
                this.setAttribute('aria-expanded', 'true');
                content.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
                
                console.log('Accordion aberto:', this.querySelector('.accordion-title').textContent);
                
                // Auto-adjust height after transition
                setTimeout(() => {
                    if (content.classList.contains('expanded')) {
                        content.style.maxHeight = 'none';
                    }
                }, 300);
            }
        });
        
        // Keyboard accessibility
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    console.log(`✅ ${accordionToggles.length} accordions inicializados`);
}

// Timeline stage interactions
function initTimelineStages() {
    console.log('Inicializando interações de timeline stages...');
    
    const stageItems = document.querySelectorAll('.stage-item');
    
    stageItems.forEach(stage => {
        stage.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const etapaId = this.getAttribute('data-stage');
            if (etapaId) {
                const etapaCard = document.querySelector(`.etapa-card[data-etapa="${etapaId}"]`);
                if (etapaCard) {
                    // Smooth scroll to etapa card
                    etapaCard.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    
                    // Highlight the card briefly
                    etapaCard.style.transform = 'scale(1.02)';
                    etapaCard.style.boxShadow = '0 8px 30px rgba(255, 140, 0, 0.3)';
                    
                    setTimeout(() => {
                        etapaCard.style.transform = '';
                        etapaCard.style.boxShadow = '';
                    }, 800);
                    
                    console.log('Timeline stage clicado:', etapaId);
                }
            }
        });
        
        // Keyboard accessibility
        stage.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add tabindex for keyboard navigation
        stage.setAttribute('tabindex', '0');
    });
    
    console.log(`✅ ${stageItems.length} timeline stages inicializados`);
}

// Loading management
function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }
}

function showLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
    }
}

// Mobile menu functionality - FIXED VERSION
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavButtons = document.querySelectorAll('.mobile-nav .nav-btn');
    
    if (!mobileToggle || !mobileNav) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = this.classList.contains('active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu when clicking nav items
    mobileNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Clear any stuck active states
            clearStuckNavStates();
            
            setTimeout(() => {
                closeMobileMenu();
            }, 100);
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileToggle.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (mobileToggle.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    function openMobileMenu() {
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
        
        // Clear any stuck states
        clearStuckNavStates();
    }
    
    // Fix for stuck navigation states
    function clearStuckNavStates() {
        // Remove any stuck hover or active states
        const allNavButtons = document.querySelectorAll('.nav-btn');
        allNavButtons.forEach(btn => {
            btn.blur(); // Remove focus
            btn.style.transform = '';
            btn.style.boxShadow = '';
        });
    }
}

// Navigation system - COMPLETELY FIXED VERSION
function initNavigation() {
    const allNavButtons = document.querySelectorAll('.nav-btn');
    const quickNavButtons = document.querySelectorAll('.quick-nav-buttons .btn, .quick-nav-buttons button');
    
    console.log('Inicializando navegação com', allNavButtons.length, 'botões de navegação');
    console.log('Quick nav buttons encontrados:', quickNavButtons.length);
    
    // Main navigation buttons - both desktop and mobile
    allNavButtons.forEach((button, index) => {
        const targetSection = button.getAttribute('data-section');
        
        if (targetSection) {
            console.log(`Configurando botão ${index + 1}: ${targetSection}`);
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Clear stuck states immediately
                clearAllStuckStates();
                
                const sectionToShow = this.getAttribute('data-section');
                console.log('Navegação clicada:', sectionToShow);
                
                if (sectionToShow) {
                    // Update active state for all nav buttons
                    updateActiveNavState(sectionToShow);
                    
                    // Show the target section
                    showSection(sectionToShow);
                    
                    // Smooth scroll to top
                    scrollToTop();
                }
            });
        }
    });
    
    // Quick navigation buttons - FIXED VERSION
    quickNavButtons.forEach((button, index) => {
        const targetSection = button.getAttribute('data-section');
        if (targetSection) {
            console.log(`Configurando quick nav ${index + 1}: ${targetSection}`);
            
            // Remove any existing event listeners
            button.removeEventListener('click', handleQuickNavClick);
            
            // Add new event listener
            button.addEventListener('click', handleQuickNavClick);
        }
    });
    
    // Quick nav click handler
    function handleQuickNavClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Clear stuck states
        clearAllStuckStates();
        
        const sectionToShow = this.getAttribute('data-section');
        console.log('Quick nav clicada:', sectionToShow, this);
        
        if (sectionToShow) {
            updateActiveNavState(sectionToShow);
            showSection(sectionToShow);
            scrollToTop();
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    }
    
    // Function to clear all stuck states
    function clearAllStuckStates() {
        const allButtons = document.querySelectorAll('.nav-btn, .btn');
        allButtons.forEach(btn => {
            btn.blur();
            btn.style.transform = '';
            btn.style.boxShadow = '';
            btn.style.background = '';
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const buttons = Array.from(document.querySelectorAll('.desktop-nav .nav-btn'));
        const currentActive = document.querySelector('.desktop-nav .nav-btn.active');
        const currentIndex = buttons.indexOf(currentActive);
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
            } else {
                nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
            }
            
            if (buttons[nextIndex]) {
                buttons[nextIndex].click();
            }
        }
        
        // Number keys for quick navigation (1-6)
        if (e.key >= '1' && e.key <= '6') {
            const sectionIndex = parseInt(e.key) - 1;
            if (buttons[sectionIndex]) {
                buttons[sectionIndex].click();
            }
        }
        
        // Home key goes to home
        if (e.key === 'Home') {
            buttons[0]?.click();
        }
    });
    
    console.log('✅ Sistema de navegação inicializado');
}

// Update active navigation state - FIXED VERSION
function updateActiveNavState(activeSectionId) {
    const allNavButtons = document.querySelectorAll('.nav-btn');
    
    console.log(`Atualizando estado ativo para: ${activeSectionId}`);
    
    allNavButtons.forEach(btn => {
        const btnSection = btn.getAttribute('data-section');
        if (btnSection === activeSectionId) {
            btn.classList.add('active');
            console.log(`Ativado botão: ${btnSection}`);
        } else {
            btn.classList.remove('active');
        }
    });
}

// Core section switching logic - FIXED VERSION
function showSection(sectionId) {
    console.log('=== MOSTRANDO SEÇÃO ===');
    console.log('Seção solicitada:', sectionId);
    
    const allSections = document.querySelectorAll('.section');
    const targetSection = document.getElementById(sectionId);
    
    console.log('Total de seções encontradas:', allSections.length);
    console.log('Seção alvo encontrada:', !!targetSection);
    
    if (!targetSection) {
        console.error('❌ Seção não encontrada:', sectionId);
        // List available sections
        console.log('Seções disponíveis:');
        allSections.forEach(section => {
            console.log(`- ${section.id}`);
        });
        return;
    }
    
    // Hide all sections first
    allSections.forEach((section, index) => {
        section.classList.remove('active');
        section.style.display = 'none';
        console.log(`Ocultando seção ${index + 1}: ${section.id}`);
    });
    
    // Show target section with proper display and animation
    console.log(`Mostrando seção: ${sectionId}`);
    targetSection.style.display = 'block';
    
    // Force a reflow before adding active class
    targetSection.offsetHeight;
    
    setTimeout(() => {
        targetSection.classList.add('active');
        
        // Trigger section-specific initializations
        initSectionSpecific(sectionId);
        
        // Trigger entrance animations
        triggerSectionAnimations(targetSection);
        
        console.log(`✅ Seção ativa: ${sectionId}`);
    }, 50);
}

// Section-specific initializations
function initSectionSpecific(sectionId) {
    console.log(`Inicializando funcionalidades específicas para: ${sectionId}`);
    
    switch (sectionId) {
        case 'investimento':
            setTimeout(() => {
                initHoursChart();
            }, 200);
            break;
        case 'cronograma':
            initGanttAnimations();
            break;
        case 'escopo':
            // Highlight project overview section
            const overview = document.querySelector('.project-overview-timeline');
            if (overview) {
                overview.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    overview.style.animation = '';
                }, 600);
            }
            
            // Re-initialize accordions if needed
            const accordions = document.querySelectorAll('.accordion-toggle');
            if (accordions.length > 0) {
                console.log(`Re-verificando ${accordions.length} accordions na seção escopo`);
            }
            break;
        default:
            break;
    }
}

// Section animations
function triggerSectionAnimations(section) {
    const animatedElements = section.querySelectorAll(
        '.canvas-card, .challenge-card, .etapa-card, .result-card, .project-overview-timeline, .table-row'
    );
    
    animatedElements.forEach((element, index) => {
        // Reset animation state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 50 + 100);
    });
}

// Hours chart initialization (replacing investment chart) - FIXED VERSION
function initHoursChart() {
    const ctx = document.getElementById('hoursChart');
    if (!ctx) {
        console.log('Canvas do gráfico não encontrado');
        return;
    }
    
    console.log('Inicializando gráfico de distribuição de horas...');
    
    // Destroy existing chart
    if (window.hoursChartInstance) {
        window.hoursChartInstance.destroy();
        window.hoursChartInstance = null;
    }
    
    const data = {
        labels: [
            'Kickoff',
            'Diagnóstico',
            'Organização', 
            'Implementação',
            'LMS',
            'Conhecimento'
        ],
        datasets: [{
            data: [20, 60, 80, 60, 40, 40],
            backgroundColor: [
                '#1FB8CD',
                '#FFC185',
                '#B4413C',
                '#ECEBD5',
                '#5D878F',
                '#DB4545'
            ],
            borderWidth: 3,
            borderColor: '#fff',
            hoverBorderWidth: 4,
            hoverOffset: 8
        }]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: window.innerWidth < 768 ? 'bottom' : 'right',
                align: 'center',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 12,
                        family: 'FKGroteskNeue, Inter, sans-serif'
                    },
                    generateLabels: function(chart) {
                        const data = chart.data;
                        return data.labels.map((label, i) => {
                            const hours = data.datasets[0].data[i];
                            return {
                                text: `${label}: ${hours}h`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                strokeStyle: '#fff',
                                lineWidth: 2,
                                pointStyle: 'circle',
                                hidden: false,
                                index: i
                            };
                        });
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#FF8C00',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const hours = context.parsed;
                        return `${label}: ${hours} horas`;
                    },
                    afterLabel: function(context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${percentage}% do total de horas`;
                    }
                }
            }
        },
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: 'easeOutQuart'
        },
        interaction: {
            intersect: false
        }
    };
    
    try {
        window.hoursChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
        console.log('✅ Gráfico de horas inicializado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao inicializar gráfico:', error);
    }
}

// Gantt chart animations
function initGanttAnimations() {
    const ganttBars = document.querySelectorAll('.gantt-bar');
    
    ganttBars.forEach((bar, index) => {
        // Reset animation
        bar.style.transform = 'translateY(-50%) scaleX(0)';
        bar.style.transformOrigin = 'left center';
        bar.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        // Animate after delay
        setTimeout(() => {
            bar.style.transform = 'translateY(-50%) scaleX(1)';
        }, index * 200 + 300);
    });
}

// Interactive elements and touch handling
function initInteractions() {
    // Enhanced hover/touch effects for cards
    const interactiveElements = document.querySelectorAll(
        '.canvas-card, .challenge-card, .result-card, .etapa-card, .project-overview-timeline'
    );
    
    interactiveElements.forEach(element => {
        // Mouse/touch start
        element.addEventListener('mouseenter', function() {
            if (window.matchMedia('(hover: hover)').matches) {
                this.style.transform = 'translateY(-4px)';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (window.matchMedia('(hover: hover)').matches) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            }
        });
        
        // Touch feedback
        element.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
                this.style.transition = 'transform 0.3s ease';
            }, 100);
        });
    });
    
    // Table row interactions
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            if (window.matchMedia('(hover: hover)').matches && !this.classList.contains('total')) {
                this.style.background = 'var(--color-bg-1)';
            }
        });
        
        row.addEventListener('mouseleave', function() {
            if (!this.classList.contains('total') && !this.classList.contains('optional')) {
                this.style.background = '';
            }
        });
    });
    
    // Gantt bar tooltips and interactions
    const ganttBars = document.querySelectorAll('.gantt-bar');
    ganttBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip && window.matchMedia('(hover: hover)').matches) {
                showTooltip(this, tooltip);
            }
        });
        
        bar.addEventListener('mouseleave', function() {
            hideTooltip();
        });
        
        // Touch handling for mobile
        bar.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                showTooltip(this, tooltip);
                setTimeout(hideTooltip, 2000);
            }
        });
    });
    
    // CTA button interactions
    initCTAButtons();
    
    // Responsive chart handling
    window.addEventListener('resize', debounce(handleResize, 250));
}

// CTA button functionality
function initCTAButtons() {
    const acceptBtn = document.querySelector('.cta-accept');
    const meetingBtn = document.querySelector('.cta-meeting');
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show success notification
            showNotification(
                '✅ Obrigado pelo interesse! Nossa equipe entrará em contato em breve para alinhar os próximos passos.',
                'success'
            );
            
            // Optional: Track conversion
            if (typeof gtag !== 'undefined') {
                gtag('event', 'proposal_accepted', {
                    'event_category': 'engagement',
                    'event_label': 'Rhodia-Solvay Proposal'
                });
            }
        });
    }
    
    if (meetingBtn) {
        meetingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showNotification('📅 Abrindo ferramenta de agendamento...', 'info');
            
            // Open email client after delay
            setTimeout(() => {
                const emailSubject = encodeURIComponent('Agendamento - Proposta Rhodia-Solvay');
                const emailBody = encodeURIComponent(
                    'Olá!\n\n' +
                    'Gostaria de agendar uma reunião para discutir a proposta de Organização e Gestão Centralizada das Ações T&D apresentada.\n\n' +
                    'Estou disponível para:\n' +
                    '- Esclarecer dúvidas sobre o escopo\n' +
                    '- Ajustar cronograma conforme necessidades\n' +
                    '- Discutir próximos passos\n\n' +
                    'Aguardo seu retorno.\n\n' +
                    'Obrigado!'
                );
                
                window.open(`mailto:contato@mentorinterativa.com.br?subject=${emailSubject}&body=${emailBody}`, '_blank');
            }, 500);
        });
    }
}

// Tooltip system
function showTooltip(element, text) {
    hideTooltip(); // Remove existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.id = 'custom-tooltip';
    tooltip.textContent = text;
    
    Object.assign(tooltip.style, {
        position: 'absolute',
        background: 'rgba(0,0,0,0.9)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        zIndex: '10000',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    });
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
    tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
    
    // Ensure tooltip stays within viewport
    const tooltipLeft = parseInt(tooltip.style.left);
    if (tooltipLeft < 10) {
        tooltip.style.left = '10px';
    } else if (tooltipLeft + tooltipRect.width > window.innerWidth - 10) {
        tooltip.style.left = `${window.innerWidth - tooltipRect.width - 10}px`;
    }
}

function hideTooltip() {
    const existingTooltip = document.getElementById('custom-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notif => notif.remove());
    
    const colors = {
        success: '#4ECDC4',
        error: '#FF6B6B',
        info: '#45B7D1',
        warning: '#FF8C00'
    };
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const notificationHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()" aria-label="Fechar notificação">&times;</button>
        </div>
    `;
    
    notification.innerHTML = notificationHTML;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: colors[type] || colors.info,
        color: 'white',
        padding: '16px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        zIndex: '1001',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px',
        fontSize: '14px',
        fontFamily: 'FKGroteskNeue, Inter, sans-serif'
    });
    
    // Mobile adjustments
    if (window.innerWidth < 768) {
        Object.assign(notification.style, {
            left: '16px',
            right: '16px',
            maxWidth: 'none'
        });
    }
    
    const content = notification.querySelector('.notification-content');
    Object.assign(content.style, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
    });
    
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.2s ease'
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// PWA functionality
function initPWA() {
    let deferredPrompt;
    const pwaInstall = document.getElementById('pwa-install');
    const installBtn = document.getElementById('pwa-install-btn');
    const dismissBtn = document.getElementById('pwa-dismiss-btn');
    
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show install prompt after delay
        setTimeout(() => {
            if (pwaInstall && !localStorage.getItem('pwa-dismissed')) {
                pwaInstall.classList.remove('hidden');
                pwaInstall.classList.add('show');
            }
        }, 10000); // Show after 10 seconds
    });
    
    // Install button click
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                
                if (outcome === 'accepted') {
                    showNotification('📱 App instalado com sucesso!', 'success');
                }
                
                deferredPrompt = null;
                hidePWAPrompt();
            }
        });
    }
    
    // Dismiss button click
    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
            localStorage.setItem('pwa-dismissed', 'true');
            hidePWAPrompt();
        });
    }
    
    function hidePWAPrompt() {
        if (pwaInstall) {
            pwaInstall.classList.remove('show');
            setTimeout(() => {
                pwaInstall.classList.add('hidden');
            }, 300);
        }
    }
    
    // Handle app install
    window.addEventListener('appinstalled', (evt) => {
        showNotification('🎉 Proposta adicionada à tela inicial!', 'success');
    });
}

// Accessibility enhancements
function initAccessibility() {
    // Skip to content functionality
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === '1') {
            document.querySelector('.main')?.focus();
        }
    });
    
    // Announce section changes to screen readers
    const sections = document.querySelectorAll('.section');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('active') && target.classList.contains('section')) {
                    announceToScreenReader(`Seção ${target.id} ativa`);
                }
            }
        });
    });
    
    sections.forEach(section => {
        observer.observe(section, { attributes: true });
    });
    
    // Focus management for mobile menu
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function() {
            setTimeout(() => {
                if (this.classList.contains('active')) {
                    const firstNavBtn = mobileNav.querySelector('.nav-btn');
                    firstNavBtn?.focus();
                }
            }, 300);
        });
    }
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleResize() {
    // Reinitialize chart if in investment section and visible
    const investmentSection = document.getElementById('investimento');
    if (investmentSection && investmentSection.classList.contains('active')) {
        setTimeout(() => {
            if (window.hoursChartInstance) {
                window.hoursChartInstance.resize();
            }
        }, 100);
    }
    
    // Hide tooltips on resize
    hideTooltip();
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (mobileToggle && mobileToggle.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Auto-adjust accordion heights on resize
    const expandedAccordions = document.querySelectorAll('.accordion-content.expanded');
    expandedAccordions.forEach(content => {
        content.style.maxHeight = 'none';
        const height = content.scrollHeight;
        content.style.maxHeight = height + 'px';
    });
}

// Add dynamic CSS animations
function addDynamicStyles() {
    if (document.querySelector('#dynamic-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'dynamic-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        .btn:focus-visible {
            animation: pulse 0.3s ease-in-out;
        }
        
        .project-overview-timeline {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        .hours-table .table-row {
            animation: slideInFromLeft 0.6s ease forwards;
        }
        
        .table-row:nth-child(1) { animation-delay: 0.1s; }
        .table-row:nth-child(2) { animation-delay: 0.2s; }
        .table-row:nth-child(3) { animation-delay: 0.3s; }
        .table-row:nth-child(4) { animation-delay: 0.4s; }
        .table-row:nth-child(5) { animation-delay: 0.5s; }
        .table-row:nth-child(6) { animation-delay: 0.6s; }
        .table-row:nth-child(7) { animation-delay: 0.7s; }
        .table-row:nth-child(8) { animation-delay: 0.8s; }
        
        @keyframes slideInFromLeft {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .stage-marker {
            animation: bounceIn 0.6s ease forwards;
        }
        
        @keyframes bounceIn {
            0% {
                opacity: 0;
                transform: scale(0.3);
            }
            50% {
                opacity: 1;
                transform: scale(1.05);
            }
            70% {
                transform: scale(0.9);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('data:text/javascript;base64,c2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgZXZlbnQgPT4gewogIGV2ZW50LndhaXRVbnRpbCgKICAgIGNhY2hlcy5vcGVuKCdwcm9wb3N0YS12MScpLnRoZW4oY2FjaGUgPT4gewogICAgICByZXR1cm4gY2FjaGUuYWRkQWxsKFsnLycsICcvaW5kZXguaHRtbCcsICcvc3R5bGUuY3NzJywgJy9hcHAuanMnXSk7CiAgICB9KQogICk7Cn0pOw==')
        .then(registration => {
            console.log('✅ Service Worker registrado:', registration);
        })
        .catch(error => {
            console.log('❌ Service Worker falhou:', error);
        });
    });
}

// Global error handling
window.addEventListener('error', function(e) {
    console.error('Erro na aplicação:', e.error);
    showNotification('⚠️ Ocorreu um erro. Tente recarregar a página.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejeitada:', e.reason);
});

// Debug helper for development
window.debugApp = function() {
    const sections = document.querySelectorAll('.section');
    const quickNavButtons = document.querySelectorAll('.quick-nav-buttons .btn, .quick-nav-buttons button');
    
    console.log('=== DEBUG INFO ===');
    console.log('Viewport:', window.innerWidth + 'x' + window.innerHeight);
    console.log('Device pixel ratio:', window.devicePixelRatio);
    console.log('Touch support:', 'ontouchstart' in window);
    
    sections.forEach(section => {
        console.log(`Seção ${section.id}:`, {
            display: window.getComputedStyle(section).display,
            opacity: window.getComputedStyle(section).opacity,
            active: section.classList.contains('active'),
            visible: section.style.display !== 'none'
        });
    });
    
    console.log('Botão ativo:', document.querySelector('.nav-btn.active')?.getAttribute('data-section'));
    console.log('Chart instance:', !!window.hoursChartInstance);
    console.log('Navegação inicializada:', !!window.navigationInitialized);
    console.log('Accordions encontrados:', document.querySelectorAll('.accordion-toggle').length);
    console.log('Timeline stages encontrados:', document.querySelectorAll('.stage-item').length);
    console.log('Quick nav buttons encontrados:', quickNavButtons.length);
    
    // Test quick nav buttons
    quickNavButtons.forEach((btn, index) => {
        console.log(`Quick nav ${index + 1}:`, {
            element: btn,
            section: btn.getAttribute('data-section'),
            hasEventListener: btn.onclick !== null
        });
    });
};

// Mark navigation as initialized
window.navigationInitialized = true;

console.log('📱 Aplicação mobile-first carregada. Use debugApp() para debug.');
console.log('🚀 Mentor Interativa - Proposta Rhodia-Solvay ready!');
console.log('✅ Alterações implementadas: Visão Geral com timeline + Accordions recolhíveis');
console.log('🔧 NAVEGAÇÃO TOTALMENTE CORRIGIDA - Todos os botões funcionais');
console.log('🚨 BUGS CORRIGIDOS: Menu responsivo + Botões quick nav funcionais');