let cartItems = [];

export function addToCart(product, quantity) {
  const existingCartItem = cartItems.find(item => item.product.id === product.id);
  if (existingCartItem) {
    existingCartItem.quantity += quantity;
  } else {
    cartItems.push({ product, quantity });
  }
}

export function removeCartItem(cartItem) {
  cartItems = cartItems.filter(item => item !== cartItem);
}

export function clearCart() {
  cartItems = [];
}

export function calculateTotal() {
  return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function getCartItems() {
  return cartItems;
}
