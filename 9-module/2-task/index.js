import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    //Carousel
    let carousel = this.carousel();

    //RibbonMenu
    let ribbonMenu = this.ribbonMenu();

    // StepSlider
    let stepSlider = this.stepSlider();

    // CartIcon
    let cartIcon = new CartIcon();
    let cartIconElement = document.querySelector('[data-cart-icon-holder]');

    cartIconElement.append(cartIcon.elem);
    // data-cart-icon-holder

    // Cart
    let cart = new Cart(cartIcon);

    // Показ списка товаров
    const url = 'products.json';
    let response = await fetch(url);
    let commits = await response.json();

    let productsGrid = new ProductsGrid(commits);
    let productsGridElement = document.querySelector('[data-products-grid-holder]');

    productsGridElement.innerHTML = '';
    productsGridElement.append(productsGrid.elem);
    // data-products-grid-holder

    // Фильтрация
    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', ({ detail: productId }) => {
      let product = commits.find((product) => product.id === productId);
      cart.addProduct(product);
    });

    stepSlider.elem.addEventListener('slider-change', ({ detail: value }) => {
      productsGrid.updateFilter({
        maxSpiciness: value,
      });
    });

    ribbonMenu.elem.addEventListener('ribbon-select', ({ detail: categoryId }) => {
      productsGrid.updateFilter({
        category: categoryId,
      });
    });

    let nuts = document.getElementById('nuts-checkbox');
    nuts.addEventListener('change', () => {
      productsGrid.updateFilter({
        noNuts: nuts.checked // новое значение чекбокса
      });
    });

    let vegeterian = document.getElementById('vegeterian-checkbox');
    vegeterian.addEventListener('change', () => {
      productsGrid.updateFilter({
        vegeterianOnly: vegeterian.checked // новое значение чекбокса
      });
    });
  }

  carousel(){
    let carousel = new Carousel(slides);
    let containerElement = document.querySelector('[data-carousel-holder]');

    containerElement.append(carousel.elem);
    // data-carousel-holder
    return carousel;
  }

  ribbonMenu(){
    let ribbonMenu = new RibbonMenu(categories);
    let ribbonMenuElement = document.querySelector('[data-ribbon-holder]');
    
    ribbonMenuElement.append(ribbonMenu.elem);
    // data-ribbon-holder
    return ribbonMenu;
  }

  stepSlider(){
    let stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    let stepSliderElement = document.querySelector('[data-slider-holder]');
    
    stepSliderElement.append(stepSlider.elem);
    // data-slider-holder
    return stepSlider;
  }
}
