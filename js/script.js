const cart = document.getElementById("cart");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

let basket = [];

// Открыть корзину
cartBtn.onclick = () => {
    cart.classList.add("active");
};

// Закрыть корзину
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Добавление товара
document.querySelectorAll(".add-to-cart").forEach(button => {

    button.onclick = () => {

        const card = button.closest(".card");

        const name = card.querySelector("h3").innerText;
        const price = parseInt(card.querySelector("span").innerText);

        const item = basket.find(product => product.name === name);

        if (item) {
            item.quantity++;
        } else {
            basket.push({
                name,
                price,
                quantity: 1
            });
        }

        updateCart();

    };

});

// Обновление корзины
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    basket.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <h4>${item.name}</h4>

            <div class="cart-controls">

                <button onclick="minusItem(${index})">−</button>

                <span>${item.quantity}</span>

                <button onclick="plusItem(${index})">+</button>

                <strong>${item.price * item.quantity} ₴</strong>

                <button onclick="removeItem(${index})">🗑</button>

            </div>

        </div>

        `;

    });

    if (basket.length === 0) {
        cartItems.innerHTML = "<p>Корзина пуста</p>";
    }

    cartTotal.innerText = total + " ₴";
    cartCount.innerText = count;

}

// Увеличить
function plusItem(index) {
    basket[index].quantity++;
    updateCart();
}

// Уменьшить
function minusItem(index) {

    basket[index].quantity--;

    if (basket[index].quantity <= 0) {
        basket.splice(index, 1);
    }

    updateCart();

}

// Удалить
function removeItem(index) {
    basket.splice(index, 1);
    updateCart();
}
const checkout = document.getElementById("checkout");
const checkoutForm = document.getElementById("checkout-form");
const closeOrder = document.getElementById("close-order");
const confirmOrder = document.getElementById("confirm-order");

// Открыть форму оформления заказа
checkout.onclick = () => {

    if (basket.length === 0) {
        alert("Корзина пуста!");
        return;
    }

    checkoutForm.classList.add("active");
};

// Закрыть форму
closeOrder.onclick = () => {
    checkoutForm.classList.remove("active");
};

// Подтвердить заказ
confirmOrder.onclick = () => {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (name === "" || phone === "" || address === "") {
        alert("Заполните все поля.");
        return;
    }

    if (payment.value === "card") {

    const cardNumber = document.getElementById("card-number").value.trim();
    const cardDate = document.getElementById("card-date").value.trim();
    const cardCvv = document.getElementById("card-cvv").value.trim();

    if (cardNumber === "" || cardDate === "" || cardCvv === "") {
        alert("Заполните данные банковской карты.");
        return;
    }

}
    alert("Спасибо за заказ!");

    basket = [];
    updateCart();

    checkoutForm.classList.remove("active");

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
};
const payment = document.getElementById("payment");
const cardFields = document.getElementById("card-fields");

payment.onchange = () => {

    if (payment.value === "card") {
        cardFields.style.display = "block";
    } else {
        cardFields.style.display = "none";
    }

};

// При загрузке страницы
payment.dispatchEvent(new Event("change"));