let allProducts = [];

// ===== INICIALIZAR PÁGINA DE PRODUCTOS =====
document.addEventListener('DOMContentLoaded', async function() {
    await loadProducts();
    setupFilters();
    renderProducts(allProducts);
});

// ===== CARGAR TODOS LOS PRODUCTOS =====
async function loadProducts() {
    try {
        const response = await fetch('data/productos.json');
        allProducts = await response.json();
    } catch (error) {
        console.error('Error cargando productos:', error);
        allProducts = [];
    }
}

// ===== CONFIGURAR FILTROS =====
function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    
    // Actualizar valor del slider de precio
    if (priceFilter && priceValue) {
        priceFilter.addEventListener('input', function() {
            priceValue.textContent = `Hasta $${parseInt(this.value).toLocaleString('es-CO')}`;
            filterProducts();
        });
    }
    
    // Event listeners para selects
    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (brandFilter) brandFilter.addEventListener('change', filterProducts);
    
    // Verificar parámetros URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('categoria');
    if (category && categoryFilter) {
        categoryFilter.value = category;
        filterProducts();
    }
}

// ===== FILTRAR PRODUCTOS =====
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const brand = document.getElementById('brand-filter').value;
    const maxPrice = parseInt(document.getElementById('price-filter').value);
    
    let filtered = allProducts.filter(product => {
        const matchCategory = !category || product.categoria === category;
        const matchBrand = !brand || product.marca.toLowerCase() === brand.toLowerCase();
        const matchPrice = product.precio <= maxPrice;
        
        return matchCategory && matchBrand && matchPrice;
    });
    
    renderProducts(filtered);
}

// ===== RENDERIZAR PRODUCTOS =====
function renderProducts(products) {
    const grid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');
    
    if (products.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        noResults.style.display = 'none';
        grid.innerHTML = products.map(product => createProductCard(product)).join('');
    }
}
