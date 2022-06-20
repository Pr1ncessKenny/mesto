import {openPopup, popupImg, placeTemplate} from './index.js';


export class Card {

  constructor(cardInfo, cardSelector) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate(){
    const placeElem = placeTemplate.querySelector(this._cardSelector).cloneNode(true);

    return placeElem;
  }

  createElement() {
    this._element = this._getTemplate();
    this._placeImg = this._element.querySelector('.element__photo');

    this._setListeners()

    this._element.querySelector('.element__text').textContent = this._name;
    this._placeImg.src = this._link;
    this._placeImg.alt = this._name;

    return this._element;
  }

  _handleRemoveCard() {
    this._element.remove();
    this._element = null;
}

  _handleLikeButton(evt) {
    evt.target.classList.toggle('element__heart_active');
  }

  _viewImage() {
    openPopup(popupImg);
    popupImg.querySelector('.popup__photo').src = this._link;
    popupImg.querySelector('.popup__photo').alt = this._name;
    popupImg.querySelector('.popup__name').textContent = this._name;
}

  _setListeners(){
    this._element.querySelector('.element__delete').addEventListener('click', () => this._handleRemoveCard() );
    this._element.querySelector('.element__heart').addEventListener('click', this._handleLikeButton);
    this._placeImg.addEventListener('click', () => this._viewImage() );
  }
}
