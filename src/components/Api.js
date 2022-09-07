export default class Api {
  constructor() {

  }
}

fetch('https://nomoreparties.co/v1/cohort-49/users/me', {
  headers: {
    authorization: '7998d106-1b5f-4dcc-99e0-a865bf0df506'
  }
})
.then(res => res.json())
.then((result) => {
  console.log(result);
});


fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
  headers: {
    authorization: '7998d106-1b5f-4dcc-99e0-a865bf0df506'
  }
})
.then(res => res.json())
.then((result) => {
  console.log(result);
});

fetch('https://mesto.nomoreparties.co/v1/cohort-49/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '7998d106-1b5f-4dcc-99e0-a865bf0df506',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Nikita',
    about: 'Programmist'
  })
})
.then(res => res.json())
.then((result) => {
  console.log(result);
});


fetch('https://mesto.nomoreparties.co/v1/cohort-49/cards', {
  method: 'POST',
  headers: {
    authorization: '7998d106-1b5f-4dcc-99e0-a865bf0df506',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  })
})
.then(res => res.json())
.then((result) => {
  console.log(result);
});
