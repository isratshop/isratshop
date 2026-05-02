// Product Data
const products = [
    {
        id: 1,
        name: "Elegant Watch",
        price: 120.00,
        description: "A sophisticated timepiece that combines classic design with modern precision. Perfect for any occasion.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: 85.00,
        description: "Experience crystal-clear sound with our noise-canceling wireless headphones. Comfort meets high-fidelity audio.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Smart Camera",
        price: 150.00,
        description: "Capture life's best moments with stunning clarity. Our smart camera features advanced autofocus and 4K video.",
        image: "https://images.unsplash.com/photo-1526170315830-ef18a283ac16?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Canvas Shoes",
        price: 45.00,
        description: "Durable and stylish canvas shoes for everyday wear. Lightweight design with a cushioned sole for all-day comfort.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Leather Bag",
        price: 60.00,
        description: "Handcrafted from premium leather, this bag offers both elegance and utility. Spacious enough for all your essentials.",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Sunglasses",
        price: 25.00,
        description: "Protect your eyes in style. These polarized sunglasses offer 100% UV protection and a sleek, modern frame.",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80"
    }
];

// State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeButton = document.querySelector('.close-button');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-count');
const checkoutForm = document.getElementById('checkout-form');
const productModal = document.getElementById('product-modal');
const productDetailBody = document.getElementById('product-detail-body');
const closeProductModal = document.querySelector('.close-product-modal');
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Initialize Products
function displayProducts() {
    if (!productGrid) return;
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.onclick = () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    };
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    };
});

// Product Detail Functions
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    productDetailBody.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p class="price">$${product.price.toFixed(2)}</p>
                <div class="description">
                    <p>${product.description}</p>
                </div>
                <div class="product-detail-actions">
                    <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn" style="background-color: var(--secondary-color);" onclick="buyNow(${product.id})">Place Order</button>
                </div>
            </div>
        </div>
    `;
    productModal.style.display = "block";
}

function buyNow(productId) {
    addToCart(productId);
    productModal.style.display = "none";
    cartModal.style.display = "block";
    // Optional: Scroll to the checkout form
    document.getElementById('checkout-form').scrollIntoView({ behavior: 'smooth' });
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Update Modal
    renderCartItems();
    
    // Update Total Price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.innerText = total.toFixed(2);
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Modal Toggle
if (cartIcon) cartIcon.onclick = () => cartModal.style.display = "block";
if (closeButton) closeButton.onclick = () => cartModal.style.display = "none";
if (closeProductModal) closeProductModal.onclick = () => productModal.style.display = "none";

window.onclick = (event) => {
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
    if (event.target == productModal) {
        productModal.style.display = "none";
    }
}

// Checkout Form Handling
checkoutForm.onsubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const total = cartTotalPrice.innerText;

    // Create Order Summary
    const orderItems = cart.map(item => `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const orderSummary = `New Order from Israt Jahan Shop\n\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\nTotal: $${total}\n\nItems:\n${orderItems}`;

    // 1. Direct Email via mailto:
    const subject = encodeURIComponent(`New Order from ${name}`);
    const body = encodeURIComponent(orderSummary);
    const mailtoUrl = `mailto:abuyusufup@gmail.com?subject=${subject}&body=${body}`;

    // 2. WhatsApp Notification (Direct)
    const adminWhatsApp = "8801818665264"; 
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(orderSummary)}`;

    // Choice for the user
    if (confirm("Would you like to send this order via WhatsApp for faster response? (Cancel to send via Email)")) {
        window.open(whatsappUrl, '_blank');
    } else {
        window.location.href = mailtoUrl;
    }

    // Finalize
    alert(`Order details generated! If the email/whatsapp didn't open automatically, please check your pop-up blocker.`);
    cart = [];
    updateCart();
    checkoutForm.reset();
    cartModal.style.display = "none";
};

// Initial Load
displayProducts();
