// Load Data from data.js or LocalStorage
let products = JSON.parse(localStorage.getItem('shop_products')) || [...initialProducts];
let settings = JSON.parse(localStorage.getItem('shop_settings')) || { ...initialSettings };

// DOM Elements
const adminProductList = document.getElementById('admin-product-list');
const productFormModal = document.getElementById('product-form-modal');
const productForm = document.getElementById('product-form');
const addProductBtn = document.getElementById('add-product-btn');
const closeFormModal = document.getElementById('close-form-modal');
const formTitle = document.getElementById('form-title');
const settingsForm = document.getElementById('site-settings-form');
const downloadDataBtn = document.getElementById('download-data-btn');

// Initialize Admin Dashboard
function initAdmin() {
    renderAdminProducts();
    loadSettingsIntoForm();
    setupFileUploads();
    
    downloadDataBtn.onclick = () => {
        const fileContent = `// This file holds all your website data. 
// You can edit this file directly or use the Admin Dashboard to download a new version.

const initialProducts = ${JSON.stringify(products, null, 4)};

const initialSettings = ${JSON.stringify(settings, null, 4)};`;
        
        const blob = new Blob([fileContent], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.js';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert("data.js has been downloaded! Replace the old data.js in your folder with this one and upload to GitHub.");
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
