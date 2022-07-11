import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__photo');
    this._popupTitle = this._popupSelector.querySelector('.popup__name');
  }
  open(name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitle.textContent = name;
  }
}