import { popupConfiguration } from "../pages/index.js";

export class Popup {
  constructor(popupSelector, popupConfig) {
    this._popupSelector = popupSelector;
    this._activeModifier = popupConfig.activeModifier;
    this._closeBtnSelector = popupConfig.closeBtnSelector;
  }

  _handleEscClose = evt => {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleCloseBtnClick = () => {
    this.close();
  }

  _handleCloseOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup = document.querySelector(`.${this._popupSelector}`);
    this._closeButton = this._popup.querySelector(`.${this._closeBtnSelector}`);
    this._popup.addEventListener('mousedown', this._handleCloseOverlayClick);
    this._closeButton.addEventListener('click', this._handleCloseBtnClick);
  }

  open = () => {
    this._popup.classList.add(this._activeModifier);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(this._activeModifier);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
