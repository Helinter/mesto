

//popup
let popupInputFirst = document.querySelector('.popup__input_type_name');
let popupInputSecond = document.querySelector('.popup__input_type_job');
let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

popupInputFirst.value = profileTitle.textContent;
popupInputSecond.value = profileSubtitle.textContent;

let openPopup = document.querySelector('.profile__info-edit-button');
let popup = document.querySelector('.popup');

openPopup.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

let closePopup = document.querySelector('.popup__container-close-button');
closePopup.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
  profileTitle.textContent = popupInputFirst.value = profileTitle.textContent;
  popupInputSecond.value = profileSubtitle.textContent;
});


//title and subtitle edit

let formElement = document.querySelector('.popup__container-button');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_job');

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('click', formSubmitHandler);

//cards
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
const cardsContainer = document.querySelector('.elements');
function addCard() {
  let i = 0;
  for (i = 0; i < initialCards.length; i++) {
    const cardTemplate = document.querySelector('.card').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__title').textContent = initialCards[i].name;
    cardsContainer.append(cardElement);
    const titleImage = cardElement.querySelector('.element__image');
    titleImage.setAttribute('src', initialCards[i].link);

  }
}

addCard();

//cardsFormPopup

let popupInputThird = document.querySelector('.popup__input_type_place');
let popupInputFourth = document.querySelector('.popup__input_type_link');

let openCardPopup = document.querySelector('.profile__add-button');
let popupCard = document.querySelector('.card-popup');

openCardPopup.addEventListener('click', function () {
  popupCard.classList.add('popup_opened');
});
let closeCardPopup = document.querySelector('#CloseBut');
closeCardPopup.addEventListener('click', function () {
  popupCard.classList.remove('popup_opened');
});


//AddCard


