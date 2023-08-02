export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segment = steps - 1;
    this.elem = this.template();
    
    this.render();
    this.fixSliderValue();
  }

  template(){
    let div = `
    <div class="slider">
  
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value"></span>
      </div>
  
      <div class="slider__progress" style="width: 50%;"></div>
  
      <div class="slider__steps"> 
      ${"<span></span>".repeat(this.steps)}
      </div>
    </div>
  `;
  let html = document.createElement("div");
  html.innerHTML = div;
  return html.firstElementChild;
  }

  render(){
    this.elem.addEventListener('click', this.sliderClick);

    let thumb = this.elem.querySelector('.slider__thumb');
    
    thumb.addEventListener('pointerdown', this.thunbDown);

    thumb.ondragstart = () => false;

  }

  thunbDown = (event) => {
    event.preventDefault();

    document.addEventListener('pointermove', this.thunbMove);
    document.addEventListener('pointerup', this.thunbUp);
    this.elem.classList.add('slider_dragging');
  }

  thunbMove = (event) => {

    this.elem.querySelectorAll('.slider__steps span')[this.value].classList.remove('slider__step-active');

    let thumb = this.elem.querySelector('.slider__thumb');
    
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let approximateValue = leftRelative * this.segment;
    let value = Math.round(approximateValue);

    this.value = value;

    // Запись нового значения внутрь элемента с классом `slider__value`.
    this.elem.querySelector('.slider__value').innerHTML = this.value;

    // Визуально выделить шаг на слайдере
    this.elem.querySelectorAll('.slider__steps span')[this.value].classList.add('slider__step-active');

  }

  thunbUp = () => {
    
    document.removeEventListener('pointermove', this.thunbMove);
    document.removeEventListener('pointerup', this.thunbUp);
    this.elem.classList.remove('slider_dragging');

    this.elem.dispatchEvent(new CustomEvent("slider-change",{
      detail: this.value,
      bubbles: true
    }));

  }

  sliderClick = (event) => {

    this.elem.querySelectorAll('.slider__steps span')[this.value].classList.remove('slider__step-active');
    
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * this.segment;
    let value = Math.round(approximateValue);
    let valuePercents = value / this.segment * 100;

    this.value = value;

    this.fixSliderValue(valuePercents);

    this.elem.dispatchEvent(new CustomEvent("slider-change",{
      detail: this.value,
      bubbles: true
    }));

    // console.log(left);
    // console.log(leftRelative);
    // console.log(approximateValue);
    // console.log(value);
    // console.log(valuePercents);
  }

  fixSliderValue(leftPercents = (this.value / this.segment * 100)){

    // Запись нового значения внутрь элемента с классом `slider__value`.
    this.elem.querySelector('.slider__value').innerHTML = this.value;

    // Визуально выделить шаг на слайдере
    this.elem.querySelectorAll('.slider__steps span')[this.value].classList.add('slider__step-active');

    // Поменять положение ползунка
    this.elem.querySelector('.slider__thumb').style.left = `${leftPercents}%`;

    // Расширить закрашеную область до ползунка
    this.elem.querySelector('.slider__progress').style.width = `${leftPercents}%`

  }
}
