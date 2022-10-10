/* Add animation on page's first load */

const body = document.body;
const pageOnLoadContainer = document.querySelector('.page-on-load-container');

body.style.overflowY = 'hidden';
window.addEventListener('load', pageOnLoad, {passive: true});

function pageOnLoad() {
  if (window.scrollTop !== 0) window.scrollTo(0, 0);

  setTimeout(() => {
    pageOnLoadContainer.classList.add('page-on-load-container--fade-out');
  }, 3500);

  setTimeout(() => {
    pageOnLoadContainer.remove();
    window.removeEventListener('load', pageOnLoad, {passive: true});
    body.style.overflowY = 'auto';
  }, 4500);
}
