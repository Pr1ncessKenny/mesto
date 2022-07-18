import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, formName, popupConfig, {inputSelector, submitBtnSelector, formSelector}, errorsResetCallback, submitCallback, getterCallback = null) {
    super(popupSelector, popupConfig);
    this._formName = formName;
    this._submitCallback = submitCallback;
    this._inputSelector = inputSelector;
    this._submitBtnSelector = submitBtnSelector;
    this._formSelector = formSelector;
    this._getterCallback = getterCallback;
    this._formElem = document.forms[this._formName];
    this._inputs = Array.from(this._formElem.querySelectorAll(`.${this._inputSelector}`));
    this._submitBtn = this._formElem.querySelector(`${this._submitBtnSelector}`);
    this._errorsResetCallback = errorsResetCallback;
  }
  _getInputValues(){
    const values = {};
    this._inputs.forEach(inputElem => {
      values[inputElem.id.slice(6)] = inputElem.value;
    })

    return values;
  }

  _setInputValues(values) {
    this._inputs.forEach(inputElem => {
      inputElem.value = values[inputElem.id.slice(6)];
    })
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
    this.close();

  }

  setEventListeners(){
    super.setEventListeners();
    this._formElem.addEventListener('submit', this._handleSubmit);
  }

  close() {
    super.close();
    this._formElem.reset();
  }

  open() {
    if(this._getterCallback) {
      this._setInputValues(this._getterCallback());
    } else {
      this._formElem.reset();
    }
    this._errorsResetCallback();
    super.open();
  }
}
