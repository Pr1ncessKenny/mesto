export default class FormValidator {
    constructor(config, form) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._saveButton = this._form.querySelector(this._submitButtonSelector);
    }
    
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = errorMessage;
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }
    
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }
    
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    _toggleButtonState(inputList, saveButton) {
        if (this._hasInvalidInput(inputList)) { // Если есть хотя бы один невалидный инпут
            saveButton.classList.add(this._inactiveButtonClass); // сделай кнопку неактивной
            saveButton.disabled = true; // saveButton.setAttribute("disabled", true);
        } else { // иначе сделай кнопку активной
            saveButton.classList.remove(this._inactiveButtonClass);
            saveButton.disabled = false; // saveButton.removeAttribute("disabled", true);
        }
    }
    
    enableValidation() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(this._inputList, this._saveButton);
            });
        });
        this._toggleButtonState(this._inputList, this._saveButton);
    }
    
    cleanUpForm = () => {
        this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
        this._toggleButtonState(this._inputList, this._saveButton);
    }
}
