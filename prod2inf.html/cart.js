let iconCart = document.querySelector('.cart-icon');
let cart = document.querySelector('.cart'); 
let listCart = document.querySelector('.listCart');
let cartCount = document.querySelector('.cart-item-count');
let close = document.querySelector('.close');

// Accept both .add1 and #add2cart buttons
let addButtons = document.querySelectorAll('.add1, #add2cart');

let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

let isCartOpen = false;

// Handle cart toggle
if (iconCart) {
  iconCart.addEventListener('click', () => {
    cart.style.right = isCartOpen ? '-150%' : '0';
    isCartOpen = !isCartOpen;
  });
}

if (close) {
  close.addEventListener('click', () => {
    cart.style.right = '-150%';
    isCartOpen = false;
  });
}

// Add to cart buttons
if (addButtons.length) {
  addButtons.forEach((button) => {
    button.addEventListener('click', () => {
      let productElement = document; // since your HTML doesn't wrap elements in a div

      let nameEl = productElement.querySelector('.namee');
      let name = nameEl ? nameEl.innerText : "Unnamed";

      let sizeSelect = productElement.querySelector('#size');
      let size = "";

      if (sizeSelect) {
        size = sizeSelect.value;
        if (!size) {
          alert("Please choose a size before adding to cart.");
          return;
        }
      }

      let priceText = productElement.querySelector('.num').innerText;
      let price = parseFloat(priceText.replace('DT', '').trim());

      let img = productElement.querySelector('.pose1')?.getAttribute('src') || '';

      let existing = cartData.find(item => item.name === name && item.size === size);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartData.push({ name, size, price, img, quantity: 1 });
      }

      saveAndRender();
    });
  });
}

// Update and save cart
function saveAndRender() {
  localStorage.setItem('cartData', JSON.stringify(cartData));
  updateCartHTML();
}

function updateCartHTML() {
  listCart.innerHTML = '';
  cartData.forEach((item, index) => {
    let cartItem = document.createElement('div');
    cartItem.classList.add('item');

    let sizeDisplay = item.size ? ` - Size: ${item.size}` : '';

    cartItem.innerHTML = `
      <img src="${item.img}" alt="Product">
      <div class="content">
        <div class="name4">${item.name}${sizeDisplay}</div>
        <div class="price4">${item.price * item.quantity}Dt (${item.price}Dt x ${item.quantity})</div>
        <div class="quantity">
          <button class="minus" data-index="${index}">-</button>
          <span class="count">${item.quantity}</span>
          <button class="plus" data-index="${index}">+</button>
        </div>
      </div>
    `;
    listCart.appendChild(cartItem);
  });

  let totalCount = cartData.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalCount;

  document.querySelectorAll('.plus').forEach(btn => {
    btn.addEventListener('click', () => {
      let i = btn.getAttribute('data-index');
      cartData[i].quantity++;
      saveAndRender();
    });
  });

  document.querySelectorAll('.minus').forEach(btn => {
    btn.addEventListener('click', () => {
      let i = btn.getAttribute('data-index');
      cartData[i].quantity--;
      if (cartData[i].quantity <= 0) {
        cartData.splice(i, 1);
      }
      saveAndRender();
    });
  });
}

// Always render cart on page load
updateCartHTML();
