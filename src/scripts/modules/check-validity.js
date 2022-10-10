/* Functions for form: checker and keyboard manager */

export const isValid = (inputTypeStr, inputValue) => {
  let regExpPrecept;

  switch(inputTypeStr) {
    case 'name':
      regExpPrecept = /(^[a-zA-Zа-яА-Я]([a-zA-Zа-яА-Я\s\'\ʼ\-\.]{0,63})[a-zA-Zа-яА-Я]$)/;
      break;
    case 'email':
      regExpPrecept = /^[a-zA-Z0-9]([\w\.\-]{0,62})[a-zA-Z0-9]@[a-z0-9]([\w\.\-]{1,62})\.([a-z]{2,8})$/;
      break;
  }

  return regExpPrecept.test(inputValue);
};

export const manageKeydown = (event, inputTypeStr) => {
  let regExpLetters;

  switch(inputTypeStr) {
    case 'name':
      regExpLetters = /[a-zA-Zа-яА-Я\s\'\ʼ\-\.]/;
      break;
    case 'email':
      regExpLetters = /[\w\-\.\@]/;
      break;
  }

  if (!event.key.match(regExpLetters)
  && event.code !== 'ArrowRight' && event.code !== 'ArrowLeft'
  && event.code !== 'Backspace' && event.code !== 'Delete')
    event.preventDefault();
};
