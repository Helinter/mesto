export class Card {
  constructor(data, cardTemplate, handleCardClick, myId, api) {
    this.id = data._id
    this.myId = myId;
    this.api = api;
    this._cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.ownerId; 
    this._titleImage = this._cardElement.querySelector('.element__image');
    this._deleteButton = this._cardElement.querySelector('.element__delete-button');
    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._likeCounter = this._cardElement.querySelector('.element__like-counter'); 
    this._listItem = this._deleteButton.closest('.element');
    this._handleCardClick = handleCardClick;
    this._imageData = {
      link: this._link,
      name: this._name
    };
  }

  createCard() {
    this._htmlSettings();
    this._setEventListeners();
    if (this._ownerId !== this.myId) {
      this._deleteButton.remove();
    }
    return this._cardElement;
  }

  _updateDeleteButton() {
    if (this._ownerId === this.myId) {
      this._cardElement.appendChild(this._deleteButton);
    } else {
      this._deleteButton.remove();
    }
  }

  _htmlSettings() {
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._titleImage.setAttribute('src', this._link);
    this._titleImage.setAttribute('alt', this._name);
    this._likeCounter.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleLike());
    this._deleteButton.addEventListener('click', () => this._deleteOn());
    this._titleImage.addEventListener('click', () => this._popupImgOn());
  }

  _popupImgOn() {
    this._handleCardClick(this._imageData);
  }


  _deleteOn() {
    this.api.deleteCard(this.id)
      .then(() => {
        this._listItem.remove();
        this._listItem = null;
      })
      .catch(error => {
        console.error('Ошибка при удалении карточки:', error);
      });
  }

  _toggleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
    if (this._likeButton.classList.contains('element__like-button_active')) {
      this._likes.push({});
    } else {
      this._likes.pop();
    }
    this._likeCounter.textContent = this._likes.length;
  }
}
