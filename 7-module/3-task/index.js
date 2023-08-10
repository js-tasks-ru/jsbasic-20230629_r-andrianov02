import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.segment = steps - 1;
    this.render();
    this.fixSliderValue();
  }

  template(){
    return `
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
  }

  render(){
    this.elem = createElement(this.template());
    this.elem.addEventListener('click', this.sliderClick);
    return this.elem;
  }

  sliderClick = (event) => {

    this.elem.querySelectorAll('.slider__steps span')[this.value].classList.remove('slider__step-active')
    
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

    // console.log(this.value);

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
