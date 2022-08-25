import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(
        popupSelector,
        popupConfig,
        submitCallBack,
        getterCallBack = null
    ) {
        super(popupSelector, popupConfig);

        this._formElement = this._popup.querySelector('.popup__form');
        this._submitCallBack = submitCallBack;
        this._getterCallBack = getterCallBack;
        this._inputList = Array.from(this._formElement.querySelectorAll('.popup__form-input'));
    }

    close() {
        super.close();
        this._formElement.reset();
    }


    _getInputValues = () => {
      this._formValues = {};
      this._inputList.forEach((inputElement) => this._formValues[inputElement.name] = inputElement.value);
      return this._formValues;
    };


    setInputValues(values) {
        this._inputList.forEach((inputElement) => inputElement.value = values[inputElement.name]);
    }

    _handleSubmit = (event) => {
        event.preventDefault();
        this._submitCallBack(this._getInputValues());
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleSubmit);
    }
}
