import { Card } from './card.js';


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
  disableButton(changeProfileBtn, validateElemsObj);
}


function createNewCard(evt){
  evt.preventDefault();
  createrCard({name: createName.value, link: createLink.value});
  closePopup(popupCreate);
  popupFormCreate.reset();
  disableButton(createCardBtn, validateElemsObj);
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

/* function validation(item) {
  const formValidator = new FormValidator(item,'.popup__form');
  formValidator.enableValidation(item);

  return formValidator;
}
validation(); */


//-------------

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
