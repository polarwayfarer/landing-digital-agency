"use strict";
(self["webpackChunkfrom_figma_digital_agency"] = self["webpackChunkfrom_figma_digital_agency"] || []).push([["src_script_modules_sections-navigation_js"],{

/***/ "./src/script/modules/sections-navigation.js":
/*!***************************************************!*\
  !*** ./src/script/modules/sections-navigation.js ***!
  \***************************************************/
/***/ (function() {



var getId = function getId(linkElem) {
  return linkElem.getAttribute('href').replace('#', '');
}; // Control of smooth navigation for navigation elements


var addSmoothNavigation = function addSmoothNavigation(linksArr) {
  linksArr.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var currentLinkId = getId(event.currentTarget);
      window.scrollTo({
        top: document.getElementById(currentLinkId).offsetTop - 50,
        behavior: 'smooth'
      });
    });
  });
};

var headerNavLinks = document.querySelectorAll('.header-container__nav-container a');
var svgLinks = document.querySelectorAll('.svg-link');
addSmoothNavigation(headerNavLinks);
addSmoothNavigation(svgLinks); // Control of responsive behaviour for header's navigation links

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      headerNavLinks.forEach(function (link) {
        link.classList.toggle('link--active-tab', getId(link) === entry.target.id);
      });
    }
  });
}, {
  threshold: 0.5
});
var observedSections = document.querySelectorAll('.section--observed');
observedSections.forEach(function (section) {
  return observer.observe(section);
});

/***/ })

}]);
//# sourceMappingURL=src_script_modules_sections-navigation_js.b3d206a4fe6407bf13d8.js.map