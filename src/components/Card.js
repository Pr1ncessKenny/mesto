import { popupImg } from '../pages/index.js';
import {PopupWithImage} from './PopupWithImage.js';


export class Card {

  constructor({item}, cardSelector, handleCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate(){
    const card = document.querySelector(this._cardSelector).content;
    const placeElem = card.querySelector('.element').cloneNode(true);

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

  _handleRemoveCard = () => {
    this._element.remove();
    this._element = null;
}

  _handleLikeButton = (evt) => {
    evt.target.classList.toggle('element__heart_active');
  }

  _viewImage = () => {
    //this._handleCardClick({name: this._name, link: this._link});
}

  _setListeners(){
    this._element.querySelector('.element__delete').addEventListener('click', this._handleRemoveCard);
    this._element.querySelector('.element__heart').addEventListener('click', this._handleLikeButton);
    this._placeImg.addEventListener('click', this._viewImage);
  }
}
