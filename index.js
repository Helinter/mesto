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
  popupInputName.value =  profileTitle.textContent;
  popupInputJob.value = profileSubtitle.textContent;
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

const popupInputThird = document.querySelector('.popup__input_type_place');
const popupInputFourth = document.querySelector('.popup__input_type_link');

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
  closePopup(popupCard);
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
  for (let i = 0; i < imageButton.length; i++) {

    imageButton[i].addEventListener("click", function () {
      openPopup(popupImage);
      imageTitle.textContent = elementTitle[i].textContent;
      popupImg.setAttribute('src', elementImage[i].getAttribute('src'));
      popupImg.setAttribute('alt', elementTitle[i].textContent);
    })

    const imageClose = document.querySelector('#imageClose');
    const popupImage = document.querySelector('.popup_type_image');
    imageClose.addEventListener('click', function () {
      closePopup(popupImage);
    });
  }
}
openImage();
