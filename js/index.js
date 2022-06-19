import { Card } from './Card.js';
import {FormValidator} from './FormValidator.js';

const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup-profile");
const popupCreate = document.querySelector(".popup_create");
export const popupImg = document.querySelector(".popup_type_img");
const profileOpenBtn = document.querySelector(".profile__settings");
const newCard = document.querySelector(".profile__rextangle");
const profileName = document.querySelector(".profile__name");
const profilePost = document.querySelector(".profile__subtitle");
const profileNamePopup = document.querySelector("#name");
const profilePostPopup = document.querySelector("#who-is");
const createName= document.querySelector("#title");
const createLink= document.querySelector("#place-link");
const popupForm = document.querySelector(".popup-profile__form");
const cardDelete = document.querySelector(".element__delete");
const popupFormCreate = document.querySelector(".popup__form_create");
const popupPhoto = document.querySelector(".popup__photo");
const popupName = document.querySelector(".popup__name");
const elemsContainer = document.querySelector(".elements");
const createCardBtn = document.querySelector('#createCard-btn');
const changeProfileBtn = document.querySelector('#changeProfile-btn');
export const placeTemplate = document.querySelector('#template-element').content;


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validateElemsObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  buttonElemtDisabled: 'popup__btn_disabled',
  inputErrorClass: 'popup__input__type_error',
  errorElem: 'popup__input-error_active'
};

export function openPopup(elem){
  elem.classList.add('popup_opened');
  setEscapeListener();
}

function closePopup(elem){
  elem.classList.remove('popup_opened');
  removeEscapeListener();
}

function changeProfileName(evt) {
  evt.preventDefault();
  profileName.textContent = profileNamePopup.value;
  profilePost.textContent = profilePostPopup.value;
  closePopup(popupProfile);
  editProfileValidation.disableButton();
}


function createNewCard(evt){
  evt.preventDefault();
  createrCard({name: createName.value, link: createLink.value});
  closePopup(popupCreate);
  popupFormCreate.reset();
  addCardValidation.disableButton();
}

// Create Cards

function createElement(cardInfo) {
  const card = new Card(cardInfo, '.element');
  const cardElement = card.createElement();

  return cardElement;
}

function createrCard(item) {
  const placeElem = createElement(item);
  elemsContainer.prepend(placeElem);
}

function renderInitialElems() {
  initialCards.forEach(createrCard);
}

renderInitialElems();

// Validation

const editProfileValidation = new FormValidator(validateElemsObj, popupForm);
const addCardValidation = new FormValidator(validateElemsObj, popupFormCreate);


//-------------

popups.forEach((popup) => {
   popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

function closePopupESC(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function setEscapeListener() {
  document.addEventListener('keydown', closePopupESC);
}
function removeEscapeListener() {
  document.removeEventListener('keydown', closePopupESC);
}



profileOpenBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  profileNamePopup.value = profileName.textContent;
  profilePostPopup.value = profilePost.textContent;
});
newCard.addEventListener('click', () => openPopup(popupCreate));
popupForm.addEventListener('submit', changeProfileName);
popupFormCreate.addEventListener('submit', createNewCard);

addCardValidation.enableValidation();
editProfileValidation.enableValidation();
