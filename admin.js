// Initial Products if none exist in LocalStorage
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
    heroImg: "hero.jpg",
    heroSub: "বাতাস ও আলো, সবসময় সাথে থাকুন",
    email: "abuyusufup@gmail.com",
    phone: "01818665264",
    facebook: "https://www.facebook.com/abuyusufshapon",
    about: "Welcome to Israt Jahan Shop, where quality meets elegance. We take immense pride in curating a collection of products that aren't just items, but experiences designed to enhance your lifestyle. Each product in our shop is handpicked for its superior craftsmanship, durability, and timeless appeal.\n\nOur commitment to excellence ensures that when you shop with us, you're investing in the very best. From the latest fashion trends to essential daily gadgets, we guarantee that our products will exceed your expectations and bring a touch of premium quality to your home. Thank you for choosing us as your trusted shopping partner!"
};

// Load Data
let products = JSON.parse(localStorage.getItem('shop_products')) || initialProducts;
let settings = JSON.parse(localStorage.getItem('shop_settings')) || initialSettings;

// DOM Elements
const adminProductList = document.getElementById('admin-product-list');
const productFormModal = document.getElementById('product-form-modal');
const productForm = document.getElementById('product-form');
const addProductBtn = document.getElementById('add-product-btn');
const closeFormModal = document.getElementById('close-form-modal');
const formTitle = document.getElementById('form-title');
const settingsForm = document.getElementById('site-settings-form');
const generateCodeBtn = document.getElementById('generate-code-btn');
const codeModal = document.getElementById('code-modal');
const closeCodeModal = document.getElementById('close-code-modal');
const generatedCodeArea = document.getElementById('generated-code');

// Initialize Admin Dashboard
function initAdmin() {
    renderAdminProducts();
    loadSettingsIntoForm();
    setupFileUploads();
    
    generateCodeBtn.onclick = () => {
        const code = `// COPY THIS TO BOTH admin.js AND script.js
const initialProducts = ${JSON.stringify(products, null, 4)};

const initialSettings = ${JSON.stringify(settings, null, 4)};`;
        
        generatedCodeArea.value = code;
        codeModal.style.display = "block";
    };

    closeCodeModal.onclick = () => {
        codeModal.style.display = "none";
    };

    window.copyGeneratedCode = () => {
        generatedCodeArea.select();
        document.execCommand('copy');
        alert("Code copied! Now paste it into your admin.js and script.js files.");
    };

    addProductBtn.onclick = () => {
        productForm.reset();
        document.getElementById('product-id').value = '';
        formTitle.innerText = "Add New Product";
        productFormModal.style.display = "block";
    };

    closeFormModal.onclick = () => {
        productFormModal.style.display = "none";
    };

    productForm.onsubmit = (e) => {
        e.preventDefault();
        saveProduct();
    };

    settingsForm.onsubmit = (e) => {
        e.preventDefault();
        saveSettings();
    };

    window.onclick = (event) => {
        if (event.target == productFormModal) {
            productFormModal.style.display = "none";
        }
        if (event.target == codeModal) {
            codeModal.style.display = "none";
        }
    };
}

function setupFileUploads() {
    const heroFileInput = document.getElementById('hero-file-input');
    const heroImgUrl = document.getElementById('set-hero-img-url');
    const prodFileInput = document.getElementById('prod-file-input');
    const prodImgUrl = document.getElementById('prod-image');

    // Hero Image Upload
    heroFileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            heroImgUrl.value = file.name;
            // Option: convert to Base64 for instant preview if needed
            const reader = new FileReader();
            reader.onload = (event) => {
                // You can use event.target.result to save as Base64 in LocalStorage
                // But user wants to place it in the folder, so we keep the name
            };
            reader.readAsDataURL(file);
        }
    };

    // Product Image Upload
    prodFileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            prodImgUrl.value = file.name;
        }
    };
}

function loadSettingsIntoForm() {
    document.getElementById('set-site-name').value = settings.siteName;
    document.getElementById('set-hero-title').value = settings.heroTitle;
    document.getElementById('set-hero-img-url').value = settings.heroImg || '';
    document.getElementById('set-hero-sub').value = settings.heroSub;
    document.getElementById('set-email').value = settings.email;
    document.getElementById('set-phone').value = settings.phone;
    document.getElementById('set-fb').value = settings.facebook;
    document.getElementById('set-about').value = settings.about;
}

function saveSettings() {
    settings = {
        siteName: document.getElementById('set-site-name').value,
        heroTitle: document.getElementById('set-hero-title').value,
        heroImg: document.getElementById('set-hero-img-url').value,
        heroSub: document.getElementById('set-hero-sub').value,
        email: document.getElementById('set-email').value,
        phone: document.getElementById('set-phone').value,
        facebook: document.getElementById('set-fb').value,
        about: document.getElementById('set-about').value
    };

    localStorage.setItem('shop_settings', JSON.stringify(settings));
    alert("Site settings saved successfully!");
    // Update logo text in admin header too
    document.querySelector('.logo h1').innerText = settings.siteName + " Admin";
}

function renderAdminProducts() {
    adminProductList.innerHTML = products.map(product => `
        <tr>
            <td><img src="${product.image}" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td class="admin-actions">
                <button class="edit-btn" onclick="editProduct(${product.id})"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function saveProduct() {
    const id = document.getElementById('product-id').value;
    const name = document.getElementById('prod-name').value;
    const price = parseFloat(document.getElementById('prod-price').value);
    const image = document.getElementById('prod-image').value;
    const description = document.getElementById('prod-desc').value;

    if (id) {
        // Edit existing
        const index = products.findIndex(p => p.id == id);
        products[index] = { id: parseInt(id), name, price, image, description };
    } else {
        // Add new
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, name, price, image, description });
    }

    localStorage.setItem('shop_products', JSON.stringify(products));
    renderAdminProducts();
    productFormModal.style.display = "none";
    alert("Product saved successfully!");
}

window.editProduct = (id) => {
    const product = products.find(p => p.id == id);
    if (!product) return;

    document.getElementById('product-id').value = product.id;
    document.getElementById('prod-name').value = product.name;
    document.getElementById('prod-price').value = product.price;
    document.getElementById('prod-image').value = product.image;
    document.getElementById('prod-desc').value = product.description;

    formTitle.innerText = "Edit Product";
    productFormModal.style.display = "block";
};

window.deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
        products = products.filter(p => p.id != id);
        localStorage.setItem('shop_products', JSON.stringify(products));
        renderAdminProducts();
    }
};

initAdmin();
