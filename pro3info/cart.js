let iconCart = document.querySelector('.cart-icon');
let cart = document.querySelector('.cart');
let listCart = document.querySelector('.listCart');
let cartCount = document.querySelector('.cart-item-count');
let close = document.querySelector('.close');
let addButton = document.getElementById('add2cart');

let cartData = JSON.parse(localStorage.getItem('cartData')) || [];
let isCartOpen = false;

iconCart?.addEventListener('click', () => {
  cart.style.right = isCartOpen ? '-100%' : '0';
  isCartOpen = !isCartOpen;
});

close?.addEventListener('click', () => {
  cart.style.right = '-100%';
  isCartOpen = false;
});

addButton?.addEventListener('click', () => {
  const name = document.querySelector('.namee')?.innerText || "Unnamed";
  const priceText = document.querySelector('.num')?.innerText || "0DT";
  const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

  const img = document.querySelector('.pose1')?.getAttribute('src') || "";
  const size = ""; // no size in this product

  const existing = cartData.find(item => item.name === name && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartData.push({ name, size, price, img, quantity: 1 });
  }

  saveAndRender();
});

function saveAndRender() {
  localStorage.setItem('cartData', JSON.stringify(cartData));
  updateCartHTML();
}

function updateCartHTML() {
  listCart.innerHTML = '';

  cartData.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('item');

    const sizeDisplay = item.size ? ` - Size: ${item.size}` : '';

    cartItem.innerHTML = `
      <img src="${item.img}" alt="Product">
      <div class="content">
        <div class="name4">${item.name}${sizeDisplay}</div>
        <div class="price4">${(item.price * item.quantity).toFixed(2)}Dt (${item.price}Dt x ${item.quantity})</div>
        <div class="quantity">
          <button class="minus" data-index="${index}">-</button>
          <span class="count">${item.quantity}</span>
          <button class="plus" data-index="${index}">+</button>
        </div>
      </div>
    `;
    listCart.appendChild(cartItem);
  });

  const totalCount = cartData.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.innerText = totalCount;

  document.querySelectorAll('.plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.getAttribute('data-index');
      cartData[i].quantity++;
      saveAndRender();
    });
  });

  document.querySelectorAll('.minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = btn.getAttribute('data-index');
      cartData[i].quantity--;
      if (cartData[i].quantity <= 0) {
        cartData.splice(i, 1);
      }
      saveAndRender();
    });
  });
}

updateCartHTML();
