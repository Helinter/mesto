export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._closePopup = this._popupElement.querySelector('.popup__container-close-button');
    
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    //document.addEventListener('keydown', this._handleEscClose());
    this.setEventListeners();
   
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    //document.removeEventListener('keydown', this._handleEscClose());
  }

  _handleEscClose(event) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      this.close();
    }
  }

_handleOverlayClose(){
  
  this._popupElement.click = function (event) {
    if (event.target == this._popupElement) {
      console.log('overlay click');
      this.close();
    }
  }
}

  setEventListeners() {
    this._closePopup.addEventListener('click', this.close.bind(this));
    //this._popupElement.addEventListener('click', this._handleOverlayClose.bind(this));
    console.log('setEventListeners')
    }

  }





