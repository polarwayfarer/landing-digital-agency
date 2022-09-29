import {isContainerOpened, setBodyOverflowY, setElemShown} from './common.js';
import {contactFields, contactPrivacyCheckbox, resetFieldErrors} from './contact-form.js';

/* Control of modal window occurrence */

const contactButtons = document.querySelectorAll('.contact-button');
const modalContainer = document.querySelector('.body-container__modal-container');
const modalWindow = document.querySelector('.modal-container__modal-window');
const modalBackExitButton = document.querySelector('.modal-container__back-close-button');
const modalSvgExitButton = document.querySelector('.modal-window__svg-button');
const modalExitButtons = [modalBackExitButton, modalSvgExitButton];


const firstContactSourceLinkElem = document.querySelector('.modal-container__modal-window .contact-window__links-container .li-item__link');

const bodyChildrenArr = document.body.children;

// Common vars

let activeBeforeModalOpenedElem;

// Common functions

const setBodyAriaHidden = isPermitted => {
  for (let i = 0; i < bodyChildrenArr.length - 1; i++) {
    bodyChildrenArr[i].setAttribute('aria-hidden', isPermitted);
  }
};

const setAriaToOpenModalButton = (button, isItsModalOpened) => {
  button.setAttribute('aria-pressed', isItsModalOpened);
  button.setAttribute('aria-expanded', isItsModalOpened);
};

const closeModalWindow = () => {
  setElemShown(modalContainer, false);
  setBodyAriaHidden(false);
  setBodyOverflowY(true);

  contactFields.forEach(field => resetFieldErrors(field));
  resetFieldErrors(contactPrivacyCheckbox);

  setAriaToOpenModalButton(activeBeforeModalOpenedElem, false);
  activeBeforeModalOpenedElem.focus();
  activeBeforeModalOpenedElem = null;
};

// Add events to modal interactive elements

(function() {
  contactButtons.forEach(button => {
    button.addEventListener('click', function() {
      setBodyOverflowY(false);
      setElemShown(modalContainer, true);
      setBodyAriaHidden(true);

      activeBeforeModalOpenedElem = document.activeElement;
      setAriaToOpenModalButton(activeBeforeModalOpenedElem, true);

      modalSvgExitButton.focus();
    }, {passive: true});
  });

  modalExitButtons.forEach(button => {
    button.addEventListener('click', function() {
      closeModalWindow();
    }, {passive: true});
  });

  modalSvgExitButton.addEventListener('blur', function() {
    if (event.activeElement !== firstContactSourceLinkElem
    && event.activeElement !== activeBeforeModalOpenedElem) {
      event.preventDefault();
      firstContactSourceLinkElem.focus();
    }
  }, {passive: false});

})();

// A workaround for the case:
// While resizing with opened modal window, overflowY of the body sometimes returns to 'auto', when it's not necessary.

window.addEventListener('resize', function() {
  if (!isContainerOpened(modalContainer)) return;

  if (document.body.style.overflowY === 'auto') setBodyOverflowY(false);
}, {passive: true});
