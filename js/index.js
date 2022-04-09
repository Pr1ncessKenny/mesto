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
const placeTemplate = document.querySelector('#template-element').content;
const createCardBtn = document.querySelector('#createCard-btn');
const changeProfileBtn = document.querySelector('#changeProfile-btn');


function openPopup(elem){
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
  disableButton(changeProfileBtn, validateElemsObj);
}

// Create Cards
function createNewCard(evt){
  evt.preventDefault();
  createrCard({name: createName.value, link: createLink.value});
  closePopup(popupCreate);
  popupFormCreate.reset();
  disableButton(createCardBtn, validateElemsObj);
}


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

function renderInitialElems() {
  initialCards.forEach(createrCard);
}

function createElement(item) {
  const placeElem = placeTemplate.querySelector('.element').cloneNode(true);
  const placeImg = placeElem.querySelector('.element__photo');
  placeElem.querySelector('.element__text').textContent = item.name;
  placeImg.src = item.link;
  placeImg.alt = item.name;

  placeElem.querySelector('.element__heart').addEventListener('click', (evt) => {
    evt.target.classList.toggle("element__heart_active")
  });
  placeElem.querySelector(".element__delete").addEventListener('click', () => {
    placeElem.remove();
  });

  placeImg.addEventListener('click', () => openPopupImg(placeImg));

  return placeElem;
}
function createrCard(item) {
  const placeElem = createElement(item);
  elemsContainer.prepend(placeElem);
}

renderInitialElems();


//-------------------

function openPopupImg(placeImg){
  openPopup(popupImg);
  popupPhoto.src = placeImg.src;
  popupPhoto.alt = placeImg.alt;
  popupName.textContent = placeImg.alt;
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup_opened')) {
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
