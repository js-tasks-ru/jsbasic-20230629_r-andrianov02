export default class ProductCard {
  elem = null;

  constructor(product) {
    this.product = product;
    this.elem = document.createElement("div");
    this.template();
  }
  get elem(){
    return this.elem;
  }

  template(){
    let div = `
      <div class="card">
      <div class="card__top">
          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${this.product.price.toFixed(2)}</span>
      </div>
      <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
      </div>
      </div>
    `;
    this.elem.innerHTML = div;
    for(let btn of this.elem.querySelectorAll('.card__button')){
      btn.addEventListener("click", this.render);
  }}

  render = () => {
    let event = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true,
  });
    this.elem.dispatchEvent(event);
  }
}