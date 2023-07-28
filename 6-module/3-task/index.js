import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;

  constructor(slides) {
    this.slides = slides;

    this.elem = this.render();
  }

  get elem() {
    return this._container;
  }

  template(){ 
    return `
    <div class="carousel">
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">` + this.slides.map(value => `
    <div class="carousel__slide" data-id="${value.id}">
    <img src="/assets/images/carousel/${value.image}" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${value.price.toFixed(2)}</span>
      <div class="carousel__title">${value.name}</div>
      <button type="button" class="carousel__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    </div>
  `).join("");
}

  render(){
    this.elem = createElement(this.template());

    this.initCarousel();

    for(let btn of this.elem.querySelectorAll('.carousel__button')){
      btn.addEventListener("click", this.onBtnClick);
    }

    return this.elem;
  }

  onBtnClick = ({target}) => {

    let slide = target.closest('.carousel__slide').dataset;

    let event = new CustomEvent("product-add", {
      detail: slide.id,
      bubbles: true,
    });
    console.log(event.detail);
    this.elem.dispatchEvent(event);
  }

  initCarousel() {

    //buttons
    let leftArrow = this.elem.querySelector('.carousel__arrow_left');
    let rightArrow = this.elem.querySelector('.carousel__arrow_right');

    leftArrow.style.display = 'none';
  
    //img
    let step = 0;

    // Перенес во внуть события(1, 2)
    // let caruselInner = this.elem.querySelector('.carousel__inner');
    // let img = this.elem.querySelectorAll('.carousel__img');
    // let size = img[0].offsetWidth;
    // console.log(size);

    rightArrow.addEventListener('click', () => {
      leftArrow.style.display = '';
      step++;
      // 1
      let caruselInner = this.elem.querySelector('.carousel__inner');
      let img = this.elem.querySelectorAll('.carousel__img');
      let size = img[0].offsetWidth;

      caruselInner.style.transform = 'translateX(' + `${-size * step}px)`;
      if(step == img.length - 1){
        rightArrow.style.display = 'none';
      }
  
    })
    leftArrow.addEventListener('click', () => {
      rightArrow.style.display = '';
      step--;
      // 2
      let caruselInner = this.elem.querySelector('.carousel__inner');
      let img = this.elem.querySelectorAll('.carousel__img');
      let size = img[0].offsetWidth;

      caruselInner.style.transform = 'translateX(' + `${-size * step}px)`;
      if(step == 0){
        leftArrow.style.display = 'none';
      }
  
    })
  }
}
