import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(
        popupSelector,
        popupConfig,
        { imageSelector, subtitleSelector }
        ) {
        super(popupSelector, popupConfig);
        
        this._imageSelector = imageSelector;
        this._subtitleSelector = subtitleSelector;
        this._imageElement = this._popup.querySelector(this._imageSelector);
        this._subtitleElement = this._popup.querySelector(this._subtitleSelector);
        this.open = this.open.bind(this);
    }

    open({ name, link }) {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._subtitleElement.textContent = name;
        super.open();
    }
}
