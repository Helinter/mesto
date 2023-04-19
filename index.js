//popup
let popupInputFirst = document.querySelector('.popup__input-first');
let popupInputSecond = document.querySelector('.popup__input-second');
let profileTitle = document.querySelector('.profile__info-title');
let profileSubtitle = document.querySelector('.profile__info-subtitle');

popupInputFirst.value = profileTitle.textContent;
popupInputSecond.value = profileSubtitle.textContent;

let openPopup = document.querySelector('.profile__info-edit-button');
let popup = document.querySelector('.popup');

openPopup.addEventListener('click', function () {
  popup.className = 'popup_open';
});

let closePopup = document.querySelector('.popup__container-close-button');
closePopup.addEventListener('click', function () {
  popup.className = 'popup';
  profileTitle.textContent = popupInputFirst.value = profileTitle.textContent;
  popupInputSecond.value = profileSubtitle.textContent;
});


//popup!

//title and subtitle

let formElement = document.querySelector('.popup__container-button');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.popup__input-first');
  let jobInput = document.querySelector('.popup__input-second');

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.className = 'popup';
}

formElement.addEventListener('click', formSubmitHandler);

//title and subtitle!