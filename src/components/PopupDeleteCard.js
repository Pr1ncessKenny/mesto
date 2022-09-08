import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(
        popupSelector,
        popupConfig,
        formName,
        submitHandler,
        { btnText, changeBtnText },
    ) {
        super(popupSelector, popupConfig);
        
        this._formName = formName;
        this._formElement = document.forms[this._formName];
        this._handleSubmit = submitHandler;
        this._btnText = btnText;
        this._changeBtnText = changeBtnText;
        this._submitBtn = this._formElement.querySelector('.popup__save-button');
        this._handleSubmit = this._handleSubmit.bind(this);
        this.close = this.close.bind(this);
    }
    
    open(cardId, removeCardCallBack) {
        this._cardId = cardId;
        this._removeCardCallBack = removeCardCallBack;
        super.open();
    }
    
    changeButtonText = (isSaving) => {
        this._submitBtn.textContent = isSaving ? this._changeBtnText : this._btnText;
    }
    
    _handleFormSubmit = (event) => { //_handleDeleteSubmit
        event.preventDefault();
        this._handleSubmit(this._cardId, this._removeCardCallBack, this.changeButtonText, this.close);
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleFormSubmit);
    }
}
