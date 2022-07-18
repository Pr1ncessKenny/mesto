import './index.css';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

export const popups = document.querySelectorAll(".popup");
export const popupOpend = document.querySelector('.popup_opened');
export const popupProfile = document.querySelector(".popup-profile");
export const popupCreate = document.querySelector(".popup_create");
export const popupImg = document.querySelector(".popup_type_img");
export const profileOpenBtn = document.querySelector(".profile__settings");
export const newCard = document.querySelector(".profile__rextangle");
export const profileImage = document.querySelector('.profile__photo');
export const profileName = document.querySelector(".profile__name");
export const profilePost = document.querySelector(".profile__subtitle");
export const profileNamePopup = document.querySelector("#name");
export const profilePostPopup = document.querySelector("#who-is");
export const createName= document.querySelector("#title");
export const createLink= document.querySelector("#place-link");
export const popupForm = document.querySelector(".popup-profile__form");
export const cardDelete = document.querySelector(".element__delete");
export const popupFormCreate = document.querySelector(".popup__form_create");
export const popupPhoto = document.querySelector(".popup__photo");
export const popupName = document.querySelector(".popup__name");
export const elemsContainer = document.querySelector(".elements");
export const createCardBtn = document.querySelector('#createCard-btn');
export const changeProfileBtn = document.querySelector('#changeProfile-btn');
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

export const formConfiguration = {
  inputSelector: 'popup__input',
  submitBtnSelector: 'popup__btn',
  formSelector: 'popup__form',
};

export const popupConfiguration = {
  activeModifier: 'popup_opened',
  closeBtnSelector: 'popup__close',
};

export const profileConfiguration = {
  titleSelector: 'profile__name',
  jobSelector: 'profile__subtitle',
};

export const viewPopupConfiguration = {
  imageSelector: 'popup__photo',
  captionSelector: 'popup__name',
};

export const cardsContainerSelector = 'elements';
export const newPlacePopupSelector = 'popup_create';
export const profilePopupSelector = 'popup-profile';
export const imagePopupSelector = 'popup_type_img';
export const newPlaceForName = 'title-form2';
export const profileFormName = 'title-form1';



// Validation

const editProfileValidation = new FormValidator(validateElemsObj, popupForm);
const addCardValidation = new FormValidator(validateElemsObj, popupFormCreate);

//-------------



/* export function openPopup(elem){
  elem.classList.add('popup_opened');
  setEscapeListener();
}

function closePopup(elem){
  elem.classList.remove('popup_opened');
  removeEscapeListener();
} */

/*
function createNewCard(evt){
  evt.preventDefault();
  createrCard({name: createName.value, link: createLink.value});
  closePopup(popupCreate);
  popupFormCreate.reset();
  addCardValidation.disableButton();
} */

// Create Cards


const viewPopup = new PopupWithImage(imagePopupSelector, popupConfiguration, viewPopupConfiguration);

const createCard = item => {
  const card = new Card({item}, '#template-element');
  return card.createElement();
}

const cardsList = new Section({
  items: initialCards.reverse(),
  renderer: createCard,
}, cardsContainerSelector);

cardsList.renderItems();

const handleCardSubmit = (item) => {
  cardsList.addItem(item);
}


const newCardPopup = new PopupWithForm(
  newPlacePopupSelector,
  newPlaceForName,
  popupConfiguration,
  formConfiguration,
  addCardValidation.resetValidation,
  handleCardSubmit
  );
newCardPopup.setEventListeners();

const addCardSubmitHandler = () => {
  newCardPopup.open();
}

const newUser = new UserInfo(profileConfiguration);

function changeProfileName(data) {
  newUser.setUserInfo(data);
}


const profileSettingsPopup = new PopupWithForm(
  profilePopupSelector,
  profileFormName,
  popupConfiguration,
  formConfiguration,
  editProfileValidation.resetValidation,
  changeProfileName,
  newUser.getUserInfo,
  );
profileSettingsPopup.setEventListeners();

const addSettingsdSubmitHandler = () => {
  profileSettingsPopup.open();
}

/* function createCardElement(cardName, cardInfo, cardSelector) {
  const card = new Card({
    name: cardName,
    link: cardInfo,
    handleCardClick: () =>{
      popupWithImage.open(cardName, cardInfo);
    }
  }, cardSelector);
  const cardElement = card.createElement();

  return cardElement;
}

function createrCard(item) {
  const placeElem = createCardElement(item);
  elemsContainer.prepend(placeElem);
}

function renderInitialElems() {
  initialCards.forEach(createrCard);
}

renderInitialElems(); */


//---------------------------------

/* profileOpenBtn.addEventListener('click', () => {
  editAvatarValidation.resetValidation();
  popupAvatar.open();
}); */

//---------------------------------------------------------
/* popups.forEach((popup) => {
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
} */



/* profileOpenBtn.addEventListener('click', () => {
  openPopup(popupProfile);
  profileNamePopup.value = profileName.textContent;
  profilePostPopup.value = profilePost.textContent;
}); */

profileOpenBtn.addEventListener('click', addSettingsdSubmitHandler);

/* newCard.addEventListener('click', () => openPopup(popupCreate)); */
newCard.addEventListener('click', addCardSubmitHandler);

//popupForm.addEventListener('submit', changeProfileName);

// Отправка формы добавления карточки на сайт
//popupFormCreate.addEventListener('submit', handleCardSubmit);

//popupWithImage.setEventListeners();

addCardValidation.enableValidation();
editProfileValidation.enableValidation();
