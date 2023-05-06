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
  popupInputFirst.value =  profileTitle.textContent;
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
function addCards() {
  let i = 0;
  for (i = 0; i < initialCards.length; i++) {
    const cardTemplate = document.querySelector('.card').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardsContainer.append(cardElement);
    cardElement.querySelector('.element__title').textContent = initialCards[i].name;
    const titleImage = cardElement.querySelector('.element__image');
    titleImage.setAttribute('src', initialCards[i].link);

  }
}

addCards();

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


let formCardElement = document.querySelector('#cardSubmit');

function addCard(evt) {
  evt.preventDefault();

  let placeInput = document.querySelector('.popup__input_type_place');
  let linkInput = document.querySelector('.popup__input_type_link');

  const cardTemplate = document.querySelector('.card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  initialCards.splice(initialCards.length, 0, { name: '', link: '' });
  initialCards[initialCards.length - 1].name = placeInput.value;
  initialCards[initialCards.length - 1].link = linkInput.value;

  cardElement.querySelector('.element__title').textContent = initialCards[initialCards.length - 1].name;
  const titleImage = cardElement.querySelector('.element__image');
  titleImage.setAttribute('src', initialCards[initialCards.length - 1].link);
  titleImage.setAttribute('alt', initialCards[initialCards.length - 1].name);
  cardsContainer.prepend(cardElement);
  popupCard.classList.remove('popup_opened');
  placeInput.value = 'Название';
  linkInput.value = 'Ссылка на картинку';
  openImage();
}

formCardElement.addEventListener('click', addCard);

//like
function like() {
  const likeButton = document.querySelector('.element__like-button');
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like-button_active");
  });
}
formCardElement.addEventListener('click', like);
formCardElement.addEventListener('click', deleteCard);


function likes() {
  const likeButton = document.querySelectorAll('.element__like-button');
  for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener("click", function () {
      likeButton[i].classList.toggle("element__like-button_active");
    });
  }
}

likes();

//delete cards

function deleteCard() {
  const deleteButton = document.querySelectorAll('.element__delete-button');
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", function () {
      const listItem = deleteButton[i].closest('.element');
      listItem.remove();
      openImage();
    });
  }
}
deleteCard();

//image popup

function openImage() {
  const imageButton = document.querySelectorAll('.element__image');
  const elementImage = document.querySelectorAll('.element__image');
  const popupImg = document.querySelector('.popup__img');
  const imageTitle = document.querySelector('.popup__image-container-title');
  const elementTitle = document.querySelectorAll('.element__title');
  const popupImage = document.querySelector('.popup_image');
  for (let i = 0; i < imageButton.length; i++) {

    imageButton[i].addEventListener("click", function () {
      popupImage.classList.add('popup_opened');
      imageTitle.textContent = elementTitle[i].textContent;
      popupImg.setAttribute('src', elementImage[i].getAttribute('src'));
      popupImg.setAttribute('alt', elementTitle[i].textContent);
    })

    const imageClose = document.querySelector('#imageClose');
    const popupImage = document.querySelector('.popup_image');
    imageClose.addEventListener('click', function () {
      popupImage.classList.remove('popup_opened');
    });
  }
}
openImage();
