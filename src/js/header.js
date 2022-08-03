import {isContainerOpened, setBodyOverflowY} from "./common.js";

'use strict';

// Control of header menu occurrence for mobile version

let headerContainer = document.querySelector('.header-container');
let headerNavContainer = document.querySelector('.header-container__nav-container');
let headerNavList = headerNavContainer.children[0];
let headerMenuButton = document.querySelector('.header-container__svg-button');

const screenMax700 = window.matchMedia("(max-width: 700px)");

const isHeaderMenuOpened = () => {
  return isContainerOpened(headerNavContainer)
};

const setMenuButtonAttribs = (button, isMenuOpened) => {
  button.setAttribute('aria-pressed', isMenuOpened);
  button.setAttribute('aria-expanded', isMenuOpened);

  let finLabel = (isMenuOpened) ? "Close" : "Open";
  finLabel += " the navigation list";
  button.setAttribute('aria-label', finLabel);

  let finIconHref = (isMenuOpened) ? "#icon-exit" : "#icon-menu";
  let buttonUse = button.children[0].children[0];
  buttonUse.setAttribute("href", finIconHref);
};

const closeMenu = () => {
  if (!screenMax700.matches) return;

  headerContainer.classList.remove('header-container--menu-opened');
  headerNavContainer.classList.add('display--none');

  if (window.pageYOffset > 50) headerContainer.classList.add('header-container--lesser');

  setMenuButtonAttribs(headerMenuButton, false);
  setBodyOverflowY(true);
};

const toggleHeaderStyle = () => {
  if (screenMax700.matches && isHeaderMenuOpened())
    closeMenu();

  if (screenMax700.matches) {
    headerMenuButton.classList.remove('display--none');
    headerNavContainer.classList.add('display--none');
  } else {
    headerMenuButton.classList.add('display--none');
    headerNavContainer.classList.remove('display--none');
  }
};

window.addEventListener("resize", toggleHeaderStyle, {passive: true});
toggleHeaderStyle();

headerNavList.childNodes.forEach( elem => {
  elem.addEventListener("click", closeMenu, {passive: true});
});

headerMenuButton.addEventListener('click', function() {
  headerContainer.classList.toggle('header-container--menu-opened');
  headerNavContainer.classList.toggle('display--none');

  headerContainer.classList.toggle('header-container--lesser',
    !isHeaderMenuOpened() && window.pageYOffset > 50
  );

  setMenuButtonAttribs(this, isHeaderMenuOpened());
  setBodyOverflowY(!isHeaderMenuOpened());

}, {passive: true});

// Control of header menu style on scroll

window.addEventListener('scroll', function() {
  let scrollHeightPos = window.pageYOffset;

  headerContainer.classList.toggle('header-container--normal', scrollHeightPos <= 50);
  headerContainer.classList.toggle('header-container--lesser', scrollHeightPos > 50);
}, {passive: true});

if (window.pageYOffset > 50) headerContainer.classList.add('header-container--lesser');
