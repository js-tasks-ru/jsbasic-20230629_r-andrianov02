import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();
    this.initialTopCoord = null;
    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    
    let cart = document.querySelector('.cart-icon_visible');

    if(cart){

      if(!this.initialTopCoord){
        let initial = this.elem.getBoundingClientRect().top + window.scrollY;
        this.initialTopCoord = initial;
      }

      console.log(this.initialTopCoord);
      console.log(window.scrollY);

      let isMobile = document.documentElement.clientWidth <= 767;

      // Если условие выполняется, обнуляем стили к исходным
      if (isMobile) {
        
        console.log('Мобильное устройство');
        this.absolutePos();

      } else {

        if (window.scrollY > this.initialTopCoord) {
          // плавающая корзина
          console.log('плаваяющая корзина');
          this.fixedPos();

        } else {
          // корзина сверху
          console.log('корзина сверху');
          this.absolutePos();

        }
      }
    }
  }

  fixedPos(){
    Object.assign(this.elem.style, {
      position: 'fixed',
      top: '50px',
      zIndex: 1e3,
      right: '10px',
      left: Math.min(
        document.querySelector('.container').getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + 'px'
    });
  }

  absolutePos(){
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      left: '',
      zIndex: ''
    });
  }

}
