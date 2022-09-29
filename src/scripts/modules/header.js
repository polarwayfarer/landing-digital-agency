import {isContainerOpened, setBodyOverflowY, setElemShown} from './common.js';

/* Control of header's menu occurrence for mobile version */

const headerContainer = document.querySelector('.header-container');
const headerNavContainer = document.querySelector('.header-container__nav-container');
const headerNavListLinks = document.querySelectorAll('.header-container__nav-container .link');
const headerMenuButton = document.querySelector('.header-container__svg-button');

const screenMax700 = window.matchMedia('(max-width: 700px)');

const isHeaderMenuOpened = () => {
  return isContainerOpened(headerNavContainer)
};

const setMenuButtonAttribs = (button, isMenuOpened) => {
  button.setAttribute('aria-pressed', isMenuOpened);
  button.setAttribute('aria-expanded', isMenuOpened);

  let finLabel = (isMenuOpened) ? 'Close' : 'Open';
  finLabel += ' the navigation list';
  button.setAttribute('aria-label', finLabel);

  let finIconHref = (isMenuOpened) ? '#icon-exit' : '#icon-menu';
  let buttonUse = button.children[0].children[0];
  buttonUse.setAttribute('href', finIconHref);
};

const closeMenu = () => {
  if (!screenMax700.matches) return;

  headerContainer.classList.remove('header-container--menu-opened');
  setElemShown(headerNavContainer, false);

  if (window.pageYOffset > 50) headerContainer.classList.add('header-container--lesser');

  setMenuButtonAttribs(headerMenuButton, false);
  setBodyOverflowY(true);
};

const toggleHeaderStyle = () => {
  if (screenMax700.matches && isHeaderMenuOpened())
    closeMenu();

  if (screenMax700.matches) {
    setElemShown(headerMenuButton, true);
    setElemShown(headerNavContainer, false);
  } else {
    setElemShown(headerMenuButton, false);
    setElemShown(headerNavContainer, true);
  }
};

window.addEventListener('resize', toggleHeaderStyle, {passive: true});
toggleHeaderStyle();

headerNavListLinks.forEach( elem => {
  elem.addEventListener('click', closeMenu, {passive: true});
});

headerMenuButton.addEventListener('click', function() {
  headerContainer.classList.toggle('header-container--menu-opened');

  if (headerContainer.classList.contains('header-container--menu-opened')) {
    setElemShown(headerNavContainer, true);
  } else {
    setElemShown(headerNavContainer, false);
  }

  headerContainer.classList.toggle('header-container--lesser',
    !isHeaderMenuOpened() && window.pageYOffset > 50
  );

  setMenuButtonAttribs(this, isHeaderMenuOpened());
  setBodyOverflowY(!isHeaderMenuOpened());
}, {passive: true});

// Control of header's menu style on scroll

window.addEventListener('scroll', function() {
  let scrollHeightPos = window.pageYOffset;

  headerContainer.classList.toggle('header-container--normal', scrollHeightPos <= 50);
  headerContainer.classList.toggle('header-container--lesser', scrollHeightPos > 50);
}, {passive: true});

if (window.pageYOffset > 50) headerContainer.classList.add('header-container--lesser');
