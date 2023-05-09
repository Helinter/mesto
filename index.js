//popup
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputJob = document.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');


const openProfileEditPopup = document.querySelector('.profile__info-edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit-profile');

openProfileEditPopup.addEventListener('click', function () {
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
  openPopup(profileEditPopup);
});

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

const closeProfileEditPopup = document.querySelector('.popup__container-close-button');
closeProfileEditPopup.addEventListener('click', function () {
  closePopup(profileEditPopup);
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
});


const imageClose = document.querySelector('#imageClose');
const popupImage = document.querySelector('.popup_type_image');
imageClose.addEventListener('click', function () {
  closePopup(popupImage);
});
//title and subtitle edit

const formProfileElement = document.querySelector('.popup__container-button');

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_job');

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

formProfileElement.addEventListener('click', handleProfileFormSubmit);

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

function createCard(cardTitle, cardLink) {
  const cardTemplate = document.querySelector('.card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const titleImage = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__title').textContent = cardTitle;
  titleImage.setAttribute('src', cardLink);
  titleImage.setAttribute('alt', cardTitle);

  const likeButton = cardElement.querySelector('.element__like-button');
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like-button_active");
  });

  const deleteButton = cardElement.querySelector('.element__delete-button');
  deleteButton.addEventListener("click", function () {
    const listItem = deleteButton.closest('.element');
    listItem.remove();
  });

  const ImagePopupImg = document.querySelector('.popup__img');
  const imagePopupTitle = document.querySelector('.popup__image-container-title');
  const ImageButton = cardElement.querySelector('.element__image');
  ImageButton.addEventListener("click", function () {
    openPopup(popupImage);
    
    imagePopupTitle.textContent = cardTitle;
    ImagePopupImg.setAttribute('src', cardLink);
    ImagePopupImg.setAttribute('alt', cardTitle);
  })
  return cardElement;
}


function addCards() {

  let i = 0;
  for (i = 0; i < initialCards.length; i++) {
    const card = createCard(initialCards[i].name, initialCards[i].link);
    cardsContainer.append(card);
  }
}

addCards();

//cardsFormPopup

const placeInput = document.querySelector('.popup__input_type_place');
const linkInput = document.querySelector('.popup__input_type_link');

const openCardPopup = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_card');

openCardPopup.addEventListener('click', function () {
  openPopup(popupCard);
});
const closeCardPopup = document.querySelector('#CloseBut');
closeCardPopup.addEventListener('click', function () {
  closePopup(popupCard);
});


//AddCard


const formCardElement = document.querySelector('#cardSubmit');

function addCard(evt) {
  evt.preventDefault();

  const placeInput = document.querySelector('.popup__input_type_place');
  const linkInput = document.querySelector('.popup__input_type_link');


  initialCards.splice(initialCards.length, 0, { name: '', link: '' });
  initialCards[initialCards.length - 1].name = placeInput.value;
  initialCards[initialCards.length - 1].link = linkInput.value;

  const elementCard = createCard(placeInput.value, linkInput.value);
  cardsContainer.prepend(elementCard);


  closePopup(popupCard);
  placeInput.placeholder = 'Название';
  linkInput.placeholder = 'Ссылка на картинку';

}

formCardElement.addEventListener('click', addCard);
