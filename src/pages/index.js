//IMPORT
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { config } from "../vendor/config.js";
import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css'

//CONSTANTS
const cardTemplate = document.querySelector('.card').content;
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const openProfileEditPopup = document.querySelector('.profile__info-edit-button');
const formProfileElement = document.forms.profileForm;
const openCardPopup = document.querySelector('.profile__add-button');
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

const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.formName,
    info: inputValues.formJob
  });
  popupFormProfile.close();
});
popupFormProfile.setEventListeners();

const popupFormPlace = new PopupWithForm('.popup_type_card', (inputValues) => {
  const item = {
    name: inputValues.formPlace,
    link: inputValues.formLink
  };
  renderNewCard(item);
  popupFormPlace.close();
});
popupFormPlace.setEventListeners();

const popupCard = new PopupWithImage('.popup_type_image');
popupCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__info-title',
  infoSelector: '.profile__info-subtitle'
});

enableValidation(formProfileElement);
enableValidation(formCardElement);

const userData = userInfo.getUserInfo();

//POPUP IMAGE
function handleCardClick(cardData) {
  popupCard.open(cardData);
}

//CARDS
function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick);
  return card.createCard();
}

function renderer(item) {
  renderCards.addItem(createCard(item), true);
}

const renderCards = new Section(
  {
    items: initialCards,
    renderer: renderer,
  },
  '.elements'
);

renderCards.renderItems();

function renderNewCard(item) {
  renderCards.addItem(createCard(item), true);
}

// Forms
openProfileEditPopup.addEventListener('click', function () {
  const currentName = userInfo.getUserInfo().name;
  const currentJob = userInfo.getUserInfo().info;
  popupInputName.value = currentName;
  popupInputJob.value = currentJob;
  popupFormProfile.open();
});

openCardPopup.addEventListener('click', function () {
  popupFormPlace.open();
});

function enableValidation(formItem) {
  const form = new FormValidator(config, formItem);
  form.enableValidation();
  formItem.addEventListener('submit', () => {
    form._buttonDisabled();
  });
}
