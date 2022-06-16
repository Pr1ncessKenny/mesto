class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._buttonElemtDisabled = settings.buttonElemtDisabled;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorElem = settings.errorElem;
    this._popupForm = form;
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
    this._saveBtn = this._popupForm.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
   });
  }

  _setEventListeners() {

    this._toggleButtonState();

    this._inputList.forEach( el => {
      el.addEventListener('input', () => {
        this._isInputValid(el);
        this._toggleButtonState();
      });
    });

  }

  _showInputError(el) {
    const formError = this._popupForm.querySelector(`.${el.id}-error`);

    formError.textContent = el.validationMessage;
    formError.classList.add(this._errorElem);
    el.classList.add(this._inputErrorClass);
  }

  _hideInputError(el) {
    const formError = this._popupForm.querySelector(`.${el.id}-error`);
    el.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorElem);
    formError.textContent = '';
  }

  _isInputValid(el) {
    if (!el.validity.valid) {
      this._showInputError(el);
    } else {
      this._hideInputError(el);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some( el => { return !el.validity.valid });
  }

  disableButton() {
    this._saveBtn.classList.add(this._buttonElemtDisabled);
    this._saveBtn.setAttribute('disabled', true);
  }

  _enableButton() {
    this._saveBtn.classList.remove(this._buttonElemtDisabled)
    this._saveBtn.removeAttribute('disabled', true);
  }

  _toggleButtonState() {
    const formValid = this._hasInputsValid();
    if (formValid) {
      this.disableButton ();
    } else {
      this._enableButton();
    }
  }
}
