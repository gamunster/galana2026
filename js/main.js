// ============================================
// CLÍNICA DENTAL GALANA - JAVASCRIPT
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVEGACIÓN MÓVIL
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navList = nav.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
        
        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // HEADER SCROLL
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Añadir clase cuando hay scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // SMOOTH SCROLL PARA ANCLAS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar enlaces con solo #
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // ACTIVE LINK EN NAVEGACIÓN
    // ============================================
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    
    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    if (revealElements.length > 0) {
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Ejecutar al cargar
    }
    
    // ============================================
    // ANIMACIÓN DE TARJETAS DE SERVICIO
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // ============================================
    // LAZY LOADING DE IMÁGENES
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // FORMULARIO DE CONTACTO (si existe)
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = new FormData(contactForm);
            const nombre = formData.get('nombre');
            const telefono = formData.get('telefono');
            const mensaje = formData.get('mensaje');
            
            // Crear mensaje de WhatsApp
            const whatsappMessage = `Hola, mi nombre es ${nombre}. ${mensaje}`;
            const whatsappUrl = `https://wa.me/56956789735?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Abrir WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Limpiar formulario
            contactForm.reset();
        });
    }
    
    // ============================================
    // BOTÓN VOLVER ARRIBA
    // ============================================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(scrollTopBtn);
    
    // Estilo del botón
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--accent-color);
            color: var(--white);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 999;
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top-btn:hover {
            background: var(--accent-hover);
            transform: translateY(-3px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 640px) {
            .scroll-top-btn {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 1.25rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Mostrar/ocultar botón
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Click en botón
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // PREVENIR ENLACES ROTOS
    // ============================================
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Si el enlace está vacío o es solo #, prevenir
            if (!href || href === '#' || href === 'javascript:void(0)') {
                e.preventDefault();
            }
        });
    });
    
    // ============================================
    // PERFORMANCE: DEBOUNCE PARA EVENTOS DE SCROLL
    // ============================================
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Aplicar debounce a funciones de scroll
    window.addEventListener('scroll', debounce(function() {
        setActiveLink();
        revealOnScroll();
    }, 15));
    
    // ============================================
    // PRELOADER (opcional)
    // ============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ============================================
    // CONSOLA: MENSAJE DE BIENVENIDA
    // ============================================
    console.log('%c🦷 Clínica Dental GALANA ', 'background: #2a4a6e; color: #fff; padding: 10px 20px; font-size: 16px; font-weight: bold;');
    console.log('%cSitio web desarrollado con ❤️', 'color: #c6a962; font-size: 12px;');
    
});

// ============================================
// DETECTAR DISPOSITIVO TÁCTIL
// ============================================
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// ============================================
// ANALYTICS (Google Analytics - Placeholder)
// ============================================
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'UA-XXXXXXXXX-X');
