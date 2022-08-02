"use strict";
(self["webpackChunkfrom_figma_digital_agency"] = self["webpackChunkfrom_figma_digital_agency"] || []).push([["src_js_header_js"],{

/***/ "./src/js/common.js":
/*!**************************!*\
  !*** ./src/js/common.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isContainerOpened": function() { return /* binding */ isContainerOpened; },
/* harmony export */   "setBodyOverflow": function() { return /* binding */ setBodyOverflow; }
/* harmony export */ });
 // Common functions

var isContainerOpened = function isContainerOpened(elem) {
  return !elem.classList.contains('display--none');
};
var setBodyOverflow = function setBodyOverflow(isPermitted) {
  document.body.style.overflowY = isPermitted ? "auto" : "hidden";
};

/***/ }),

/***/ "./src/js/header.js":
/*!**************************!*\
  !*** ./src/js/header.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./src/js/common.js");

'use strict'; // Control of header menu occurrence for mobile version


var headerContainer = document.querySelector('.header-container');
var headerNavContainer = document.querySelector('.header-container__nav-container');
var headerNavList = headerNavContainer.children[0];
var headerMenuButton = document.querySelector('.header-container__svg-button');
var screenMax700 = window.matchMedia("(max-width: 700px)");

var isHeaderMenuOpened = function isHeaderMenuOpened() {
  return (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.isContainerOpened)(headerNavContainer);
};

var setMenuButtonAttribs = function setMenuButtonAttribs(button, isMenuOpened) {
  button.setAttribute('aria-pressed', isMenuOpened);
  button.setAttribute('aria-expanded', isMenuOpened);
  var finLabel = isMenuOpened ? "Close" : "Open";
  finLabel += " the navigation list";
  button.setAttribute('aria-label', finLabel);
  var finIconHref = isMenuOpened ? "#icon-exit" : "#icon-menu";
  var buttonUse = button.children[0].children[0];
  buttonUse.setAttribute("href", finIconHref);
};

var closeMenu = function closeMenu() {
  if (!screenMax700.matches) return;
  headerContainer.classList.remove('header-container--menu-opened');
  headerNavContainer.classList.add('display--none');
  if (window.pageYOffset > 50) headerContainer.classList.add('header-container--lesser');
  setMenuButtonAttribs(headerMenuButton, false);
  (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.setBodyOverflow)(true);
};

var toggleHeaderStyle = function toggleHeaderStyle() {
  if (screenMax700.matches && isHeaderMenuOpened()) closeMenu();

  if (screenMax700.matches) {
    headerMenuButton.classList.remove('display--none');
    headerNavContainer.classList.add('display--none');
  } else {
    headerMenuButton.classList.add('display--none');
    headerNavContainer.classList.remove('display--none');
  }
};

window.addEventListener("resize", toggleHeaderStyle, {
  passive: true
});
toggleHeaderStyle();
headerNavList.childNodes.forEach(function (elem) {
  elem.addEventListener("click", closeMenu, {
    passive: true
  });
});
headerMenuButton.addEventListener('click', function () {
  headerContainer.classList.toggle('header-container--menu-opened');
  headerNavContainer.classList.toggle('display--none');
  headerContainer.classList.toggle('header-container--lesser', !isHeaderMenuOpened() && window.pageYOffset > 50);
  setMenuButtonAttribs(this, isHeaderMenuOpened());
  (0,_common_js__WEBPACK_IMPORTED_MODULE_0__.setBodyOverflow)(!isHeaderMenuOpened());
}, {
  passive: true
}); // Control of header menu style on scroll

window.addEventListener('scroll', function () {
  var scrollHeightPos = window.pageYOffset;
  headerContainer.classList.toggle('header-container--normal', scrollHeightPos <= 50);
  headerContainer.classList.toggle('header-container--lesser', scrollHeightPos > 50);
}, {
  passive: true
});
if (window.pageYOffset > 50) headerContainer.classList.add('header-container--lesser'); // Common width control

var setBodyWidth = function setBodyWidth() {
  headerContainer.style.width = window.innerWidth + 'px';
};

window.addEventListener("resize", setBodyWidth, {
  passive: true
});
setBodyWidth();

/***/ })

}]);
//# sourceMappingURL=src_js_header_js.010709f89854343ad8c0.js.map