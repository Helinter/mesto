import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit, formElement){
    super(popupSelector);
    this.formElement = formElement;
    this.handleFormSubmit = handleFormSubmit;
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._closePopup = this._popupElement.querySelector('.popup__container-close-button');
    this._formSubmitButton = this._popupElement.querySelector('.popup__container-button');
  }

  close(){
    this._popupElement.classList.remove('popup_opened');
    this.formElement.reset();
  }

  _getInputValues(){

  }

  setEventListeners(){
    this._closePopup.addEventListener('click', this.close.bind(this)); 
    this._formSubmitButton.addEventListener('submit', () =>{
      this.handleFormSubmit();
    });
  }}