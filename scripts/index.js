//IMPORT
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { config } from "../vendor/config.js";
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import '../pages/index.css'

//CONSTSNTS
const cardTemplate = document.querySelector('.card').content;
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const openProfileEditPopup = document.querySelector('.profile__info-edit-button');
const formProfileElement = document.forms.profileForm;
const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');
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
const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', handleFormSubmit(formProfileElement), formProfileElement);
const popupFormPlace = new PopupWithForm('.popup_type_card', handleFormSubmit(formCardElement), formCardElement);
const popupCard = new PopupWithImage('.popup_type_image');
const userInfo = new UserInfo({
  nameSelector: '.profile__info-title',
  infoSelector: '.profile__info-subtitle'
});
const userData = userInfo.getUserInfo();

//POPUP IMAGE
function handleCardClick(image) {
  popupCard.open(image);
}

//CARDS
function createCard(item) {
  const card = new Card(item, cardTemplate, handleCardClick);
  return card.createCard();
}

function renderer(item) {
  this.addItem(createCard(item));
}

const renderCards = new Section({
  items: initialCards,
  renderer: renderer,
}, '.elements');

renderCards.renderItems();

const aNewCard = new Section({
  items: {},
  renderer: renderer,
}, '.elements');

function renderNewCard() {
  const item = {};
  const inputValues = popupFormPlace._getInputValues();
  item.name = inputValues.formPlace;
  item.link = inputValues.formLink;
  aNewCard.addItem(createCard(item))
  popupFormPlace.close();
}


function editProfileInformation() {
  const inputValues = popupFormProfile._getInputValues();
  userInfo.setUserInfo({
    name: inputValues.formName,
    info: inputValues.formJob
  });
  popupFormProfile.close();
}

//Forms



openProfileEditPopup.addEventListener('click', function () {
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
  enableValidation(document.getElementById("profileForm"))
  popupFormProfile.open();
});



openCardPopup.addEventListener('click', function () {
  enableValidation(document.getElementById("placeForm"))
  popupFormPlace.open();
});

function placeFormSubmit() {
  formCardElement.addEventListener('submit', (e) => {
    e.preventDefault();
    renderNewCard();
  });
}

function profileFormSubmit() {
  formProfileElement.addEventListener('submit', (e) => {
    e.preventDefault();
    editProfileInformation();
  });
}

function handleFormSubmit(form) {
  if (form == formCardElement) {
    placeFormSubmit();

  } else {
    profileFormSubmit();

  }
}

function enableValidation(formItem) {
  const form = new FormValidator(config, formItem);
  form.enableValidation();
  formItem.addEventListener('submit', () => {
    form._buttonDisabled();
  });
}
