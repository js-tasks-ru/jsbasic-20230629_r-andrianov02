import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;
  constructor() {
    this.isOpen = false;
    this.title = '';
    this.node = '';
    this.elem = this.render();
    this.escape = this.pressEscape.bind(this);
  }

  template(){
    return `
    <!--Корневой элемент Modal-->
    <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
  
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
  
    </div>
    `
  }

  render(){

    this.elem = createElement(this.template());

    return this.elem;
  }

  open(){

    if(this.isOpen) return;

    console.log('open');
    this.isOpen = true;

    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    let btn = document.body.querySelector('.modal__close');
    btn.addEventListener('click', this.close.bind(this));

    document.body.addEventListener('keydown', this.escape);

  }

  setTitle(title){
    this.title = title;
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.innerHTML = this.title;
  }

  setBody(node){
    this.node = node;
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(this.node);
  }

  close(){

    this.isOpen = false;
    console.log('close');
    document.body.classList.remove('is-modal-open');
    document.body.lastElementChild.remove();
    document.body.removeEventListener('keydown', this.escape);

  }

  pressEscape(event){
    if(event.code === 'Escape'){
      console.log('Escape');
      this.close();
    }
  }

}