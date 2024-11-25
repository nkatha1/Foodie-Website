// Retrieve the cart from localStorage, or initialize as an empty array if not present
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Get the cart count and total price elements
const cartCountElement = document.getElementById('cart-count');
const totalPriceElement = document.getElementById('total-price');
const cartItemsElement = document.getElementById('cart-items');

// Function to update the cart count display
function updateCartCount() {
  cartCountElement.textContent = `(${cart.length})`; // Update cart number in the navbar
}

// Function to update the total price
function updateTotalPrice() {
  let total = 0;

  // Loop through all items in the cart to calculate the total
  cart.forEach(item => {
    let price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    total += price;
  });

  totalPriceElement.textContent = `$${total.toFixed(2)}`; // Update the total price display
}

// Function to update the cart display
function updateCartDisplay() {
  cartItemsElement.innerHTML = ''; // Clear current cart display

  // Loop through the cart items and display them
  cart.forEach((item, index) => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
      <img src="images/${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>${item.price}</p>
      </div>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItemsElement.appendChild(cartItemElement);
  });

  // Attach event listeners to "Remove" buttons
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const itemIndex = this.getAttribute('data-index'); // Get item index to remove
      removeItemFromCart(itemIndex); // Remove item from cart
    });
  });
}

// Function to remove an item from the cart
function removeItemFromCart(index) {
  cart.splice(index, 1); // Remove the item from the cart array
  localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to localStorage

  updateCartCount(); // Update the cart count in the navbar
  updateTotalPrice(); // Update the total price
  updateCartDisplay(); // Update the cart display
}

// Function to add items to the cart
function addToCart(item) {
  cart.push(item); // Add the item to the cart array
  localStorage.setItem('cart', JSON.stringify(cart)); // Save the updated cart to localStorage

  updateCartCount(); // Update the cart count in the navbar
  updateTotalPrice(); // Update the total price
  updateCartDisplay(); // Update the cart display
}

// Function to checkout (clear the cart and show confirmation)
function checkout() {
  // Clear the cart
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage

  // Update the cart UI
  updateCartCount();
  updateTotalPrice();
  updateCartDisplay();

  // Show a confirmation message
  alert('Thank you for your purchase! Your cart is now empty.');
}

// Set up event listeners for the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', function() {
    const itemName = this.parentElement.querySelector('h3').textContent;
    const itemPrice = this.parentElement.querySelector('p').textContent;
    const itemImage = this.parentElement.querySelector('img').getAttribute('src').split('/').pop(); // Get image filename

    const item = {
      name: itemName,
      price: itemPrice,
      image: itemImage
    };

    addToCart(item); // Add item to the cart
  });
});

// On page load (for cart page), load the cart data from localStorage
if (window.location.pathname.includes('cart.html')) {
  updateCartDisplay(); // Update cart items on the cart page
  updateTotalPrice(); // Update the total price on the cart page
  updateCartCount(); // Update the cart count in the navbar

  // Set up the checkout button
  const checkoutButton = document.getElementById('checkout-btn');
  checkoutButton.addEventListener('click', checkout); // Add checkout functionality
}
