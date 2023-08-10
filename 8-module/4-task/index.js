import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = null;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {

      let cartItem = this.findCartItemById(product.id);
      console.log(cartItem);

      if (cartItem) {
        cartItem.count++;
        console.log(cartItem);
      } else {
        cartItem = {
          product: product,
          count: 1
        };
        this.cartItems.push(cartItem);
        console.log(cartItem);
      }
      this.onProductUpdate(cartItem);
    }
  }

  findCartItemById(productId) {
    return this.cartItems.find(item => item.product.id === productId);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.findCartItemById(productId);

    if(cartItem){
      cartItem.count += amount;

      if(cartItem.count === 0){
        this.removeCartItem(cartItem);
      }
      this.onProductUpdate(cartItem);
    }
  }

  removeCartItem(cartItem){
    let index = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(index, 1);
  }

  isEmpty() {
    if(this.cartItems.length){
      return false;
    } else {
      return true;
    }
  }

  getTotalCount() {
    let countCartItem = 0;
    for(let i of this.cartItems){
      countCartItem += i.count;
    }
    // console.log(countCartItem);
    return countCartItem;
  }

  getTotalPrice() {
    let priceCartItem = 0;
    for(let i of this.cartItems){
      priceCartItem += i.product.price * i.count;
    }
    // console.log(priceCartItem);
    return priceCartItem;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    let modalBody = document.createElement("div");

    for(let product of this.cartItems){
      let productCard = this.renderProduct(product.product, product.count);
      modalBody.appendChild(productCard);
    }
    let orderForm = this.renderOrderForm();
    modalBody.appendChild(orderForm);

    this.modal.setBody(modalBody);  

    this.modal.open();
    this.modal.elem.onclick = this.modalClick;
    this.modal.elem.onsubmit = this.onSubmit;
  }

  modalClick = (event) => {
    console.log(event.target);
    let button = event.target.closest('button');
    if (!button) {
      return;
    }

    console.log('btn');

    if (button.classList.contains('cart-counter__button_minus')) {
      let productId = event.target.closest('.cart-product').dataset.productId;
      this.updateProductCount(productId, -1);
      return;
    }

    if (button.classList.contains('cart-counter__button_plus')) {
      let productId = event.target.closest('.cart-product').dataset.productId;
      this.updateProductCount(productId, 1);
      return;
    }
  }

  onProductUpdate(cartItem) {
    let body = document.body;
    if(body.classList.contains('is-modal-open')){
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');

      // Элемент, который хранит количество товаров с таким productId в корзине
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`); 

      // Элемент с общей стоимостью всех единиц этого товара
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`); 

      // Элемент с суммарной стоимостью всех товаров
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;

      productPrice.textContent = `€${(Number(cartItem.product.price) * cartItem.count).toFixed(2)}`;

      infoPrice.innerHTML = `€${this.getTotalPrice(2).toFixed(2)}`;
    }
    if (this.cartItems.length === 0) {
      this.modal.close();
    }

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let form = document.querySelector('.cart-form');
    let modalTitle = document.querySelector('.modal__title');
    let modalBody = document.querySelector('.modal__body');

    let button = event.target.querySelector('.btn-group__button');
    button.classList.add('is-loading');

    const url = 'https://httpbin.org/post';
    const method = 'POST';
    const formData = new FormData(form);

    fetch(url, {
      method,
      body: formData
    })
    .then( () => {
        modalTitle.textContent = 'Success!';
        console.log(this.cartItems);
        if(this.cartItems){
          console.log(this.cartItems);
          this.cartItems.length = 0;
        }
        modalBody.innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
        `;
    })
    .catch(error => {
      console.error('Ошибка: ', error);
    })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

