import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { config } from "../vendor/config.js";
import { Section } from './Section.js'

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
export const data = {};
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

data.imagePopupImg = imagePopupImg;
data.imagePopupTitle = imagePopupTitle;
data.popupImage = popupImage;

openProfileEditPopup.addEventListener('click', function () {
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
  openPopup(profileEditPopup);
});

export function openPopup(popupElement) {
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

function createCard() {
  const card = new Card(data, cardTemplate);
  return card.createCard();
}

function renderer(item) {
  data.name = item.name;
  data.link = item.link;
  this.addItem(createCard());
}

const renderCards = new Section({
  items: initialCards,
  renderer: renderer,
}, '.elements');

renderCards.renderItems();

const newCard = new Section({
  items: {},
  renderer: renderer,
}, '.elements');

function renderNewCard(){
  data.name = placeInput.value;
  data.link = linkInput.value;
  newCard.addItem(createCard())
  closePopup(popupCard);
  formCardElement.reset();
  }

formCardElement.addEventListener('submit', () => {
  renderNewCard();
});

//Forms
const forms = document.querySelectorAll(config.formSelector);

[...forms].forEach((formItem) => {
  const form = new FormValidator(config, formItem);
  form.enableValidation();
  formItem.addEventListener('submit', (e) => {
    e.preventDefault();
    form._buttonDisabled();
  });
})