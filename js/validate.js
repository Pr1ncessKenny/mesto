const validateElemsObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  buttonElemtDisabled: 'popup__btn_disabled',
  inputErrorClass: 'popup__input__type_error',
  errorElem: 'popup__input-error_active'
};


function enableValidation(elem) {
  const formList = Array.from(document.querySelectorAll(elem.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, elem);
  });
}

function showInputError(formElement, inputElement, errorMessage, elem) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(elem.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(elem.errorElem);
}

function hideInputError(formElement, inputElement, elem) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(elem.inputErrorClass);
  errorElement.classList.remove(elem.errorElem);
  errorElement.textContent = '';
}

function isInputValid(formElement, inputElement, elem) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, elem);
  } else {
    hideInputError(formElement, inputElement, elem);
  }
};

function setEventListeners(formElement, elem) {
  const inputList = Array.from(formElement.querySelectorAll(elem.inputSelector));
  const buttonElem = formElement.querySelector(elem.submitButtonSelector);
  toggleButtonState(inputList, buttonElem, elem);

  inputList.forEach( inputElement => {
    inputElement.addEventListener('input', () => {
      isInputValid(formElement, inputElement, elem);
      toggleButtonState(inputList, buttonElem, elem);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, elem) {
  if (hasInvalidInput(inputList)) {
    disableButton (buttonElement, elem);
  } else {
    buttonElement.classList.remove(elem.buttonElemtDisabled);
    buttonElement.removeAttribute('disabled', true);
  }
};

function disableButton(buttonElement, elem) {
  buttonElement.classList.add(elem.buttonElemtDisabled);
  buttonElement.setAttribute('disabled', true);
}


enableValidation(validateElemsObj);
