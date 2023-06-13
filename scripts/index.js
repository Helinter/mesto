


class Card {
  constructor(data, cardTemplate) {
    this.popupImage = data.popupImage,
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

      _htmlSetings(){
        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._titleImage.setAttribute('src', this._link);
        this._titleImage.setAttribute('alt', this._name);
      }

      _seteventlisteners(){
        this._likeOn();
        this._deleteOn();
        this._popupImgOn();
      }

      _popupImgOn(){
        this._titleImage.addEventListener("click", () => {
          openPopup(this.popupImage)
          this._imagePopupTitle.textContent = this._name;
          this._imagePopupImg.setAttribute('src', this._link);
          this._imagePopupImg.setAttribute('alt', this._name);
        });
      }

      _deleteOn(){
        this._deleteButton.addEventListener("click", () => {
          this._listItem.remove();
        });
      }

      _likeOn(){
        this._likeButton.addEventListener("click", () => {
          this._likeButton.classList.toggle("element__like-button_active");
        });
      }
      
  
}

//popup
const cardTemplate = document.querySelector('.card').content;
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const imagePopupImg = document.querySelector('.popup__img');
const imagePopupTitle = document.querySelector('.popup__image-container-title');
const openProfileEditPopup = document.querySelector('.profile__info-edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const closeProfileEditPopup = document.querySelector('.popup__container-close-button');
const imageClose = document.querySelector('#imageClose');
const popupImage = document.querySelector('.popup_type_image');
const formProfileElement = document.forms.profileForm;
const cardsContainer = document.querySelector('.elements');
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
const openCardPopup = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_card');
const closeCardPopup = document.querySelector('#CloseBut');
const formCardElement = document.forms.placeForm;
const data = {};
data.imagePopupImg = imagePopupImg;
data.imagePopupTitle = imagePopupTitle;
data.popupImage = popupImage;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

openProfileEditPopup.addEventListener('click', function () {
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
  openPopup(profileEditPopup);
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupsOnEsc);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupsOnEsc);
}

function closePopupsOnEsc(event) {
  if (event.key === 'Esc' || event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//cardsFormPopup
openCardPopup.addEventListener('click', function () {
  openPopup(popupCard);
});

closeCardPopup.addEventListener('click', function () {
  closePopup(popupCard);
});

closeProfileEditPopup.addEventListener('click', function () {
  closePopup(profileEditPopup);
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
});

function anableOverlayClosing() {
  const overlaysList = document.querySelectorAll('.popup');
  for (let i = 0; i < overlaysList.length; i++) {
    const overlay = overlaysList[i];
    overlay.onmousedown = function (event) {
      if (event.target == overlay) {
        closePopup(overlay);
      }
    }
  }
}

anableOverlayClosing()

imageClose.addEventListener('click', function () {
  closePopup(popupImage);
});

//title and subtitle edit
function handleProfileFormSubmit() {
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputJob.value;
  closePopup(profileEditPopup);
}

formProfileElement.addEventListener('submit', handleProfileFormSubmit);

//cards




function addCards() {
  let i = 0;
  for (i = 0; i < initialCards.length; i++) {
    data.name = initialCards[i].name;
    data.link = initialCards[i].link;
    const card = new Card(data, cardTemplate);
    cardsContainer.append(card.createCard());
  }
}

addCards();



//AddCard
function addCard() {
  data.name = placeInput.value;
    data.link = linkInput.value;
  const card = new Card(data, cardTemplate);
  cardsContainer.prepend(card.createCard());
  closePopup(popupCard);
  formCardElement.reset();
  const submitButton = document.getElementById('cardSubmit');
  submitButton.classList.add('popup__container-button_invalid');
  submitButton.disabled = true;
}

formCardElement.addEventListener('submit', addCard);