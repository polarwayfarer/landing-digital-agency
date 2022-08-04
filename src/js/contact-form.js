import {isContainerOpened} from './common.js';
import {isValid, manageKeydown} from './check-validity.js';

'use strict';

// Control of Form inputs and submit

let contactForm = document.forms.contactForm;
let contactName = contactForm.name;
let contactEmail = contactForm.email;
let contactMessage = contactForm.message;
let contactSubmitButton = contactForm.submit;
let contactMessageInfo = document.querySelector('#contactMessageInfo');

export const contactPrivacyAgreement = contactForm.privacyAgreement;
export const contactFields = [contactName, contactEmail, contactMessage];

// Assign a counter for textarea 'Message'

const assignMessageLength = textField => {
  contactMessageInfo.innerHTML = `Characters: ${textField.value.length} of ${textField.getAttribute('maxlength')}`;
};

contactMessage.addEventListener('input', function() {
  assignMessageLength(this);
}, {passive: true});
assignMessageLength(contactMessage);

// Add hidden error blocks to every field

const addErrorInfoBlock = field => {
  let pElem = document.createElement('p');
  pElem.classList.add('partition__error-info', 'error-info', 'display--none');
  if (field.getAttribute('type') === 'checkbox') pElem.classList.add('error-info--checkbox');
  pElem.id = `${field.id}ErrorInfo`;
  pElem.setAttribute('tabindex', '-1');

  field.parentElement.append(pElem);
};

(function() {
  contactFields.forEach(field => addErrorInfoBlock(field));
  addErrorInfoBlock(contactPrivacyAgreement);
})();

// Functions: assign an error to a field and reset all error fields

const assignErrorMessage = (field, errorStatus) => {
  let pElem = field.parentElement.lastElementChild;
  let errorText = '';

  switch (errorStatus) {
    case 'empty':
      errorText = 'Field can\'t be empty';
      break;
    case 'not-valid--name':
      errorText = `Name field isn\'t valid.<br />E.g.: Mr. d'Artagnan Doe-Louis`;
      break;
    case 'not-valid--email':
      errorText = `Email field isn\'t valid.<br />E.g.: my.company-123@mail.com`;
      break;
    case 'name--not-enough':
      errorText = `Field shouldn\`t be less than 2 characters`;
      break;
    case 'text--not-enough':
      errorText = 'Field shouldn\`t be less than 50 characters';
      break;
    case 'text--too-much':
      errorText = 'Field shouldn\`t be more than 500 characters';
      break;
    case 'unchecked':
      errorText = 'Field should be checked. Read the Agreement before confirmation';
      break;
  }

  pElem.innerHTML = errorText;
  pElem.classList.remove('display--none');

  field.setAttribute('aria-labelledby', `${field.id}Label ${pElem.id}`);
  field.classList.add('field--error');
};

export const resetFieldErrors = field => {
  if (field.classList.contains('field--error')) {
    let errorInfoElem;

    errorInfoElem = field.parentElement.lastElementChild;
    errorInfoElem.classList.add('display--none');

    field.classList.remove('field--error');
    field.setAttribute('aria-labelledby', `${field.id}Label`);
  }
};

// Function expressions to check fields of needed types

const checkEmptyInput = field => {
  if (field.value.length === 0) assignErrorMessage(field, 'empty');
};

const checkField = (field, type) => {
  if (field.value.length === 1) {
    assignErrorMessage(field, `name--not-enough`);
  } else if (field.value.length > 1 && !isValid(type, field.value)) {
    assignErrorMessage(field, `not-valid--${type}`);
  }
};

const checkText = field => {
  if (field.value.length !== 0 && field.value.length < 50) {
    assignErrorMessage(field, 'text--not-enough');
  } else if (field.value.length > 1000) {
    assignErrorMessage(field, 'text--too-much');
  }
};

const checkCheckbox = field => {
  if (!field.checked) assignErrorMessage(field, 'unchecked');
};

// Assign functions to check fields

contactFields.forEach(field => {
  field.addEventListener('input', function() {resetFieldErrors(field)}, {passive: true});
});
contactPrivacyAgreement.addEventListener('change', function() {resetFieldErrors(this)}, {passive: true});

contactName.addEventListener('blur', function() {checkField(contactName, 'name')}, {passive: true});
contactEmail.addEventListener('blur', function() {checkField(contactEmail, 'email')}, {passive: true});
contactMessage.addEventListener('blur', function() {checkText(contactMessage)}, {passive: true});

// Check all fields before submitting and assign a mailto action to the form

const checkAllContactFields = () => {
  contactFields.forEach(field => checkEmptyInput(field));

  checkCheckbox(contactPrivacyAgreement);
  checkField(contactName, 'name');
  checkField(contactEmail, 'email');
  checkText(contactMessage);

  if (!contactPrivacyAgreement.checked) {
    contactPrivacyAgreement.focus();
    event.preventDefault();
  }

  for (let i = 0; i < contactFields.length; i++) {
    if (contactFields[i].classList.contains('field--error')) {
      contactFields[i].focus();
      event.preventDefault();
      return;
    }
  }
};

const replaceSpaces = (str) => str.replace(/\s/g, '%20');

const assignMailtoText = () => {
  let formData = new FormData(contactForm);

  let mailtoAddress = "mailto:yankaincode@gmail.com";
  let mailtoSubject = "Keep in touch | Project 'From Figma: Digital Agency' by Yanka_InCode";
  let mailtoBody = formData.get('message');
  let mailtoName = formData.get('name');
  let mailtoEmail = formData.get('email');

  mailtoName = replaceSpaces(mailtoName);
  mailtoBody = replaceSpaces(mailtoBody);

  return mailtoAddress + "?subject=" + mailtoSubject
    + "&body=Greetings.%0A%0A" + mailtoBody
    + "%0A%0AСontact person:%20" + mailtoName
    + "%0AE-mail:%20" + mailtoEmail;
};

contactForm.addEventListener('submit', function() {
  checkAllContactFields();
  contactForm.action = assignMailtoText();
}, {passive: false});

// Manage keydown for name and email input fields

contactName.addEventListener('keydown', function() {
  manageKeydown('name');
}, {passive: false});
contactEmail.addEventListener('keydown', function() {
  manageKeydown('email');
}, {passive: false});

// Add style to focused checkbox container

let checkboxInputs = document.querySelectorAll('.checkbox-input');

checkboxInputs.forEach(input => {
  let checkboxContainer = input.parentElement;

  input.addEventListener('focus', function() {
    checkboxContainer.classList.add('checkbox-container--focused');
  }, {passive: true});
  input.addEventListener('blur', function() {
    checkboxContainer.classList.remove('checkbox-container--focused');
  }, {passive: true});
});
