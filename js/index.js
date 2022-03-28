let popup = document.querySelector(".popup");
let popupCreate = document.querySelector(".popup_create");
let popupImg = document.querySelector(".popup_type_img");
let popupClose = document.querySelector(".popup__close");
let popupCreateClose = document.querySelector(".popup__close_create");
let popapImgClose = document.querySelector(".popup__close_img");
let popupOpen = document.querySelector(".profile__settings");
let newCard = document.querySelector(".profile__rextangle");
let profileName = document.querySelector(".profile__name");
let profilePost = document.querySelector(".profile__subtitle");
let profileNamePopup = document.querySelector("#name");
let profilePostPopup = document.querySelector("#who-is");
let createName= document.querySelector("#title");
let createLink= document.querySelector("#place-link");
let popupForm = document.querySelector(".popup__form");
let cardDelete = document.querySelector(".element__delete");
let popupFormCreate = document.querySelector(".popup__form_create");
let popupPhoto = document.querySelector(".popup__photo");
let popupName = document.querySelector(".popup__name");
const elemsContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector('#template-element').content;


function openPopup(elem){
  elem.classList.add('popup_opened');
  profileNamePopup.value = profileName.textContent;
  profilePostPopup.value = profilePost.textContent;
}

function closePopup(elem){
  elem.classList.remove('popup_opened');
}

function changeProfileName(evt) {
  evt.preventDefault();
  profileName.textContent = profileNamePopup.value;
  profilePost.textContent = profilePostPopup.value;
  closePopup(popup);
}

// Create Cards
function createNewCard(evt){
  evt.preventDefault();
  createrCard({name: createName.value, link: createLink.value});
  closePopup(popupCreate);
  popupFormCreate.reset();
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

  placeElem.querySelector

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



popupOpen.addEventListener('click', () => openPopup(popup));
newCard.addEventListener('click', () => openPopup(popupCreate));
popupClose.addEventListener('click',() => closePopup(popup));
popupCreateClose.addEventListener('click',() => closePopup(popupCreate));
popapImgClose.addEventListener('click',() => closePopup(popupImg));
popupForm.addEventListener('submit', changeProfileName);
popupFormCreate.addEventListener('submit', createNewCard);
