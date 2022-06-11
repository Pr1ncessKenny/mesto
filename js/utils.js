const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup-profile");
const popupCreate = document.querySelector(".popup_create");
const popupImg = document.querySelector(".popup_type_img");
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
const placeTemplate = document.querySelector('#template-element').content;


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
