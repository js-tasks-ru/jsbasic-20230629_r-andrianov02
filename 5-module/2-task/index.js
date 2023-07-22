function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  let div = document.querySelector('#text');
  button.addEventListener('click', () => {
      div.hidden = !div.hidden;
  });
}
