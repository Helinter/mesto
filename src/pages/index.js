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
let myId;

//ПОЛУЧЕНИЕ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА
let externalIdPromise = api.getUserInfo()
  .then(result => {
    const profileInformation = result;
    profileTitle.textContent = profileInformation.name;
    profileSubtitle.textContent = profileInformation.about;
    profileAvatar.src = profileInformation.avatar;
    myId = profileInformation._id;
    return myId;
  });

externalIdPromise.then((myId) => {
  console.log(myId);
  const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
    // Заменим текст кнопки на "Сохранение..." и заблокируем кнопку
    popupFormProfile.renderLoading(true);

    const newName = inputValues.formName;
    const newAbout = inputValues.formJob;

    api.updateProfile(newName, newAbout)
      .then(() => {
        userInfo.setUserInfo({
          name: newName,
          info: newAbout
        });
        popupFormProfile.close();
      })
      .catch(error => {
        console.error('Ошибка при обновлении профиля:', error);
      })
      .finally(() => {
        // Восстановим текст кнопки после завершения загрузки данных
        popupFormProfile.renderLoading(false);
      });
  });
  popupFormProfile.setEventListeners();
  
  // Forms
  openProfileEditPopup.addEventListener('click', () => {
    const currentName = userInfo.getUserInfo().name;
    const currentJob = userInfo.getUserInfo().info;
    popupInputName.value = currentName;
    popupInputJob.value = currentJob;
    popupFormProfile.open();
  });

  openCardPopup.addEventListener('click', () => {
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
    // Заменим текст кнопки на "Сохранение..." и заблокируем кнопку
    popupFormPlace.renderLoading(true);

    const item = {
      name: inputValues.formPlace,
      link: inputValues.formLink,
      likes: [],
    };

    api.addCard(item.name, item.link)
      .then(newCard => {
        item._id = newCard._id;
        item.ownerId = myId;
        renderNewCard(item, myId);
        popupFormPlace.close();
      })
      .catch(error => {
        console.error('Ошибка при добавлении карточки:', error);
      })
      .finally(() => {
        // Восстановим текст кнопки после завершения загрузки данных
        popupFormPlace.renderLoading(false);
      });
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
        ownerId: card.owner._id,
        _id: card._id
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

  function handleCardClick(cardData) {
    popupCard.open(cardData);
  }

  const popupFormDelete = new PopupWithForm('.popup_type_delete', handleDeleteSubmit);
  popupFormDelete.setEventListeners();

  let cardForDelete;
  function handleDeleteClick(cardDelete) {
    popupFormDelete.open();
    cardForDelete = cardDelete;
  }

  function handleDeleteSubmit() {
    cardForDelete.deleteCard();
    popupFormDelete.close();
  }

  // Аватар пользователя
  const openAvatarPopup = document.querySelector('.profile__avatar-edit-icon');
  openAvatarPopup.addEventListener('click', function () {
    popupFormAvatar.open();
  });

  const popupFormAvatar = new PopupWithForm('.popup_type_edit-avatar', (inputValues) => {
    // Заменим текст кнопки на "Сохранение..." и заблокируем кнопку
    popupFormAvatar.renderLoading(true);

    const newAvatarLink = inputValues.formAvatar;

    api.updateAvatar(newAvatarLink)
      .then((result) => {
        profileAvatar.src = newAvatarLink;
        popupFormAvatar.close();
      })
      .catch(error => {
        console.error('Ошибка при обновлении аватара:', error);
      })
      .finally(() => {
        // Восстановим текст кнопки после завершения загрузки данных
        popupFormAvatar.renderLoading(false);
      });
  });

  popupFormAvatar.setEventListeners();

  //CARDS
  function createCard(item, myId) {
    const card = new Card(item, cardTemplate, handleCardClick, handleDeleteClick, myId, api);
    return card.createCard();
  }

  function renderer(item) {
    renderCards.addItem(createCard(item, myId), true);
  }

  function renderNewCard(item, myId) {
    const card = createCard(item, myId);
    renderCards.addItem(card, true);
  }
});
