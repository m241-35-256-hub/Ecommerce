/**
 * Cart Utility Functions for localStorage Management
 * This file provides helper functions to manage cart data in localStorage
 */

// Get cart from localStorage
function getCart() {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error getting cart from localStorage:', error);
        return [];
    }
}

// Save cart to localStorage
function saveCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCounter();
        return true;
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
        return false;
    }
}

// Add item to cart
function addToCart(product) {
    const cart = getCart();
    
    // Check if item already exists
    const existingItemIndex = cart.findIndex(item => item.Product_name === product.Product_name);
    
    if (existingItemIndex !== -1) {
        // Item exists, update quantity
        cart[existingItemIndex].Quantity = parseInt(cart[existingItemIndex].Quantity) + parseInt(product.Quantity);
    } else {
        // Add new item
        cart.push(product);
    }
    
    return saveCart(cart);
}

// Remove item from cart
function removeFromCart(productName) {
    let cart = getCart();
    cart = cart.filter(item => item.Product_name !== productName);
    return saveCart(cart);
}

// Update item quantity
function updateCartItemQuantity(productName, newQuantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.Product_name === productName);
    
    if (itemIndex !== -1) {
        cart[itemIndex].Quantity = parseInt(newQuantity);
        return saveCart(cart);
    }
    return false;
}

// Get cart item count
function getCartItemCount() {
    const cart = getCart();
    return cart.length;
}

// Get cart total price
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => {
        return total + (parseFloat(item.Price) * parseInt(item.Quantity));
    }, 0);
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCounter();
}

// Check if product exists in cart
function isInCart(productName) {
    const cart = getCart();
    return cart.some(item => item.Product_name === productName);
}

// Update cart counter in header
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-total');
    if (cartCounter) {
        cartCounter.innerText = getCartItemCount();
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
});

// Listen for storage events (when cart is updated in another tab)
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartCounter();
    }
});
