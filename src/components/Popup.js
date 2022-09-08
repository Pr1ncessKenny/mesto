export default class Popup {
    constructor(popupSelector, popupConfig) {
        this._popupSelector = popupSelector;
        this._activeModifier = popupConfig.activeModifier; // 'popup_active'
        this._closeBtnSelector = popupConfig.closeBtnSelector; // '.popup__close-button'
        this._popup = document.querySelector(this._popupSelector);
        this._closeBtn = this._popup.querySelector(this._closeBtnSelector);
    }
    
    open() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.classList.add(this._activeModifier);
    }
    
    close() {
        this._popup.classList.remove(this._activeModifier);
        document.removeEventListener('keydown', this._handleEscClose);
    }
    
    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            this.close();
        }
    }
    
    _handleOverlayClose = (event) => {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }
    
    _handleCloseBtnClick = () => this.close();
    
    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleOverlayClose);
        this._closeBtn.addEventListener('click', this._handleCloseBtnClick);
    }
}
