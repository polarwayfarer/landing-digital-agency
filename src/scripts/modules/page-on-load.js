const body = document.body;
const pageOnLoadContainer = document.querySelector('.page-on-load-container');

window.addEventListener('load', pageOnLoad, {passive: true});

function pageOnLoad() {
  setTimeout(() => {
    pageOnLoadContainer.classList.add('page-on-load-container--fade-out');
  }, 3500);

  setTimeout(() => {
    pageOnLoadContainer.remove();
    window.removeEventListener('load', pageOnLoad, {passive: true});
  }, 4500);
}
