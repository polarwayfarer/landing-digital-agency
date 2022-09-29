import {isMobileDevice, setElemShown} from './common.js';
import {isValid, manageKeydown} from './check-validity.js';

/* Control of Form inputs and submit */

const contactForm = document.forms.contactForm;
const contactName = contactForm.name;
const contactEmail = contactForm.email;
const contactMessage = contactForm.message;
const contactMessageLengthInfoP = document.querySelector('#contactMessageLengthInfoP');

const contactSubmitButton = contactForm.submit;

export const contactPrivacyCheckbox = contactForm.privacyAgreement;
export const contactFields = [contactName, contactEmail, contactMessage];

// Common functions

const getErrorInfoElem = field => {
  return field.parentElement.lastElementChild;
}

// Assign a counter for textarea 'Message'

const assignMessageLength = textField => {
  contactMessageLengthInfoP.innerHTML = `Characters: ${textField.value.length} of ${textField.getAttribute('maxlength')}`;
};

contactMessage.addEventListener('input', function() {
  assignMessageLength(this);
}, {passive: true});
assignMessageLength(contactMessage);

// Add hidden error blocks to every field

const addErrorInfoBlock = field => {
  let pElem = document.createElement('p');
  pElem.classList.add('partition-container__p-item', 'p-item', 'p-item--error');
  setElemShown(pElem, false);

  if (field.getAttribute('type') === 'checkbox') pElem.classList.add('p-item--error-checkbox');

  pElem.id = `${field.id}ErrorInfo`;

  field.parentElement.append(pElem);
};

(function() {
  contactFields.forEach(field => addErrorInfoBlock(field));
  addErrorInfoBlock(contactPrivacyCheckbox);
})();

// Functions: assign an error to a field and reset all error fields

const assignErrorMessage = (field, errorStatus) => {
  let errorInfoElem = getErrorInfoElem(field);
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
    case 'not-enough--name':
    case 'not-enough--email':
      errorText = `Field shouldn\`t be less than 2 characters`;
      break;
    case 'not-enough--text':
      errorText = 'Field shouldn\`t be less than 50 characters';
      break;
    case 'too-much--text':
      errorText = 'Field shouldn\`t be more than 500 characters';
      break;
    case 'unchecked':
      errorText = 'Field should be checked. Read the Agreement before confirmation';
      break;
  }

  errorInfoElem.innerHTML = errorText;
  setElemShown(errorInfoElem, true);

  field.setAttribute('aria-describedby', `${errorInfoElem.id}ErrorInfo`);
  field.classList.add('input--error');
};

export const resetFieldErrors = field => {
  if (field.classList.contains('input--error')) {
    let errorInfoElem = getErrorInfoElem(field);
    setElemShown(errorInfoElem, false);

    field.classList.remove('input--error');
    field.removeAttribute('aria-describedby');

    if (field.classList.contains('p-item--privacy')) field.setAttribute('aria-describedby', `${field.id}Info`);
  }
};

// Function expressions to check fields of needed types

const checkEmptyInput = field => {
  if (field.value.length === 0) assignErrorMessage(field, 'empty');
};

const checkField = (field, type) => {
  field.value = field.value.trim();

  if (type !== 'text' && field.value.length === 1
  || type === 'text' && field.value.length !== 0 && field.value.length < 50) {
    assignErrorMessage(field, `not-enough--${type}`);
  } else if (type === 'text' && field.value.length > 1000) {
    assignErrorMessage(field, 'too-much--text');
  } else if (type !== 'text' && field.value.length !== 0 && !isValid(type, field.value)) {
    assignErrorMessage(field, `not-valid--${type}`);
  }
};

const checkCheckbox = field => {
  if (!field.checked) assignErrorMessage(field, 'unchecked');
};

// Assign functions to check fields

(function() {
  contactFields.forEach(field => {
    field.addEventListener('input', function() {
      resetFieldErrors(field);
    }, {passive: true});
  });
  contactPrivacyCheckbox.addEventListener('change', function() {
    resetFieldErrors(this);
  }, {passive: true});

  contactName.addEventListener('blur', function() {
    checkField(contactName, 'name');
  }, {passive: true});
  contactEmail.addEventListener('blur', function() {
    checkField(contactEmail, 'email');
  }, {passive: true});
  contactMessage.addEventListener('blur', function() {
    checkField(contactMessage, 'text');
  }, {passive: true});
})();

// Check all fields before submitting and assign a mailto action to the form

const checkAllContactFields = () => {
  contactFields.forEach(field => checkEmptyInput(field));

  checkCheckbox(contactPrivacyCheckbox);
  checkField(contactName, 'name');
  checkField(contactEmail, 'email');
  checkField(contactMessage, 'text');

  for (let i = 0; i < contactFields.length; i++) {
    if (contactFields[i].classList.contains('input--error')) {
      if (!isMobileDevice) contactFields[i].focus();

      event.preventDefault();
      return;
    }
  }

  if (!contactPrivacyCheckbox.checked) {
    if (!isMobileDevice) contactPrivacyCheckbox.focus();
    event.preventDefault();
  }
};

(function() {
  contactForm.addEventListener('submit', checkAllContactFields, {passive: false});
})();

// Manage keydown for name and email input fields

(function() {
  contactName.addEventListener('keydown', function() {
    manageKeydown('name');
  }, {passive: false});
  contactEmail.addEventListener('keydown', function() {
    manageKeydown('email');
  }, {passive: false});
})();

// Add style to focused checkbox container

const checkboxInputs = document.querySelectorAll('.checkbox-input');

checkboxInputs.forEach(input => {
  let checkboxContainer = input.parentElement;

  input.addEventListener('focus', function() {
    checkboxContainer.classList.add('checkbox-container--focused');
  }, {passive: true});
  input.addEventListener('blur', function() {
    checkboxContainer.classList.remove('checkbox-container--focused');
  }, {passive: true});
});
