let popup = document.querySelector(".popup");
let popupClose = document.querySelector(".popup__close");
let popupOpen = document.querySelector(".profile__settings");
let profileName = document.querySelector(".profile__name");
let profilePost = document.querySelector(".profile__subtitle");
let profileNamePopup = document.querySelector("#name");
let profilePostPopup = document.querySelector("#who-is");
let popupForm = document.querySelector(".popup__form");


function openPopup(){
  popup.classList.add('popup_opened');
  profileNamePopup.value = profileName.textContent;
  profilePostPopup.value = profilePost.textContent;
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

function changeProfileName(evt) {
  evt.preventDefault();
  profileName.textContent = profileNamePopup.value;
  profilePost.textContent = profilePostPopup.value;
  closePopup();
}

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', changeProfileName);
