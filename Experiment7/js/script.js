const products = [
    { id: 1, name: "Laptop", price: 50000, desc: "Powerful laptop" },
    { id: 2, name: "Phone", price: 20000, desc: "Smart smartphone" },
    { id: 3, name: "Headphones", price: 3000, desc: "Noise cancelling" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// LOAD PRODUCTS
if (document.getElementById("product-list")) {
    const container = document.getElementById("product-list");

    products.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <h4>₹${p.price}</h4>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
        `;
    });
}

// ADD
function addToCart(id) {
    let item = cart.find(c => c.id === id);

    if (item) item.qty++;
    else {
        let product = products.find(p => p.id === id);
        cart.push({ ...product, qty: 1 });
    }

    updateCart();
}

// UPDATE
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));

    let count = cart.reduce((sum, i) => sum + i.qty, 0);
    let countEl = document.getElementById("cart-count");
    if (countEl) countEl.innerText = count;

    let cartItems = document.getElementById("cart-items");
    let total = 0;

    if (cartItems) {
        cartItems.innerHTML = "";

        cart.forEach(item => {
            total += item.price * item.qty;

            cartItems.innerHTML += `
            <div>
                ${item.name} x ${item.qty}
                <button onclick="changeQty(${item.id},1)">+</button>
                <button onclick="changeQty(${item.id},-1)">-</button>
                <button onclick="removeItem(${item.id})">❌</button>
            </div>
            `;
        });

        let totalEl = document.getElementById("total");
        if (totalEl) totalEl.innerText = total;
    }
}

// CHANGE QTY
function changeQty(id, change) {
    let item = cart.find(c => c.id === id);
    item.qty += change;

    if (item.qty <= 0) {
        cart = cart.filter(c => c.id !== id);
    }

    updateCart();
}

// REMOVE
function removeItem(id) {
    cart = cart.filter(c => c.id !== id);
    updateCart();
}

// ORDER
function placeOrder() {
    alert("Order placed successfully 🎉");
    cart = [];
    updateCart();
}

updateCart();