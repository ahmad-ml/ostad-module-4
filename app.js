// app.js
import { addToCart, clearCart, getCartItems } from './cart.js';
import { products } from './product.js';

function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    const cartItems = getCartItems();
    for (const cartItem of cartItems) {
        cartItemsDiv.innerHTML += `<div>${cartItem.item.name} - ${cartItem.quantity} - ${cartItem.item.price * cartItem.quantity}</div>`;
    }
    document.getElementById('cart-total').textContent = 'Total: ' + cartItems.reduce((total, cartItem) => total + cartItem.item.price * cartItem.quantity, 0);
}

document.getElementById('product-list').innerHTML = products.map(product => `
    <div class="border p-4">
        <h3 class="text-lg font-bold">${product.name}</h3>
        <div>Price: ${product.price}</div>
        <button class="add-to-cart bg-green-500 text-white px-4 py-2 rounded mt-2" data-id="${product.id}">Add to Cart</button>
    </div>
`).join('');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const product = products.find(product => product.id == button.dataset.id);
        addToCart(product);
        updateCart();
    });
});

document.getElementById('clear-cart').addEventListener('click', () => {
    clearCart();
    updateCart();
});


// app.js

import { decreaseQuantity, increaseQuantity } from './cart.js';

// The rest of the code...

document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', () => {
        const product = getCartItems().find(product => product.item.id == button.dataset.id);
        increaseQuantity(product.item.id);
        updateCart();
    });
});

document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', () => {
        const product = getCartItems().find(product => product.item.id == button.dataset.id);
        decreaseQuantity(product.item.id);
        updateCart();
    });
});
