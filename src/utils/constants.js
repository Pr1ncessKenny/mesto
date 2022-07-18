export const initialCards = [
  {
    name: 'Ульяновск',
    link: 'https://avatars.mds.yandex.net/get-zen_doc/4554796/pub_605095d5011181447b59c342_6050962de781846a40bce4ac/scale_1200'
  },
  {
    name: 'Москва',
    link: 'https://narkolog-psihiatr.ru/wp-content/uploads/2018/08/centr-reabilitacii-narkozavisimosti-v-moskve-anonimnaya-pomoshh.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://fashionblogger.ru/wp-content/uploads/2022/01/1618752634-2-funart-pro-p-vidi-sankt-peterburga-krasivie-mesta-foto-3.jpg'
  },
  {
    name: 'Казань',
    link: 'https://serdalo.ru/sites/default/files/pubs-images/2021/05/77a78b209e9645dc9116e10bd75a25c2.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://avatars.mds.yandex.net/get-pdb/1899866/96131335-98c4-4103-ba3b-d086d4e2645a/s1200'
  }
];

export const validationConfig = {
  inputSelector: 'popup__form-input',
  submitButtonSelector: 'popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__form-input_type_error',
  errorClass: 'popup__form-input-error_type_active',
};

export const popupConfiguration = {
  activeModifier: 'popup_active',
  closeBtnSelector: 'popup__close-button',
};

export const profileConfiguration = {
  nameSelector: 'profile__name',
  jobSelector: 'profile__text',
};

export const imagePopupConfig = {
  imageSelector: 'popup__image',
  subtitleSelector: 'popup__subtitle',
};

export const inputSelector = 'popup__form-input';
export const cardsContainerSelector = 'elements';
export const popupNewCardSelector = 'popup_type_card-item';
export const popupProfileSelector = 'popup_type_info';
export const imagePopupSelector = 'popup_type_photo';
export const newCardFormName = 'form-newCard';
export const profileFormName = 'form-profile';
