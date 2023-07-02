import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._popupImg = this._popupElement.querySelector('popup__img');
  }
  open(image){
    super.setEventListeners();
    this._popupElement.querySelector('.popup__image-container-title').textContent = image.alt;
    this._popupElement.querySelector('.popup__img').src= image.src;
    this._popupElement.querySelector('.popup__img').alt= image.alt;
    this._popupElement.classList.add('popup_opened');
  }
}