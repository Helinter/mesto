//IMPORT
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { config } from "../vendor/config.js";
import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';
import { Api } from '../components/Api.js';

//CONSTANTS

const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-70',
  headers: {
    authorization: '9e4f7ba1-e97e-4ac3-9791-bede623fb8bb',
    'Content-Type': 'application/json'
  }
};
const api = new Api(apiConfig);
const cardTemplate = document.querySelector('.card').content;
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const openProfileEditPopup = document.querySelector('.profile__info-edit-button');
const formProfileElement = document.forms.profileForm;
const openCardPopup = document.querySelector('.profile__add-button');
const formCardElement = document.forms.placeForm;
export const data = {};

const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
  const newName = inputValues.formName;
  const newAbout = inputValues.formJob;

  api.updateProfile(newName, newAbout);//ОБНОВЛЕНИЕ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ
  
  userInfo.setUserInfo({
    name: newName,
    info: newAbout
  });
  popupFormProfile.close();
});
popupFormProfile.setEventListeners();
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


const popupFormPlace = new PopupWithForm('.popup_type_card', (inputValues) => {
  const item = {
    name: inputValues.formPlace,
    link: inputValues.formLink,
    likes:{}
  };
  api.addCard(item.name, item.link);//СОЗДАНИЕ НОВОЙ КАРТОЧКИ НА СЕРВЕРЕ

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


let renderCards;

//ПОЛУЧЕНИЕ КАРТОЧЕК С СЕРВЕРА
api.getCards()
  .then(res => {
    const cardsFromServer = res;
    const cards = cardsFromServer.map(card => ({
      name: card.name,
      link: card.link,
      likes: card.likes,
    }));

    renderCards = new Section(
      {
        items: cards,
        renderer: renderer,
      },
      '.elements'
    );

    renderCards.renderItems();
  });


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

function renderNewCard(item) {
  const card = createCard(item);
  renderCards.addItem(card, true);
}


//API


//ПОЛУЧЕНИЕ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА
api.getUserInfo()
  .then(result => {
    const profileInformation = result;
    profileTitle.textContent = profileInformation.name;
    profileSubtitle.textContent = profileInformation.about;
    profileAvatar.src = profileInformation.avatar;
  }
    )


  