import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, popupConfig, {imageSelector, captionSelector}){
    super(popupSelector, popupConfig);
    this._imageSelector = imageSelector;
    this._captionSelector = captionSelector;
    this._imageElem = document.querySelector(`.${this._imageSelector}`);
    this._captionElem = document.querySelector(`.${this._captionSelector}`);
  }
  open = ({name, link}) => {
    this._imageElem.src = link;
    this._imageElem.alt = name;
    this._captionElem.textContent = name;
    super.open();
  }
}
