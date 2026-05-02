// Load Products and Settings from Data file (data.js) - FORCED PRIORITY
let products = typeof initialProducts !== 'undefined' ? initialProducts : [];
let settings = typeof initialSettings !== 'undefined' ? initialSettings : {};

// Only use localStorage if it actually has more products (meaning the admin added some locally)
const savedProducts = JSON.parse(localStorage.getItem('shop_products'));
if (savedProducts && savedProducts.length > products.length) {
    products = savedProducts;
}

const savedSettings = JSON.parse(localStorage.getItem('shop_settings'));
if (savedSettings && Object.keys(savedSettings).length > 0) {
    settings = savedSettings;
}

// Currency Formatter for Bangla Taka
function formatTaka(amount) {
    return '৳' + Number(amount).toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

// Dynamic formatter for the About page text
function formatAboutText(text) {
    if (!text) return '';
    
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    let html = '';
    let inTable = false;
    let inList = false;

    lines.forEach((line, index) => {
        if (index === 0) {
            html += `<span class="about-highlight">${line}</span>`;
        } else if (line.includes('মূল বৈশিষ্ট্যসমূহ:')) {
            if (inTable) html += '</table>';
            if (inList) { html += '</ul></div>'; inList = false; }
            html += `<h3 style="margin-top: 2rem; color: var(--secondary-color);">${line}</h3>`;
            html += '<table class="about-features-table">';
            inTable = true;
        } else if (line.includes('প্যাকেজে যা থাকছে:')) {
            if (inTable) { html += '</table>'; inTable = false; }
            if (inList) html += '</ul></div>';
            html += `<div style="margin-top: 2rem;"><h3 style="color: var(--secondary-color);">${line}</h3>`;
            html += '<ul class="package-list">';
            inList = true;
        } else if (line.includes('অফার মূল্য:')) {
            if (inTable) { html += '</table>'; inTable = false; }
            if (inList) { html += '</ul></div>'; inList = false; }
            html += `<div class="offer-price">${line}</div>`;
        } else if (inTable && line.includes(':')) {
            const [key, ...valParts] = line.split(':');
            html += `<tr><td>${key.trim()}</td><td>${valParts.join(':').trim()}</td></tr>`;
        } else if (inList && (line.startsWith('✅') || line.startsWith('-') || line.startsWith('*'))) {
            html += `<li>${line}</li>`;
        } else {
            if (inTable) { html += '</table>'; inTable = false; }
            if (inList) { html += '</ul></div>'; inList = false; }
            html += `<p>${line}</p>`;
        }
    });

    if (inTable) html += '</table>';
    if (inList) html += '</ul></div>';

    return html;
}

// Update Site Content based on Settings
function applySettings() {
    // Website Name
    document.querySelectorAll('.logo h1').forEach(logo => logo.innerText = settings.siteName);
    document.title = settings.siteName + " - Premium Products";
    
    // Hero Section (if on home page)
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-content h2');
    const heroSub = document.querySelector('.hero-content p');
    if (heroSection && settings.heroImg) {
        heroSection.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${settings.heroImg}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }
    if (heroTitle) heroTitle.innerText = settings.heroTitle;
    if (heroSub) heroSub.innerText = settings.heroSub;
    
    // Contact Info
    const footerEmail = document.querySelector('.footer-section p:nth-child(2)');
    const footerPhone = document.querySelector('.footer-section p:nth-child(3)');
    if (footerEmail) footerEmail.innerText = "Email: " + settings.email;
    if (footerPhone) footerPhone.innerText = "Phone: " + settings.phone;
    
    // Facebook Link
    const fbLink = document.querySelector('.social-links a');
    if (fbLink) fbLink.href = settings.facebook;

    // About Page Content (if on about page)
    const aboutTitle = document.querySelector('.about-content h2');
    const aboutTextContainer = document.querySelector('.about-text');
    if (aboutTitle) aboutTitle.innerText = "About " + settings.siteName;
    if (aboutTextContainer) {
        aboutTextContainer.innerHTML = formatAboutText(settings.about);
    }

    // WhatsApp Bubble
    const waBubble = document.querySelector('.whatsapp-bubble');
    if (waBubble) waBubble.href = `https://wa.me/88${settings.phone.replace(/\s+/g, '')}`;
}

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

// Location Functionality
function setupLocation() {
    const locateBtn = document.getElementById('locate-me-btn');
    const addressInput = document.getElementById('cust-address');
    const statusText = document.getElementById('location-status');

    if (!locateBtn) return;

    locateBtn.onclick = () => {
        if (!navigator.geolocation) {
            statusText.innerText = "Geolocation is not supported by your browser";
            statusText.className = "location-status error";
            return;
        }

        statusText.innerText = "Locating...";
        statusText.className = "location-status";
        locateBtn.disabled = true;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                try {
                    // Using OpenStreetMap's Nominatim API for free reverse geocoding
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
                    const data = await response.json();
                    
                    if (data && data.display_name) {
                        addressInput.value = data.display_name;
                        statusText.innerText = "Location updated successfully!";
                        statusText.className = "location-status success";
                    } else {
                        addressInput.value = `Lat: ${latitude}, Lon: ${longitude}`;
                        statusText.innerText = "Coordinates found, but address couldn't be resolved.";
                        statusText.className = "location-status success";
                    }
                } catch (error) {
                    console.error("Geocoding error:", error);
                    addressInput.value = `Lat: ${latitude}, Lon: ${longitude}`;
                    statusText.innerText = "Coordinates found, but address lookup failed.";
                    statusText.className = "location-status success";
                }
                locateBtn.disabled = false;
            },
            (error) => {
                statusText.innerText = `Error: ${error.message}`;
                statusText.className = "location-status error";
                locateBtn.disabled = false;
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };
}

// Initialize Products
function displayProducts() {
    if (!productGrid) return;
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${formatTaka(product.price)}</p>
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
                <p class="price">${formatTaka(product.price)}</p>
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
    cartTotalPrice.innerText = formatTaka(total).replace('৳', '');
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
                <p>${formatTaka(item.price)} x ${item.quantity}</p>
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
    const orderItems = cart.map(item => `${item.name} (x${item.quantity}) - ${formatTaka(item.price * item.quantity)}`).join('\n');
    const orderSummary = `New Order from ${settings.siteName}\n\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\nTotal: ${formatTaka(total)}\n\nItems:\n${orderItems}`;

    // 1. Direct Email via mailto:
    const subject = encodeURIComponent(`New Order from ${name}`);
    const body = encodeURIComponent(orderSummary);
    const mailtoUrl = `mailto:${settings.email}?subject=${subject}&body=${body}`;

    // 2. WhatsApp Notification (Direct)
    const adminWhatsApp = `88${settings.phone.replace(/\s+/g, '')}`; 
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
function init() {
    displayProducts();
    setupLocation();
    applySettings();
}

// Run init
init();
