import { addToCart, calculateTotal, clearCart, getCartItems, removeCartItem } from './cart.js';
import { products } from './product.js';

document.addEventListener('DOMContentLoaded', () => {
  const productButtons = document.querySelectorAll('.add-to-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const clearCartButton = document.getElementById('clear-cart-btn');

  productButtons.forEach(button => {
    button.addEventListener('click', addToCartHandler);
  });

  clearCartButton.addEventListener('click', clearCartHandler);

  function addToCartHandler(event) {
    const productId = parseInt(event.target.dataset.productId);
    const selectedProduct = products.find(product => product.id === productId);
    addToCart(selectedProduct, 1);
    displayCartItems();
    displayTotal();
  }

  function clearCartHandler() {
    clearCart();
    displayCartItems();
    displayTotal();
  }

  function displayCartItems() {
    cartItemsContainer.innerHTML = '';
    const cartItems = getCartItems();
    cartItems.forEach(item => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cart-item');
      cartItemElement.innerHTML = `
        <div>
          <img src="${item.product.image}" alt="${item.product.name}">
          <span>${item.product.name}</span>
        </div>
        <div class="quantity">
          <button class="remove-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">-</button>
          <input type="text" class='py-2 border border-blue-700 rounded' min="1" value="${item.quantity}">
          <button class="add-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">+</button>
        </div>
        <div>BDT ${item.product.price}</div>
        <div>BDT ${item.product.price * item.quantity}</div>
        <button class="remove-item-btn">Remove</button>
      `;
      const removeButton = cartItemElement.querySelector('.remove-btn');
      const addButton = cartItemElement.querySelector('.add-btn');
      const removeItemButton = cartItemElement.querySelector('.remove-item-btn');

      removeButton.addEventListener('click', () => changeQuantityHandler(item, -1));
      addButton.addEventListener('click', () => changeQuantityHandler(item, 1));
      removeItemButton.addEventListener('click', () => removeItemHandler(item));

      cartItemsContainer.appendChild(cartItemElement);
    });
  }

  function changeQuantityHandler(item, quantityChange) {
    item.quantity += quantityChange;
    if (item.quantity < 1) {
      removeCartItem(item);
    }
    displayCartItems();
    displayTotal();
  }

  function removeItemHandler(item) {
    removeCartItem(item);
    displayCartItems();
    displayTotal();
  }

  function displayTotal() {
    const total = calculateTotal();
    cartTotal.textContent = `BDT ${total}`;
  }
});
