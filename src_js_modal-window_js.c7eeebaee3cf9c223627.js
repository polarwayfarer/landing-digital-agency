"use strict";
(self["webpackChunkfrom_figma_digital_agency"] = self["webpackChunkfrom_figma_digital_agency"] || []).push([["src_js_modal-window_js"],{

/***/ "./src/js/check-validity.js":
/*!**********************************!*\
  !*** ./src/js/check-validity.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isValid": function() { return /* binding */ isValid; },
/* harmony export */   "manageKeydown": function() { return /* binding */ manageKeydown; }
/* harmony export */ });


var isValid = function isValid(inputTypeStr, inputValue) {
  var regExpPrecept;

  switch (inputTypeStr) {
    case 'name':
      regExpPrecept = /(^[a-zA-Zа-яА-Я]([a-zA-Zа-яА-Я\s\'\ʼ\-\.]{0,63})[a-zA-Zа-яА-Я]$)/;
      break;

    case 'email':
      regExpPrecept = /^[a-zA-Z0-9]([\w\.\-]{0,62})[a-zA-Z0-9]@[a-z0-9]([\w\.\-]{1,62})\.([a-z]{2,8})$/;
      break;
  }

  return regExpPrecept.test(inputValue);
};
var manageKeydown = function manageKeydown(inputTypeStr) {
  var regExpLetters;

  switch (inputTypeStr) {
    case 'name':
      regExpLetters = /[a-zA-Zа-яА-Я\s\'\ʼ\-\.]/;
      break;

    case 'email':
      regExpLetters = /[\w\-\.\@]/;
      break;
  }

  if (!event.key.match(regExpLetters) && event.code !== 'ArrowRight' && event.code !== 'ArrowLeft' && event.code !== 'Backspace' && event.code !== 'Delete') event.preventDefault();
};

/***/ }),

/***/ "./src/js/common.js":
/*!**************************!*\
  !*** ./src/js/common.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isContainerOpened": function() { return /* binding */ isContainerOpened; },
/* harmony export */   "setBodyOverflowY": function() { return /* binding */ setBodyOverflowY; }
/* harmony export */ });
 // Common functions

var isContainerOpened = function isContainerOpened(elem) {
  return !elem.classList.contains('display--none');
};
var setBodyOverflowY = function setBodyOverflowY(isPermitted) {
  document.body.style.overflowY = isPermitted ? 'auto' : 'hidden';
};

/***/ }),

/***/ "./src/js/contact-form.js":
/*!********************************!*\
  !*** ./src/js/contact-form.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contactFields": function() { return /* binding */ contactFields; },
/* harmony export */   "contactPrivacyAgreement": function() { return /* binding */ contactPrivacyAgreement; },
/* harmony export */   "resetFieldErrors": function() { return /* binding */ resetFieldErrors; }
/* harmony export */ });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./src/js/common.js");
/* harmony import */ var _check_validity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check-validity.js */ "./src/js/check-validity.js");


'use strict'; // Control of Form inputs and submit


var contactForm = document.forms.contactForm;
var contactName = contactForm.name;
var contactEmail = contactForm.email;
var contactMessage = contactForm.message;
var contactSubmitButton = contactForm.submit;
var contactMessageInfo = document.querySelector('#contactMessageInfo');
var contactPrivacyAgreement = contactForm.privacyAgreement;
var contactFields = [contactName, contactEmail, contactMessage]; // Assign a counter for textarea 'Message'

var assignMessageLength = function assignMessageLength(textField) {
  contactMessageInfo.innerHTML = "Characters: ".concat(textField.value.length, " of ").concat(textField.getAttribute('maxlength'));
};

contactMessage.addEventListener('input', function () {
  assignMessageLength(this);
}, {
  passive: true
});
assignMessageLength(contactMessage); // Add hidden error blocks to every field

var addErrorInfoBlock = function addErrorInfoBlock(field) {
  var pElem = document.createElement('p');
  pElem.classList.add('partition__error-info', 'error-info', 'display--none');
  if (field.getAttribute('type') === 'checkbox') pElem.classList.add('error-info--checkbox');
  pElem.id = "".concat(field.id, "ErrorInfo");
  pElem.setAttribute('tabindex', '-1');
  field.parentElement.append(pElem);
};

(function () {
  contactFields.forEach(function (field) {
    return addErrorInfoBlock(field);
  });
  addErrorInfoBlock(contactPrivacyAgreement);
})(); // Functions: assign an error to a field and reset all error fields


var assignErrorMessage = function assignErrorMessage(field, errorStatus) {
  var pElem = field.parentElement.lastElementChild;
  var errorText = '';

  switch (errorStatus) {
    case 'empty':
      errorText = 'Field can\'t be empty';
      break;

    case 'not-valid--name':
      errorText = "Name field isn't valid.<br />E.g.: Mr. d'Artagnan Doe-Louis";
      break;

    case 'not-valid--email':
      errorText = "Email field isn't valid.<br />E.g.: my.company-123@mail.com";
      break;

    case 'name--not-enough':
      errorText = "Field shouldn`t be less than 2 characters";
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
  field.setAttribute('aria-labelledby', "".concat(field.id, "Label ").concat(pElem.id));
  field.classList.add('field--error');
};

var resetFieldErrors = function resetFieldErrors(field) {
  if (field.classList.contains('field--error')) {
    var errorInfoElem;
    errorInfoElem = field.parentElement.lastElementChild;
    errorInfoElem.classList.add('display--none');
    field.classList.remove('field--error');
    field.setAttribute('aria-labelledby', "".concat(field.id, "Label"));
  }
}; // Function expressions to check fields of needed types

var checkEmptyInput = function checkEmptyInput(field) {
  if (field.value.length === 0) assignErrorMessage(field, 'empty');
};

var checkField = function checkField(field, type) {
  if (field.value.length === 1) {
    assignErrorMessage(field, "name--not-enough");
  } else if (field.value.length > 1 && !(0,_check_validity_js__WEBPACK_IMPORTED_MODULE_1__.isValid)(type, field.value)) {
    assignErrorMessage(field, "not-valid--".concat(type));
  }
};

var checkText = function checkText(field) {
  if (field.value.length !== 0 && field.value.length < 50) {
    assignErrorMessage(field, 'text--not-enough');
  } else if (field.value.length > 1000) {
    assignErrorMessage(field, 'text--too-much');
  }
};

var checkCheckbox = function checkCheckbox(field) {
  if (!field.checked) assignErrorMessage(field, 'unchecked');
}; // Assign functions to check fields


contactFields.forEach(function (field) {
  field.addEventListener('input', function () {
    resetFieldErrors(field);
  }, {
    passive: true
  });
});
contactPrivacyAgreement.addEventListener('change', function () {
  resetFieldErrors(this);
}, {
  passive: true
});
contactName.addEventListener('blur', function () {
  checkField(contactName, 'name');
}, {
  passive: true
});
contactEmail.addEventListener('blur', function () {
  checkField(contactEmail, 'email');
}, {
  passive: true
});
contactMessage.addEventListener('blur', function () {
  checkText(contactMessage);
}, {
  passive: true
}); // Check all fields before submitting and assign a mailto action to the form

var checkAllContactFields = function checkAllContactFields() {
  contactFields.forEach(function (field) {
    return checkEmptyInput(field);
  });
  checkCheckbox(contactPrivacyAgreement);
  checkField(contactName, 'name');
  checkField(contactEmail, 'email');
  checkText(contactMessage);

  if (!contactPrivacyAgreement.checked) {
    contactPrivacyAgreement.focus();
    event.preventDefault();
  }

  for (var i = 0; i < contactFields.length; i++) {
    if (contactFields[i].classList.contains('field--error')) {
      contactFields[i].focus();
      event.preventDefault();
      return;
    }
  }
};

contactForm.addEventListener('submit', function () {
  checkAllContactFields();
  contactForm.setAttribute('action', 'https://formspree.io/f/mzbwpyjp');
}, {
  passive: false
}); // Manage keydown for name and email input fields

contactName.addEventListener('keydown', function () {
  (0,_check_validity_js__WEBPACK_IMPORTED_MODULE_1__.manageKeydown)('name');
}, {
  passive: false
});
contactEmail.addEventListener('keydown', function () {
  (0,_check_validity_js__WEBPACK_IMPORTED_MODULE_1__.manageKeydown)('email');
}, {
  passive: false
}); // Add style to focused checkbox container

var checkboxInputs = document.querySelectorAll('.checkbox-input');
checkboxInputs.forEach(function (input) {
  var checkboxContainer = input.parentElement;
  input.addEventListener('focus', function () {
    checkboxContainer.classList.add('checkbox-container--focused');
  }, {
    passive: true
  });
  input.addEventListener('blur', function () {
    checkboxContainer.classList.remove('checkbox-container--focused');
  }, {
    passive: true
  });
});

/***/ }),

/***/ "./src/js/modal-window.js":
/*!********************************!*\
  !*** ./src/js/modal-window.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./src/js/common.js");
/* harmony import */ var _contact_form_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact-form.js */ "./src/js/contact-form.js");


'use strict';
/* Control of modal window occurrence */


var contactButtons = document.querySelectorAll('.contact-button');
var modalContainer = document.querySelector('.body-container__modal-container');
var modalWindow = modalContainer.children[0];
var modalExitButton = modalContainer.children[1];
var contactExitButton = document.querySelector('.modal-window__svg-button');
contactButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    modalContainer.classList.remove('display--none');
    (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.setBodyOverflowY)(false);
  }, {
    passive: true
  });
});

var closeModalWindow = function closeModalWindow() {
  modalContainer.classList.add('display--none');
  (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.setBodyOverflowY)(true);
  _contact_form_js__WEBPACK_IMPORTED_MODULE_1__.contactFields.forEach(function (field) {
    return (0,_contact_form_js__WEBPACK_IMPORTED_MODULE_1__.resetFieldErrors)(field);
  });
  (0,_contact_form_js__WEBPACK_IMPORTED_MODULE_1__.resetFieldErrors)(_contact_form_js__WEBPACK_IMPORTED_MODULE_1__.contactPrivacyAgreement);
};

[modalExitButton, contactExitButton].forEach(function (button) {
  button.addEventListener('click', closeModalWindow, {
    passive: true
  });
}); // A workaround for the case:
// While resizing with opened modal window, overflowY of the body sometimes returns to 'auto', when it's not necessary.

window.addEventListener('resize', function () {
  if (!(0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isContainerOpened)(modalContainer)) return;
  if (document.body.style.overflowY === 'auto') (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.setBodyOverflowY)(false);
}, {
  passive: true
});

/***/ })

}]);
//# sourceMappingURL=src_js_modal-window_js.c7eeebaee3cf9c223627.js.map