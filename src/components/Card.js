export default class Card {
    constructor(
        { name, link, _id, likes, owner: { _id: ownerId } },
        userId,
        templateContent,
        { openImageHandler, deleteCardHandler, cardLikeHandler }
        ) {
        this._name = name;
        this._link = link;
        this._id = _id; // id карточки
        this._likes = likes; // массив лайков в сервера
        this._isOwner = userId === ownerId;
        this._userId = userId;
        this._templateContent = templateContent;
        this._handleOpenImage = openImageHandler;
        this._handleCardDelete = deleteCardHandler;
        this._handleCardLike = cardLikeHandler;
        this.generateElement = this.generateElement.bind(this);
        this.setLikes = this.setLikes.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    _getTemplate() {
        const cardTemplate = document
        .querySelector(this._templateContent)
        .content
        .querySelector('.element')
        .cloneNode(true);
        this._element = cardTemplate;
    }

    _findCardComponents() {
        this._likeBtn = this._element.querySelector('.element__like');
        this._likesCounter = this._element.querySelector('.element__likeCounter');
        this._delBtn = this._element.querySelector('.element__delete');
        this._cardImage = this._element.querySelector('.element__image');
        this._cardTitle = this._element.querySelector('.element__title');
    }

    _fillClassData() {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;
    }

    _isLiked() {
        return this._likes.map((likeItem) => likeItem._id).includes(this._userId);
    }

    _renderLikes() {
        if (this._isLiked()) {
            this._likeBtn.classList.add('element__like_active');
        } else {
            this._likeBtn.classList.remove('element__like_active');
        }
        this._likesCounter.textContent = this._likes.length;
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        this._renderLikes();
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }


    _handleLikeClick = () => this._handleCardLike(this._id, this._isLiked(), this.setLikes);
    _handleDeleteClick = () => this._handleCardDelete(this._id, this.deleteCard);
    _handleImageClick = () => this._handleOpenImage({ name: this._name, link: this._link });

    _setEventListeners() {
        this._likeBtn.addEventListener('click', this._handleLikeClick);
        if (this._isOwner) { // если карточка пользователя (своя)
            this._delBtn.addEventListener('click', this._handleDeleteClick); // удаляем её
        } else { // иначе
            this._delBtn.remove(); // удаляем кнопку удаления (корзинку)
        }
        this._cardImage.addEventListener('click', this._handleImageClick);
    }

    generateElement() {
        this._getTemplate();
        this._findCardComponents();
        this._fillClassData();
        this._renderLikes();
        this._setEventListeners();
        return this._element;
    }
}
