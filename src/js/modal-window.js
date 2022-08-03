import {isContainerOpened, setBodyOverflowY} from "./common.js";
import {contactFields, contactPrivacyAgreement, resetFieldErrors} from "./contact-form.js";

'use strict';

/* Control of modal window occurrence */

let contactButtons = document.querySelectorAll('.contact-button');
let modalContainer = document.querySelector('.body-container__modal-container');
let modalWindow = modalContainer.children[0];
let modalExitButton = modalContainer.children[1];
let contactExitButton = document.querySelector('.modal-window__svg-button');
let contactForm = document.forms.contactForm;

contactButtons.forEach(button => {
  button.addEventListener('click', function() {
    modalContainer.classList.remove('display--none');
    setBodyOverflowY(false);
    contactForm.elements[0].focus();
  }, {passive: true});
});

const closeModalWindow = () => {
  modalContainer.classList.add('display--none');
  setBodyOverflowY(true);
  contactFields.forEach(field => resetFieldErrors(field));
  resetFieldErrors(contactPrivacyAgreement);
};

[modalExitButton, contactExitButton].forEach(button => {
  button.addEventListener('click', closeModalWindow, {passive: true});
});

// A workaround for the case:
// While resizing with opened modal window, overflowY of the body sometimes returns to "auto", when it's not necessary.
window.addEventListener("resize", function() {
  if (!isContainerOpened(modalContainer)) return;

  if (document.body.style.overflowY === "auto") setBodyOverflowY(false);
}, {passive: true});
