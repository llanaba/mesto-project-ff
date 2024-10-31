import '../pages/index.css';
import initialCards from './cards.js';
import { 
  createCard, 
  deleteCard, 
  likeCard 
} from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation, toggleButtonState } from './validation';


// DOM-ЭЛЕМЕНТЫ СТРАНИЦЫ

// Элементы, относящиеся к профилю пользователя на странице:
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');

// Список карточек:
const cardListContainer = document.querySelector('.places__list');

// Попапы и кнопки, относящиеся к ним:
const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonsClosePopup = Array.from(document.querySelectorAll('.popup__close'));

export const popupAddNewCard = document.querySelector('.popup_type_new-card');
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupViewImage = document.querySelector('.popup_type_image');

// Формы:
// форма редактирования профиля:
const editProfileFormElement = popupEditProfile.querySelector('.popup__form');
const userNameInput = editProfileFormElement.querySelector('.popup__input_type_name');
const userDescriptionInput = editProfileFormElement.querySelector('.popup__input_type_description');

// форма создания карточки:
const createCardFormElement = popupAddNewCard.querySelector('.popup__form');
const cardNameInput = createCardFormElement.querySelector('.popup__input_type_card-name');
const cardImageUrlInput = createCardFormElement.querySelector('.popup__input_type_url');

// Элементы изображения и подписи к нему:
const imageElement = popupViewImage.querySelector('.popup__image');
const imageCaption = popupViewImage.querySelector('.popup__caption');

// Настройки валидации:
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-text'
}

//ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ

// Выводим исходные карточки на страницу:

initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard, likeCard, viewImage);
  cardListContainer.append(card);
})

// Вешаем слушатели на статичные элементы:

buttonsClosePopup.forEach(button => {
  button.addEventListener('click', function (event) {
    const activePopup = event.target.closest('.popup');
    closeModal(activePopup);
  })
})

// Включаем валидацию всех форм на странице:

enableValidation(validationConfig);


// ВЗАИМОДЕЙСТВИЕ С ПОЛЬЗОВАТЕЛЕМ

// Добавление новой карточки на страницу: 

buttonAddNewCard.addEventListener('click', function () {
  openModal(popupAddNewCard);
});

/**
 * Обрабатывает отправку формы добавления карточки: создает новую карточку 
 * и добавляет ее в начало списка карточек.
 * @param {Event} evt 
 */
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardImageUrlInput.value
  }
  const card = createCard(cardData, deleteCard, likeCard, viewImage);
  cardListContainer.prepend(card);
  createCardFormElement.reset();

  const button = createCardFormElement.querySelector('.popup__button');
  const inputList = Array.from(createCardFormElement.querySelectorAll('.popup__input'));
  toggleButtonState(inputList, button);
  closeModal(popupAddNewCard);
}

createCardFormElement.addEventListener('submit', handleAddCardSubmit);

// Редактирование профиля: 

buttonEditProfile.addEventListener('click', function () {
  editProfileFormElement.name.value = userName.textContent;
  editProfileFormElement.description.value = userDescription.textContent;
  clearValidation(editProfileFormElement);
  openModal(popupEditProfile);
});

/**
 * Обрабатывает отправку формы редактирования профиля: позволяет изменить
 * имя пользователя и описание.
 * @param {Event} evt 
 */
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value;
  userDescription.textContent = userDescriptionInput.value;
  closeModal(popupEditProfile);
};

editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);

// Просмотр изображений:

/**
 * Показывает увеличенную версию изображения в модальном окне
 * @param {string} cardName — название изображения, которое используется для подписи
 * изображения и для свойства alt
 * @param {string} cardLink - ссылка на изображение, которая используется для 
 * свойства src
 */
function viewImage(cardName, cardLink) {
  imageCaption.textContent = cardName;
  imageElement.src = cardLink;
  imageElement.alt = cardName;
  openModal(popupViewImage);
}
