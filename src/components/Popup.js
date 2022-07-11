import { popupOpend, popups } from "../pages/index.js";

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeButton = this._popupSelector.querySelector('.popup__close');
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', () => {this._handleEscClose()});
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupESCEvent);
  }

  _handleEscClose() {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _mousedown(){
    popups.forEach((popup) => {
      popup.addEventListener('mousedown', (evt) => {
       if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_opened')) {
        this.close();
       }
     });
   });
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    this._mousedown();
  }
}
