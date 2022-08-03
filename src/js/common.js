'use strict';

// Common functions

export const isContainerOpened = elem => {
  return !elem.classList.contains('display--none');
};

export const setBodyOverflowY = isPermitted => {
  document.body.style.overflowY =
    (isPermitted) ? "auto" : "hidden";
};
