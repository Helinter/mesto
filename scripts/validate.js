//Forms
const config = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__container-button',
  inactiveButtonClass: 'popup__container-button_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'error'
}

function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function toggleButtonState(buttonElement, isActive) {
  if (!isActive) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function checkInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!errorElement) return;

  if (!isInputValid) {
    showError(inputElement, errorElement, config)
  }
  else {
    hideError(inputElement, errorElement, config)
  }
}

function setEventListeners(formElement, config) {
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(config.submitButtonSelector);

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();

  });

  [...inputsList].forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(inputItem, formElement, config);
      toggleButtonState(submitButtonElement, formElement.checkValidity(), config)
    })
  })
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  [...forms].forEach((formItem) => {
    setEventListeners(formItem, config);
  })
}

enableValidation(config);

function resetError(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach(inputElement => hideInputError(formElement, inputElement, config));
  toggleButtonState(formElement, inputList, config);
}
