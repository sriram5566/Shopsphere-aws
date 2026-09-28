// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("shopSphereCart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("shopSphereCart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(productId, productName, price) {
    price = Number(price);

    const existingItem = cart.find(
        item => item.productId === productId
    );

    if (existingItem) {
        existingItem.quantity++;
        existingItem.price = price;
    } else {
        cart.push({
            productId: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(productName + " added to cart!");
}

// Increase quantity
function increaseQuantity(index) {
    if (!cart[index]) return;

    cart[index].quantity++;

    saveCart();
    displayCart();
    updateCartCount();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (!cart[index]) return;

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
    updateCartCount();
}

// Remove product
function removeFromCart(index) {
    if (!cart[index]) return;

    const productName = cart[index].name;

    if (confirm(`Remove ${productName} from your cart?`)) {
        cart.splice(index, 1);

        saveCart();
        displayCart();
        updateCartCount();
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    cartCount.textContent = totalItems;
}

// Display cart
function displayCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const placeOrderButton =
        document.getElementById("placeOrderButton");

    if (!cartItems) return;

    // Empty cart
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty 🛒</h3>
                <p>Add products to start shopping.</p>

                <br>

                <a href="products.html">
                    <button>Browse Products</button>
                </a>
            </div>
        `;

        if (cartTotal) {
            cartTotal.textContent = "0";
        }

        if (placeOrderButton) {
            placeOrderButton.disabled = true;
        }

        return;
    }

    let total = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        const price = Number(item.price || 0);
        const quantity = Number(item.quantity || 1);

        const itemTotal = price * quantity;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="product-card cart-item">

                <h3>${item.name}</h3>

                <p>
                    Price: ₹${price.toLocaleString("en-IN")}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${quantity}</span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <strong>
                    Item Total: ₹${itemTotal.toLocaleString("en-IN")}
                </strong>

                <br><br>

                <button
                    class="remove-button"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    // Update total price
    if (cartTotal) {
        cartTotal.textContent = total.toLocaleString("en-IN");
    }

    // Enable Place Order button
    if (placeOrderButton) {
        placeOrderButton.disabled = false;
    }
}

// API Gateway URL
const API_URL =
    "https://2irkh852hj.execute-api.ap-south-1.amazonaws.com";

// Place order using AWS
async function placeOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const total = cart.reduce((sum, item) => {
        return sum + Number(item.price || 0) * Number(item.quantity || 1);
    }, 0);

    const confirmOrder = confirm(
        `Confirm your order for ₹${total.toLocaleString("en-IN")}?`
    );

    if (!confirmOrder) return;

    const placeOrderButton =
        document.getElementById("placeOrderButton");

    if (placeOrderButton) {
        placeOrderButton.disabled = true;
        placeOrderButton.textContent = "Processing...";
    }

    try {
        const createdOrders = [];

        // Send each cart item to AWS
        for (const item of cart) {
            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productId: item.productId,
                    quantity: Number(item.quantity)
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Order creation failed"
                );
            }

            createdOrders.push(result.order);
        }

        alert(
            "Order placed successfully! 🎉\n\n" +
            `Orders created: ${createdOrders.length}`
        );

        // Clear cart only after all orders succeed
        cart = [];

        saveCart();
        updateCartCount();
        displayCart();

    } catch (error) {
        console.error("Order Error:", error);

        alert(
            "Unable to place the order.\n\n" +
            "Please try again."
        );

    } finally {
        if (placeOrderButton) {
            placeOrderButton.disabled = cart.length === 0;
            placeOrderButton.textContent = "Place Order";
        }
    }
}
// Scroll to products
function scrollToProducts() {
    const productsSection = document.getElementById("products");

    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// Initialize application
updateCartCount();
displayCart();