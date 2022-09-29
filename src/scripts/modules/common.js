export const isContainerOpened = elem => {
  return !elem.classList.contains('display--none');
};

export const setBodyOverflowY = isPermitted => {
  document.body.style.overflowY =
    (isPermitted) ? 'auto' : 'hidden';
};

export const isMobileDevice = window.matchMedia('(pointer: coarse)').matches;

export const setElemShown = (elem, isPermitted) => {
  if (isPermitted) {
    elem.classList.remove('display--none');
  } else {
    elem.classList.add('display--none');
  }
  elem.setAttribute('aria-hidden', !isPermitted);
}
