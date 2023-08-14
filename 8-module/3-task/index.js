export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product) {

      let cartItem = this.findCartItemById(product.id);

      if (cartItem) {
        cartItem.count++;
      } else {
        cartItem = {
          product: product,
          count: 1
        };
        this.cartItems.push(cartItem);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

