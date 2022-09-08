export default class Api {
    constructor(url, token) {
        this._token = token;
        this._url = url;
        this._headers = {
            authorization: this._token,
            'Content-Type': 'application/json'
        }
    }

    _handleResJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Возникла ошибка: ${res.status}`); // если ошибка, отклоняем промис
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this._handleResJson);
    }

    getUser() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResJson);
    }

    editUserInfo(title, job) {
        const body = {
            name: title,
            about: job,
        };
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(body),
        })
        .then(this._handleResJson);
    }

    addCard(newPlace, linkPlace) {
        const body = {
            name: newPlace,
            link: linkPlace,
        };
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(body),
        })
        .then(this._handleResJson);
    }

    deleteCard(cardId) {
         return fetch(`${this._url}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
        .then(this._handleResJson);
    }

    countLikes() {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: this._headers,
        })
        .then(this._handleResJson);
    }

    switchLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: isLiked ? 'DELETE' : 'PUT',
        })
        .then(this._handleResJson);
    }

    editAvatar(userAvatar) {
        const body = {
            avatar: userAvatar
        };
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(body),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Возникла ошибка: ${res.message}`);
        });
    }
}
