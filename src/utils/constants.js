// КОНСТАНТЫ НАСТРОЕК

// Настройки валидации:
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-text'
}

// Настройки для API:
export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-25/',
  headers: {
    authorization: '90d29a06-be47-4d93-96ab-3707cf211001',
    'Content-Type': 'application/json'
  }
}