// ===== MOBILE MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // ===== SMOOTH SCROLL =====
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== ANIMACIONES AL HACER SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const elementsToAnimate = document.querySelectorAll('.section-title, .product-card, .feature-card, .team-member, .value-card');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simular envío
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ===== CARGAR PRODUCTOS DESTACADOS =====
    loadFeaturedProducts();
});

// ===== CARGAR PRODUCTOS DESTACADOS EN HOMEPAGE =====
async function loadFeaturedProducts() {
    try {
        const response = await fetch('data/productos.json');
        const data = await response.json();
        const featuredProducts = data.filter(p => p.destacado).slice(0, 6);
        
        const grid = document.getElementById('featured-grid');
        if (grid) {
            grid.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
        }
    } catch (error) {
        console.error('Error cargando productos destacados:', error);
    }
}

// ===== CREAR CARD DE PRODUCTO =====
function createProductCard(product) {
    return `
        <div class="product-card scale-in" onclick="viewProduct(${product.id})">
            <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.categoria}</div>
                <h3 class="product-name">${product.nombre}</h3>
                <div class="product-price">$${product.precio.toLocaleString('es-CO')}</div>
                <div class="product-brand">${product.marca}</div>
            </div>
        </div>
    `;
}

// ===== VER PRODUCTO (SIMULADO) =====
function viewProduct(id) {
    alert(`Viendo detalles del producto ID: ${id}\nEn producción, esto abriría una modal o página de detalle.`);
}
