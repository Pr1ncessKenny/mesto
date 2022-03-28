const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup-profile");
const popupCreate = document.querySelector(".popup_create");
const popupImg = document.querySelector(".popup_type_img");
const popupClose = document.querySelector(".popup-profile__close");
const popupCreateClose = document.querySelector(".popup__close_create");
const popapImgClose = document.querySelector(".popup__close_img");
const popupOpen = document.querySelector(".profile__settings");
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


function openPopup(elem){
  elem.classList.add('popup_opened');
}
function openPopupProfile() {
  popupProfile.classList.add('popup_opened');
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
  closePopup(popupProfile);
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

// Михаил, спасибо большое за идею, сам не подумал об этом )
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      }
  });
});

popupOpen.addEventListener('click', openPopupProfile);
newCard.addEventListener('click', () => openPopup(popupCreate));
popupForm.addEventListener('submit', changeProfileName);
popupFormCreate.addEventListener('submit', createNewCard);
