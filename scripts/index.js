//popup
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

  titleImage.addEventListener("click", function () {
    openPopup(popupImage);
    imagePopupTitle.textContent = cardTitle;
    imagePopupImg.setAttribute('src', cardLink);
    imagePopupImg.setAttribute('alt', cardTitle);
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
openCardPopup.addEventListener('click', function () {
  openPopup(popupCard);
});

closeCardPopup.addEventListener('click', function () {
  closePopup(popupCard);
});

//AddCard
function addCard(evt) {
  const elementCard = createCard(placeInput.value, linkInput.value);
  cardsContainer.prepend(elementCard);
  closePopup(popupCard);
  document.getElementById('placeForm').reset();
}

formCardElement.addEventListener('submit', addCard);