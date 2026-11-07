// =====================================
// GIFT GALAXY - JAVASCRIPT
// =====================================


// PRODUCT DATA

const products = [

    {
        id: 1,
        name: "Luxury Birthday Box",
        category: "Birthday",
        price: 799,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=500"
    },

    {
        id: 2,
        name: "Romantic Rose Bouquet",
        category: "Flowers",
        price: 599,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500"
    },

    {
        id: 3,
        name: "Personalized Photo Frame",
        category: "Personalized",
        price: 499,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500"
    },

    {
        id: 4,
        name: "Anniversary Gift Box",
        category: "Anniversary",
        price: 1299,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500"
    },

    {
        id: 6,
        name: "Cute Teddy Bear",
        category: "Birthday",
        price: 699,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500"
    },

    {
        id: 7,
        name: "Premium Gift Hamper",
        category: "Hampers",
        price: 1499,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500"
    },

    {
        id: 8,
        name: "Personalized Gift Box",
        category: "Personalized",
        price: 999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?w=500"
    }

];


// CART ARRAY

let cart = [];


// GET HTML ELEMENTS

const productGrid = document.getElementById("productGrid");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");

const cartCount = document.getElementById("cartCount");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");


// =====================================
// DISPLAY PRODUCTS
// =====================================

function displayProducts(productList) {

    productGrid.innerHTML = "";

    if (productList.length === 0) {

        productGrid.innerHTML =
            `<p class="no-products">No gifts found! Try another search.</p>`;

        return;

    }


    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}">

            </div>

            <div class="product-info">

                <span class="category">${product.category}</span>

                <h3>${product.name}</h3>

                <div class="rating">

                    <i class="fa-solid fa-star"></i>
                    ${product.rating}

                </div>

                <div class="price">
                    ₹${product.price}
                </div>

                <button class="add-cart-btn"
                    onclick="addToCart(${product.id})">

                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart

                </button>

            </div>

        `;

        productGrid.appendChild(card);

    });

}


// SHOW ALL PRODUCTS

displayProducts(products);


// =====================================
// SEARCH PRODUCTS
// =====================================

function searchProducts() {

    const searchValue = searchInput.value.toLowerCase();

    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {

        const matchesSearch =
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    displayProducts(filteredProducts);

}


searchInput.addEventListener("input", searchProducts);

categoryFilter.addEventListener("change", searchProducts);


// =====================================
// CATEGORY FILTER
// =====================================

function filterCategory(category) {

    categoryFilter.value = category;

    searchInput.value = "";

    searchProducts();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================
// ADD TO CART
// =====================================

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    const existingItem = cart.find(item => item.id === productId);


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    alert(product.name + " added to your cart!");

}


// =====================================
// UPDATE CART
// =====================================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">Your cart is empty!</p>`;

    }


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>

            <button class="remove-btn"
                onclick="removeFromCart(${item.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.innerText = count;

    cartTotal.innerText = "₹" + total;

}


// =====================================
// REMOVE FROM CART
// =====================================

function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    updateCart();

}


// =====================================
// OPEN CART
// =====================================

function openCart() {

    document.getElementById("cartSidebar")
        .classList.add("active");

    document.getElementById("cartOverlay")
        .classList.add("active");

}


// =====================================
// CLOSE CART
// =====================================

function closeCart() {

    document.getElementById("cartSidebar")
        .classList.remove("active");

    document.getElementById("cartOverlay")
        .classList.remove("active");

}


// =====================================
// CHECKOUT
// =====================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty! Please add some gifts.");

        return;

    }

    alert(
        "Thank you for shopping with Gift Galaxy! 🎁\n\n" +
        "Your order total is " + cartTotal.innerText +
        "\n\nThis is a demo checkout."
    );

}


// =====================================
// NEWSLETTER SUBSCRIPTION
// =====================================

const newsletterForm =
    document.getElementById("newsletterForm");


newsletterForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email =
        document.getElementById("emailInput").value;


    document.getElementById("subscribeMessage").innerText =
        "Thank you for subscribing! ❤️";


    newsletterForm.reset();

});


// =====================================
// MOBILE NAVIGATION
// =====================================

function toggleMenu() {

    document.getElementById("navLinks")
        .classList.toggle("active");

}


// CLOSE MOBILE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function() {

        document.getElementById("navLinks")
            .classList.remove("active");

    });

});


// =====================================
// INITIALIZE CART
// =====================================

updateCart();