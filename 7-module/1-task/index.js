import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;

  constructor(categories) {
    this.categories = categories;
    
    this.elem = this.render();
  };

  get elem() {
    return this.elem;
  };

  template(){
    return `
    <!--Корневой элемент RibbonMenu-->
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
  
      <!--Ссылки на категории-->
      <nav class="ribbon__inner">` + this.categories.map(value => `
        <a href="#" class="ribbon__item" data-id="${value.id}">${value.name}</a>
        `).join("") + `
      </nav>
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `
  };

  render(){

    this.elem = createElement(this.template());
    for(let aBtn of this.elem.querySelectorAll('.ribbon__item')){
      aBtn.addEventListener('click', this.onClick);
    }
    this.onBtnClick();

    return this.elem;
  };

  // Подсветка элемента!

  onClick = (event) => {

    event.preventDefault();

    this.elem.addEventListener('click', this.navClick);

  };

  navClick = ({target}) => {

    if(target.tagName != 'A') return;

    if(this.selectedA){
      this.selectedA.classList.remove('ribbon__item_active')
    }

    this.selectedA = target;
    this.selectedA.classList.add('ribbon__item_active');

    let category = target.dataset;

    let event = new CustomEvent('ribbon-select', { // имя события должно быть именно 'ribbon-select'
      detail: category.id, // уникальный идентификатора категории из её объекта
      bubbles: true // это событие всплывает - это понадобится в дальнейшем
    });
    // console.log(category.id);
    this.elem.dispatchEvent(event);
  };

  onBtnClick(){
    
    let ribbonInner = this.elem.querySelector('.ribbon__inner');

    let leftBtn = this.elem.querySelector('.ribbon__arrow_left');
    let rightBtn = this.elem.querySelector('.ribbon__arrow_right');

    leftBtn.classList.toggle('ribbon__arrow_visible');
    rightBtn.classList.toggle('ribbon__arrow_visible');

    // Событие на кнопки!

    leftBtn.addEventListener('click', () => {

      ribbonInner.scrollBy(-350, 0);

    });

    ribbonInner.addEventListener('scroll', () => {
      rightBtn.classList.add('ribbon__arrow_visible');

      let scrollLeft = ribbonInner.scrollLeft;
      // console.log(scrollLeft);

      if(scrollLeft == 0){
        leftBtn.classList.remove('ribbon__arrow_visible');
      }
    });
    


    rightBtn.addEventListener('click', () => {

      leftBtn.classList.add('ribbon__arrow_visible');
      ribbonInner.scrollBy(350, 0);

    });

    ribbonInner.addEventListener('scroll', () => {

      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      // console.log(scrollRight);

      if(scrollRight < 0){
        rightBtn.classList.remove('ribbon__arrow_visible');
      }
    });
    

  };

}
