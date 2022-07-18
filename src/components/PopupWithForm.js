import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(
        popupSelector,
        popupConfig,
        formName,
        inputSelector,
        cleanUpFormErrors,
        submitCallBack,
        getterCallBack = null
    ) {
        super(popupSelector, popupConfig);

        this._formName = formName;
        this._inputSelector = inputSelector;
        this._cleanUpFormErrors = cleanUpFormErrors;
        this._submitCallBack = submitCallBack;
        this._getterCallBack = getterCallBack;
        this._formElement = document.forms[this._formName];
        this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`));
    }æææ

    close() {
        super.close();
        this._formElement.reset();
    }


    _getInputValues = () => {
        const values = {};
        this._inputList.forEach((inputElement) => values[inputElement.id.slice(6)] = inputElement.value);
        return values;
    };


    _setInputValues(values) {
        this._inputList.forEach((inputElement) => inputElement.value = values[inputElement.id.slice(6)]);
    }

    open() {
        if (this._getterCallBack) {
            this._setInputValues(this._getterCallBack());
        }
        this._cleanUpFormErrors();
        super.open();
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
