export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._closePopup = this._popupElement.querySelector('.popup__container-close-button');
    
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose());
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose());
  }

  _handleEscClose(event) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._closePopup.addEventListener('click', this.close());
    this._popupElement.onmousedown = function (event) {
        if (event.target == this._popupElement) {
          this.close();
        }
      }
    }

  }





