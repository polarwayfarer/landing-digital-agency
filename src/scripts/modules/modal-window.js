import {isContainerOpened, setBodyOverflowY, setElemShown} from './common.js';
import {contactFields, contactPrivacyCheckbox, resetFieldErrors} from './contact-form.js';

/* Control of modal window occurrence */

const contactButtons = document.querySelectorAll('.contact-button');
const modalContainer = document.querySelector('.body-container__modal-container');
const modalWindow = document.querySelector('.modal-container__modal-window');
const modalBackExitButton = document.querySelector('.modal-container__back-close-button');
const modalSvgExitButton = document.querySelector('.modal-window__svg-button');
const modalExitButtons = [modalBackExitButton, modalSvgExitButton];

const blockBeforeModal = document.querySelector('.block--before-modal');
const blockAfterModal = document.querySelector('.block--after-modal');

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

(function(event) {
  contactButtons.forEach(button => {
    button.addEventListener('click', function() {
      setBodyOverflowY(false);
      setElemShown(modalContainer, true);
      setBodyAriaHidden(true);

      activeBeforeModalOpenedElem = document.activeElement;
      setAriaToOpenModalButton(activeBeforeModalOpenedElem, true);

      setTimeout(() => {
        modalWindow.focus();
      }, 300);

    }, {passive: true});
  });

  modalExitButtons.forEach(button => {
    button.addEventListener('click', function() {
      closeModalWindow();
    }, {passive: true});
  });

  // To focus on the last tabbable element of the modal window, when go from first one
  blockBeforeModal.addEventListener('focus', function() { //not tabbable
    if (!isContainerOpened(modalContainer)) return;

    event.preventDefault();
    modalBackExitButton.focus();

  }, {passive: false, capture: true});

  // To focus on the first tabbable element of the modal window, when go from last one
  blockAfterModal.addEventListener('focus', function() {
    if (!isContainerOpened(modalContainer)) return;

    event.preventDefault();
    modalWindow.focus();

  }, {passive: false, capture: true});

})();

// A workaround for the case:
// While resizing with opened modal window, overflowY of the body sometimes returns to 'auto', when it's not necessary.

window.addEventListener('resize', function() {
  if (!isContainerOpened(modalContainer)) return;

  if (document.body.style.overflowY === 'auto') setBodyOverflowY(false);
}, {passive: true});
