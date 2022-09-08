import '../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';

import {
  validationConfig,
  imagePopupConfig,
  popupConfiguration,
  profileConfiguration,
  inputSelector, // 'popup__form-input'
  cardsContainerSelector, // 'elements'
  popupNewCardSelector, // 'popup_type_card-item'
  popupDeleteCardSelector, // 'popup_type_deleteCard'
  popupAvatarSelector, // 'popup_type_avatar'
  newCardFormName, // 'form-newCard'
  deleteCardFormName, // 'form-deleteCard'
  avatarFormName, // 'form-newAvatar'
  profileFormName, // 'form-profile'
  popupProfileSelector, // 'popup_type_info'
  imagePopupSelector, // 'popup_type_photo'
  addCardBtnText,
  delCardBtnText,
  saveBtnText,
  apiConfiguration,
} from '../utils/constants.js';

const api = new Api(apiConfiguration);

//кнопки открытия попапов
const popupNewItemBtn = document.querySelector('.profile__add-button');
const popupProfileEditBtn = document.querySelector('.profile__edit-button');
const popupNewAvatarBtn = document.querySelector('.profile__avatar');


//раскрытие фото
const imagePopup = new PopupWithImage(imagePopupSelector, popupConfiguration, imagePopupConfig);
imagePopup.setEventListeners();


//удаление карточки
const popupDeleteCard = new PopupDeleteCard(
    popupDeleteCardSelector,
    popupConfiguration,
    deleteCardFormName,
    removeCardHandler,
    delCardBtnText,
);
popupDeleteCard.setEventListeners();

function removeCardHandler(cardId, removeCardCallBack, changeButtonTextCallBack, closePopupCallBack) {
    changeButtonTextCallBack(true);
    api.deleteCard(cardId)
    .then(() => {
        removeCardCallBack(); //Card.js(removeCardCallBack)
        closePopupCallBack();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        changeButtonTextCallBack(false);
    });
}


function handleImageClick(name, link) {
    imagePopup.open(name, link);
}

function handleDeleteAgree(cardId, deleteCardCallBack) {
    popupDeleteCard.open(cardId, deleteCardCallBack);
}

//создание готовой карточки
function createElement(item) {
    return new Card(
        item,
        user.id, //UserInfo.js(getUserId())
        '.template-item',
        {
            openImageHandler: handleImageClick,
            deleteCardHandler: handleDeleteAgree,
            cardLikeHandler: handleLikeClick
        }
    ).generateElement();
}

function handleLikeClick(cardId, isLiked, setLikesCallBack) {
    api.switchLike(cardId, isLiked)
    .then(({ likes }) => {
        setLikesCallBack(likes);
    })
    .catch((err) => {
        console.log(err);
    });
}

//отрисовка элементов на странице
const cardsContainer = new Section({ renderer: createElement }, cardsContainerSelector);


//валидация форм
const formValidators = {};
Array.from(document.forms).forEach((formElement) => {
    formValidators[formElement.name] = new FormValidator(validationConfig, formElement);
    formValidators[formElement.name].enableValidation();
});


//добавление карточки
const popupNewCard = new PopupWithForm(
    popupNewCardSelector,
    popupConfiguration,
    newCardFormName,
    inputSelector,
    formValidators[newCardFormName].cleanUpForm,
    addCardHandler, //handleCardSubmit
    addCardBtnText,
);
popupNewCard.setEventListeners();
//открытие попапа добавления карточки
const handlePopupNewCardOpen = () => popupNewCard.open();
popupNewItemBtn.addEventListener('click', handlePopupNewCardOpen);

function addCardHandler(item, changeButtonTextCallBack, closePopupCallBack) {
    changeButtonTextCallBack(true);
    api.addCard(item.name, item.link)
    .then((res) => {
        cardsContainer.addItem(res);
        closePopupCallBack();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        changeButtonTextCallBack(false);
    });
}


//отображение информации о пользователе
const user = new UserInfo(profileConfiguration);


//редактирование профиля
const popupProfile = new PopupWithForm(
    popupProfileSelector,
    popupConfiguration,
    profileFormName,
    inputSelector,
    formValidators[profileFormName].cleanUpForm,
    editUserInfoHandler,
    saveBtnText,
    user.getUserInfo,
);
popupProfile.setEventListeners();
//открытие попапа профиля
const handlePopupProfileOpen = () => popupProfile.open();
popupProfileEditBtn.addEventListener("click", handlePopupProfileOpen);

function editUserInfoHandler(data, changeButtonTextCallBack, closePopupCallBack) {
    changeButtonTextCallBack(true);
    api.editUserInfo(data.title, data.job)
    .then((res) => {
        user.setUserInfo(res);
        closePopupCallBack();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        changeButtonTextCallBack(false);
    });
}


// редактирование аватара
const popupNewAvatar = new PopupWithForm(
    popupAvatarSelector,
    popupConfiguration,
    avatarFormName,
    inputSelector,
    formValidators[avatarFormName].cleanUpForm,
    editAvatarHandler, //(handleAvatarSubmit)
    saveBtnText,
    user.getUserAvatar,
);
popupNewAvatar.setEventListeners();
//открытие попапа редактирования аватара
const handlePopupNewAvatarOpen = () => popupNewAvatar.open();
popupNewAvatarBtn.addEventListener('click', handlePopupNewAvatarOpen);

function editAvatarHandler(data, changeButtonTextCallBack, closePopupCallBack) {
    changeButtonTextCallBack(true);
    api.editAvatar(data.avatar)
    .then((profileAvatar) => {
        user.setUserInfo(profileAvatar);
        closePopupCallBack();
    })
    .catch((err) => {
        console.dir(err);
    })
    .finally(() => {
        changeButtonTextCallBack(false);
    });
}


Promise.all([api.getUser(), api.getCards()])
    .then(([profileData, cards]) => {
        user.setUserInfo(profileData);
        cardsContainer.rendererItems(cards);
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });
