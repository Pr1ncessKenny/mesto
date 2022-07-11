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

const cardsList = new Section({
  items: initialCards,
  renderer: (cardItem) => { // Обратите внимание на параметр cardItem
    const cardElement = createCardElement(cardItem.name, cardItem.link, '.element');


    cardsList.addItem(cardElement);
  }
}, '.elements');

cardsList.renderItems();


function createCardElement(cardName, cardInfo, cardSelector) {
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

renderInitialElems();

// Validation

const editProfileValidation = new FormValidator(validateElemsObj, popupForm);
const addCardValidation = new FormValidator(validateElemsObj, popupFormCreate);

//-------------

const popupWithImage = new PopupWithImage('.popup_type_img');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__subtitle',
  avatarSelector: '.profile__photo'
});

const popupTypeCard = new PopupWithForm({
  handleSubmit: (inputsValues) => {
    submitCardButton.textContent = 'Сохранение...';
    function addCard(cardInfo) {
      api.postCard({
        name: cardInfo.card_name,
        link: cardInfo.card_info
      })
        .then((res) => {
          const card = createCard(res.name, res.link, '.card__template', userData, userData, res.likes, res._id);
          cardsList.addItem(card);
          popupTypeCard.close()
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
          submitCardButton.textContent = 'Создать';
        })
    }
    addCard(inputsValues)
  }
}, popupCreate);


// popup Edit Form

const popupProfileform = new PopupWithForm({
  handleSubmit: (inputsValues) => {
    submitProfileButton.textContent = 'Сохранение...';
    function changeDescription(inputsValues) {
      api.patchInfo(inputsValues)
        .then((res) => {
          userInfo.setUserInfo({
            name: inputsValues.profile_name,
            description: inputsValues.profile_info
          })
          popupProfileform.close();
        })
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
          submitProfileButton.textContent = 'Сохранить';
        })
    }
    changeDescription(inputsValues)
  }
}, popupProfile);

//---------------------------------

profileOpenBtn.addEventListener('click', () => {
  editAvatarValidation.resetValidation();
  popupAvatar.open();
});

//---------------------------------------------------------
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

popupWithImage.setEventListeners();

addCardValidation.enableValidation();
editProfileValidation.enableValidation();
