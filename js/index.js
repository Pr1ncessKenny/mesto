let popup = document.querySelector(".popup");
let closePopup = document.querySelector(".popup__close");
let openPopup = document.querySelector(".profile__settings");
let profileName = document.querySelector(".profile__name");
let profilePost = document.querySelector(".profile__subtitle");
let profileNamePopup = document.querySelector("#name");
let profilePostPopup = document.querySelector("#who-is");
let formElement = document.querySelector(".popup__btn");
let popupForm = document.querySelector(".popup__form");


function popupOpen(){
  popup.classList.add('popup_opened');
}

function popupClose(){
  popup.classList.remove('popup_opened');
}
closePopup.addEventListener('click', () => {
  popupClose();
})

function addProfileData() {
  profileNamePopup.value = profileName.textContent;
  profilePostPopup.value = profilePost.textContent;
}

function profileNameChange(evt) {
  evt.preventDefault();
  profileName.textContent = profileNamePopup.value;
  profilePost.textContent = profilePostPopup.value;
  popupClose();
}
openPopup.addEventListener('click', () => {
  popupOpen();
  addProfileData();
});

popupForm.addEventListener('submit', profileNameChange);
