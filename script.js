const clothingProducts = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        brand: "Nike",
        category: "tshirt",
        price: 29.99,
        originalPrice: 39.99,
        description: "Premium cotton t-shirt with comfortable fit and durable quality. Perfect for everyday wear.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
        badge: "Sale"
    },
    {
        id: 2,
        name: "Slim Fit Jeans",
        brand: "Levi's",
        category: "jeans",
        price: 79.99,
        originalPrice: 99.99,
        description: "Modern slim fit jeans with stretch technology for ultimate comfort and style.",
        image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400",
        badge: "Best Seller"
    },
    {
        id: 3,
        name: "Denim Jacket",
        brand: "Zara",
        category: "jackets",
        price: 129.99,
        originalPrice: null,
        description: "Classic denim jacket with modern silhouette. Timeless piece for any wardrobe.",
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400",
        badge: null
    },
    {
        id: 4,
        name: "Formal Shirt",
        brand: "Ralph Lauren",
        category: "shirts",
        price: 89.99,
        originalPrice: 119.99,
        description: "Elegant formal shirt with premium fabric. Perfect for business meetings.",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
        badge: "Sale"
    },
    {
        id: 5,
        name: "Floral Summer Dress",
        brand: "H&M",
        category: "dresses",
        price: 49.99,
        originalPrice: null,
        description: "Beautiful floral print dress perfect for summer occasions. Light and breathable fabric.",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
        badge: "New"
    },
    {
        id: 6,
        name: "Performance T-Shirt",
        brand: "Adidas",
        category: "tshirt",
        price: 35.00,
        originalPrice: null,
        description: "Moisture-wicking athletic t-shirt designed for peak performance during workouts.",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400",
        badge: null
    },
    {
        id: 7,
        name: "Ripped Skinny Jeans",
        brand: "Levi's",
        category: "jeans",
        price: 89.99,
        originalPrice: 109.99,
        description: "Trendy ripped skinny jeans for the fashion-forward. Premium denim quality.",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
        badge: "Trending"
    },
    {
        id: 8,
        name: "Leather Bomber Jacket",
        brand: "Gucci",
        category: "jackets",
        price: 499.99,
        originalPrice: null,
        description: "Luxurious genuine leather bomber jacket. Statement piece for special occasions.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
        badge: "Premium"
    }
];

const shoesProducts = [
    {
        id: 9,
        name: "Air Max Sneakers",
        brand: "Nike",
        category: "sneakers",
        price: 149.99,
        originalPrice: 179.99,
        description: "Iconic Air Max sneakers with visible air cushioning. Perfect for casual everyday wear.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        badge: "Sale"
    },
    {
        id: 10,
        name: "Ultraboost Running Shoes",
        brand: "Adidas",
        category: "sports",
        price: 179.99,
        originalPrice: null,
        description: "Premium running shoes with boost technology for exceptional energy return.",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
        badge: "Best Seller"
    },
    {
        id: 11,
        name: "Classic Leather Oxford",
        brand: "Ralph Lauren",
        category: "formal",
        price: 249.99,
        originalPrice: 299.99,
        description: "Handcrafted leather oxford shoes. The epitome of formal elegance.",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400",
        badge: "Premium"
    },
    {
        id: 12,
        name: "Chelsea Boots",
        brand: "Gucci",
        category: "boots",
        price: 399.99,
        originalPrice: null,
        description: "Stylish Chelsea boots in premium leather. Perfect for smart-casual occasions.",
        image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400",
        badge: "New"
    },
    {
        id: 13,
        name: "RS-X Sneakers",
        brand: "Puma",
        category: "sneakers",
        price: 109.99,
        originalPrice: 129.99,
        description: "Bold RS-X sneakers with chunky design. Maximum comfort with style.",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400",
        badge: "Sale"
    },
    {
        id: 14,
        name: "Trail Running Shoes",
        brand: "Adidas",
        category: "sports",
        price: 129.99,
        originalPrice: null,
        description: "Durable trail running shoes with rugged grip. Built for outdoor adventures.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
        badge: null
    },
    {
        id: 15,
        name: "Derby Shoes",
        brand: "Zara",
        category: "formal",
        price: 119.99,
        originalPrice: 149.99,
        description: "Modern derby shoes with sleek design. Professional look at accessible price.",
        image: "https://images.unsplash.com/photo-1613987876445-fcb353cd8e87?w=400",
        badge: "Sale"
    },
    {
        id: 16,
        name: "Work Boots",
        brand: "Puma",
        category: "boots",
        price: 89.99,
        originalPrice: null,
        description: "Heavy-duty work boots with steel toe. Safety meets comfort.",
        image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=400",
        badge: "New"
    }
];

let cart = [];

function renderProducts() {
    const clothingGrid = document.getElementById('clothing-products');
    const shoesGrid = document.getElementById('shoes-products');

    clothingGrid.innerHTML = clothingProducts.map(product => createProductCard(product)).join('');
    shoesGrid.innerHTML = shoesProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const badgeHTML = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
    const originalPriceHTML = product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';

    return `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${badgeHTML}
                <div class="product-actions">
                    <button onclick="addToCart(${product.id})" title="Add to Cart"><i class="fas fa-shopping-cart"></i></button>
                    <button onclick="addToWishlist(${product.id})" title="Add to Wishlist"><i class="fas fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${originalPriceHTML}
                </div>
            </div>
        </div>
    `;
}

function addToCart(productId) {
    const allProducts = [...clothingProducts, ...shoesProducts];
    const product = allProducts.find(p => p.id === productId);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCartUI();
    showNotification('Product added to cart!');
}

function addToWishlist(productId) {
    showNotification('Added to wishlist!');
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
    } else {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = '$' + total.toFixed(2);

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Product removed from cart');
}

function toggleCart() {
    const cartSidebar = document.getElementById('cart');
    const overlay = document.getElementById('overlay');

    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Thank you for your purchase! Order placed successfully.');
    cart = [];
    updateCartUI();
    toggleCart();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2c3e50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        const section = this.closest('.products-section');
        const grid = section.querySelector('.product-grid');

        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const products = filter === 'all'
            ? [...clothingProducts, ...shoesProducts]
            : [...clothingProducts, ...shoesProducts].filter(p => p.category === filter);

        grid.innerHTML = products.map(product => createProductCard(product)).join('');
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

renderProducts();