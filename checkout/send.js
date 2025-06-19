document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cartData")) || [];
  const cartSummary = document.getElementById("cart-summary");
  const orderDetailsInput = document.getElementById("orderDetailsInput");

  if (cart.length === 0) {
    cartSummary.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let html = "<h2>Your Cart:</h2><ul>";
  let summaryText = "";

  cart.forEach((item) => {
    html += `<li><strong>${item.name}</strong> (Size: ${item.size || "N/A"}) x${item.quantity} — ${item.price * item.quantity}DT</li>`;
    summaryText += `${item.name} (Size: ${item.size || "N/A"}) x${item.quantity} = ${item.price * item.quantity}DT\n`;
  });

  html += "</ul>";
  cartSummary.innerHTML = html;

  // Add to hidden input
  orderDetailsInput.value = summaryText;
});
