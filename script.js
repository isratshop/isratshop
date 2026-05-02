// Product Data
const initialProducts = [
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

// Initial Settings if none exist
const initialSettings = {
    siteName: "Israt Jahan Shop",
    heroTitle: "ISRAT JAHAN SMART DC CHARGING FAN",
    heroSub: "বাতাস ও আলো, সবসময় সাথে থাকুন",
    email: "abuyusufup@gmail.com",
    phone: "01818665264",
    facebook: "https://www.facebook.com/abuyusufshapon",
    about: "Welcome to Israt Jahan Shop, where quality meets elegance..."
};

// Load Products and Settings from LocalStorage
let products = JSON.parse(localStorage.getItem('shop_products')) || initialProducts;
let settings = JSON.parse(localStorage.getItem('shop_settings')) || initialSettings;

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
        // Special formatting for the organized table layout
        aboutTextContainer.innerHTML = `
            <span class="about-highlight">প্রচণ্ড গরমেও থাকুন শান্ত ও সতেজ! 🌬️💡</span>
            <p>লোডশেডিং নিয়ে আর দুশ্চিন্তা নয়! আমরা নিয়ে এসেছি আধুনিক প্রযুক্তির স্মার্ট ডিসি রিচার্জেবল চার্জিং ফ্যান ও লাইট। এটি আপনাকে দিবে দীর্ঘক্ষণ শক্তিশালী বাতাস এবং উজ্জ্বল আলো, যা আপনার ঘরকে রাখবে আরামদায়ক।</p>
            
            <h3 style="margin-top: 2rem; color: var(--secondary-color);">মূল বৈশিষ্ট্যসমূহ:</h3>
            <table class="about-features-table">
                <tr>
                    <td>শক্তিশালী ব্যাকআপ</td>
                    <td>হাই-কোয়ালিটি লিথিয়াম ব্যাটারি, যা একবার চার্জে দীর্ঘ সময় ব্যাকআপ নিশ্চিত করে।</td>
                </tr>
                <tr>
                    <td>ডুয়াল ফাংশন</td>
                    <td>একই সাথে ঠান্ডা বাতাস এবং উজ্জ্বল এলইডি লাইটের সুবিধা।</td>
                </tr>
                <tr>
                    <td>স্মার্ট কন্ট্রোল</td>
                    <td>মাল্টি-স্পিড মোড এবং অ্যাডজাস্টেবল ব্রাইটনেস।</td>
                </tr>
                <tr>
                    <td>পোর্টেবল ডিজাইন</td>
                    <td>ওজনে হালকা হওয়ায় বেডরুম, ড্রয়িং রুম বা ভ্রমণের সময় সহজেই সাথে রাখা যায়।</td>
                </tr>
                <tr>
                    <td>লো নয়েজ অপারেশন</td>
                    <td>কোনো শব্দ ছাড়াই দিবে প্রশান্তির ঘুম।</td>
                </tr>
                <tr>
                    <td>সোলার সাপোর্ট</td>
                    <td>ইলেকট্রিসিটি ছাড়াও সোলার প্যানেল দিয়ে চার্জ করার সুবিধা (মডেলভেদে)।</td>
                </tr>
            </table>

            <div style="margin-top: 2rem;">
                <h3 style="color: var(--secondary-color);">প্যাকেজে যা থাকছে:</h3>
                <ul class="package-list">
                    <li>✅ ১টি স্মার্ট ডিসি ফ্যান ও লাইট</li>
                    <li>✅ ১টি প্রিমিয়াম চার্জিং ক্যাবল</li>
                </ul>
            </div>

            <div class="offer-price">
                অফার মূল্য: [আপনার মূল্য লিখুন] টাকা মাত্র!
            </div>
        `;
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
displayProducts();
setupLocation();
applySettings();
