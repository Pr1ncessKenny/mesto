import '../pages/index.css';
import Card from '../components/Card.js';
import {Section} from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
    initialCards,
    validationConfig,
    imagePopupConfig,
    popupConfiguration,
    profileConfiguration,
    inputSelector,
    cardsContainerSelector,
    popupNewCardSelector,
    newCardFormName,
    profileFormName,
    popupProfileSelector,
    imagePopupSelector,
} from '../utils/constants.js';

//кнопки открытия попапов
const popupNewItemButton = document.querySelector('.profile__add-button');
const popupProfileEditButton = document.querySelector('.profile__edit-button');

//--------------------------------------------------------------------------------

const imagePopup = new PopupWithImage(imagePopupSelector, popupConfiguration, imagePopupConfig);
imagePopup.setEventListeners();
//--------------------------------------------------------------------------------
//создание готовой карточки
function createElement({ name, link }) {
    return new Card({ name, link }, '.template-item', imagePopup.open).generateElement();
}
//--------------------------------------------------------------------------------


//отрисовка элементов
const cardsContainer = new Section({ items: initialCards, renderer: createElement }, cardsContainerSelector);
cardsContainer.rendererItems();
//--------------------------------------------------------------------------------


//валидация
const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
    formValidators[formElement.name] = new FormValidator(validationConfig, formElement);
    formValidators[formElement.name].enableValidation();
});


//--------------------------------------------------------------------------------


// формa добавления карточки
const handleCardSubmit = (item) => cardsContainer.addItem(item);

//formValidators[newCardFormName].cleanUpForm;

//добавление карточки
const popupNewCard = new PopupWithForm(
    popupNewCardSelector,
    popupConfiguration,
    handleCardSubmit
);
popupNewCard.setEventListeners();
//открытие попапа добавления карточки
const handlePopupNewCardOpen = () => {
  popupNewCard.open();
  //formValidators[newCardFormName].cleanUpForm();

};
popupNewItemButton.addEventListener('click', handlePopupNewCardOpen);


//--------------------------------------------------------------------------------
//отображение инфы о пользователе


const newUser = new UserInfo(profileConfiguration);


//--------------------------------------------------------------------------------


//отправка формы редактирования профиля

const handleProfileSubmit = (data) => newUser.setUserInfo(data);

const popupProfile = new PopupWithForm(
    popupProfileSelector,
    popupConfiguration,
    handleProfileSubmit,
    newUser.getUserInfo,
);
popupProfile.setEventListeners();

const handlePopupProfileOpen = () => {
  popupProfile.open()
  formValidators[profileFormName].cleanUpForm();
};
popupProfileEditButton.addEventListener('click', handlePopupProfileOpen);
