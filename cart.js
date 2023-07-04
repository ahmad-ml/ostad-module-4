// cart.js
let cartItems = [];

export function addToCart(item, quantity = 1) {
    const existingItem = cartItems.find((cartItem) => cartItem.item.id === item.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ item, quantity });
    }
}

export function getCartItems() {
    return cartItems;
}

export function clearCart() {
    cartItems = [];
}

export function removeFromCart(itemId) {
    cartItems = cartItems.filter((cartItem) => cartItem.item.id !== itemId);
}

export function increaseQuantity(itemId) {
    const cartItem = cartItems.find((cartItem) => cartItem.item.id === itemId);
    if (cartItem) cartItem.quantity++;
}

export function decreaseQuantity(itemId) {
    const cartItem = cartItems.find((cartItem) => cartItem.item.id === itemId);
    if (cartItem && cartItem.quantity > 1) cartItem.quantity--;
}


// cart.js

// The rest of the code...

export function increaseQuantity(itemId) {
    const cartItem = cartItems.find((cartItem) => cartItem.item.id === itemId);
    if (cartItem) cartItem.quantity++;
}

export function decreaseQuantity(itemId) {
    const cartItem = cartItems.find((cartItem) => cartItem.item.id === itemId);
    if (cartItem && cartItem.quantity > 0) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            removeFromCart(itemId);
        }
    }
}
