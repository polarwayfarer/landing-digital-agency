/* Sections' control of smooth navigation and  IntersectionObserver */

// Common functions

const getId = linkElem => linkElem.getAttribute('href').replace('#', '');

// Control of smooth navigation for navigation elements

const addSmoothNavigation = linksArr => {
  linksArr.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      let currentLinkId = getId(event.currentTarget);

      window.scrollTo({
        top: document.getElementById(currentLinkId).offsetTop - 50,
        behavior: 'smooth'
      });
    }, {passive: false});
  });
}

const headerNavLinks = document.querySelectorAll('.header-container__nav-container a');
const svgLinks = document.querySelectorAll('.svg-link');

addSmoothNavigation(headerNavLinks);
addSmoothNavigation(svgLinks);

// Control of responsive behaviour for header's navigation links

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      headerNavLinks.forEach (link => {
        link.classList.toggle('link--active-tab', getId(link) === entry.target.id);
      });
    }
  });
}, {threshold: 0.5});

const observedSections = document.querySelectorAll('.section--observed');

observedSections.forEach(section => observer.observe(section));
