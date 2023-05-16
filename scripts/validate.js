//Forms
function showError(inputElement, errorElement) {
  inputElement.classList.add('popup__input_invalid');
  errorElement.textContent = inputElement.validationMessage;
}
function hideError(inputElement, errorElement) {
  inputElement.classList.remove('popup__input_invalid');
  errorElement.textContent = inputElement.validationMessage;
}

function toggleButtonState(buttonElement, isActive) {
  if (!isActive) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__container-button_invalid');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__container-button_invalid');
  }
}

function checkInputValidity(inputElement, formElement) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!errorElement) return;

  if (!isInputValid) {
    showError(inputElement, errorElement)
  }
  else {
    hideError(inputElement, errorElement)
  }
}

function setEventListeners(formElement) {
  const inputsList = formElement.querySelectorAll('.popup__input');
  const submitButtonElement = formElement.querySelector('.popup__container-button');

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

  });

  [...inputsList].forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(inputItem, formElement);
      toggleButtonState(submitButtonElement, formElement.checkValidity())
    })
  })
}

function enableValidation() {
  const forms = document.querySelectorAll('.form');
  [...forms].forEach((formItem) => {
    setEventListeners(formItem);
  })
}

enableValidation();

