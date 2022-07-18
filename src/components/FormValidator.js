export class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._buttonElemtDisabled = settings.buttonElemtDisabled;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorElem = settings.errorElem;
    this._popupForm = form;
  }

  _showInputError(inputElement, errorMessage) {
    const formError = this._popupForm.querySelector(`.${inputElement.id}-error`);

    formError.textContent = errorMessage;
    formError.classList.add(this._errorElem);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError = (inputElement) => {
    const formError = this._popupForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorElem);
    formError.textContent = '';
  }

  _isInputValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this.inputList.some( inputElement => { return !inputElement.validity.valid });
  }

  disableButton() {
    this.buttonElement.classList.add(this._buttonElemtDisabled);
    this.buttonElement.setAttribute('disabled', true);
  }

  _enableButton() {
    this.buttonElement.classList.remove(this._buttonElemtDisabled)
    this.buttonElement.removeAttribute('disabled', true);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this.buttonElement = this._popupForm.querySelector(this._submitButtonSelector);
    this.inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    this.toggleButtonState();

    this.inputList.forEach( inputElement => {
      inputElement.addEventListener('input', () => {
        this._isInputValid(inputElement);
        this.toggleButtonState();
      });
    });
  }

  resetValidation = () => {
    this.inputList.forEach(inputItem => {
      this._hideInputError(inputItem);
    })
    this.toggleButtonState();
  }

  enableValidation = () => {
    this._popupForm.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  }
}
