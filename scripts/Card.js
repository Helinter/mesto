import{openPopup} from './index.js';

export class Card {
  constructor(data, cardTemplate) {
    this._popupImage = data.popupImage,
      this._imagePopupImg = data.imagePopupImg,
      this._imagePopupTitle = data.imagePopupTitle,
      this._cardElement = cardTemplate.querySelector('.element').cloneNode(true),
      this._name = data.name,
      this._link = data.link,
      this._titleImage = this._cardElement.querySelector('.element__image'),
      this._deleteButton = this._cardElement.querySelector('.element__delete-button'),
      this._likeButton = this._cardElement.querySelector('.element__like-button'),
      this._listItem = this._deleteButton.closest('.element')
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
  }

  _seteventlisteners() {
    this._likeButton.addEventListener("click", () => this._likeOn());
    this._deleteButton.addEventListener("click", () => this._deleteOn());
    this._titleImage.addEventListener("click", () => this._popupImgOn());
  }

  _popupImgOn() {
      openPopup(this._popupImage)
      this._imagePopupTitle.textContent = this._name;
      this._imagePopupImg.setAttribute('src', this._link);
      this._imagePopupImg.setAttribute('alt', this._name);
  }

  _deleteOn() {
      this._listItem.remove();
      this. _listItem = null;
  }

  _likeOn() {
      this._likeButton.classList.toggle("element__like-button_active");
  }
}