function initCarousel() {

  //buttons
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let rightArrow = document.querySelector('.carousel__arrow_right');

  leftArrow.style.display = 'none';

  //img
  let step = 0;
  let caruselInner = document.querySelector('.carousel__inner');
  let img = document.querySelectorAll('.carousel__img');

  let size = img[0].offsetWidth;

  
  rightArrow.addEventListener('click', () => {
    leftArrow.style.display = '';
    step++;
    caruselInner.style.transform = 'translateX(' + `${-size * step}px)`;
    if(step == img.length - 1){
      rightArrow.style.display = 'none';
    }

  })
  leftArrow.addEventListener('click', () => {
    rightArrow.style.display = '';
    step--;
    caruselInner.style.transform = 'translateX(' + `${-size * step}px)`;
    if(step == 0){
      leftArrow.style.display = 'none';
    }

  })
}
