export class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes; 
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
    this._htmlSetings();
    this._seteventlisteners();
    return this._cardElement;
  }

  _htmlSetings() {
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._titleImage.setAttribute('src', this._link);
    this._titleImage.setAttribute('alt', this._name);
    
    this._likeCounter.textContent = this._likes.length;
  }

  _seteventlisteners() {
    this._likeButton.addEventListener('click', () => this._toggleLike());
    this._deleteButton.addEventListener('click', () => this._deleteOn());
    this._titleImage.addEventListener('click', () => this._popupImgOn());
  }

  _popupImgOn() {
    this._handleCardClick(this._imageData);
  }

  _deleteOn() {
    this._listItem.remove();
    this._listItem = null;
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