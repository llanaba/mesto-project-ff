import '../pages/index.css';
import { validationConfig } from '../utils/constants.js'
import { 
  createCard, 
  deleteCard, 
  handleLikeCard 
} from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation, toggleButtonState } from './validation';
import { 
  getUser, 
  updateAvatar,
  getInitialCards, 
  updateProfileInfo, 
  postNewCard
} from './api';

// DOM-ЭЛЕМЕНТЫ СТРАНИЦЫ

// Элементы, относящиеся к профилю пользователя на странице:
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');

// Список карточек:
const cardListContainer = document.querySelector('.places__list');

// Попапы и кнопки, относящиеся к ним:
const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonEditAvatar = document.querySelector('.profile__image-overlay');
const buttonsClosePopup = Array.from(document.querySelectorAll('.popup__close'));

export const popupAddNewCard = document.querySelector('.popup_type_new-card');
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
export const popupViewImage = document.querySelector('.popup_type_image');

// Формы:
// форма редактирования профиля:
const editProfileFormElement = popupEditProfile.querySelector('.popup__form');
const editAvatarFormElement = popupEditAvatar.querySelector('.popup__form');
const userNameInput = editProfileFormElement.querySelector('.popup__input_type_name');
const userDescriptionInput = editProfileFormElement.querySelector('.popup__input_type_description');
const userAvatarInput = editAvatarFormElement.querySelector('.popup__input_type_avatar-url');

// форма создания карточки:
const createCardFormElement = popupAddNewCard.querySelector('.popup__form');
const cardNameInput = createCardFormElement.querySelector('.popup__input_type_card-name');
const cardImageUrlInput = createCardFormElement.querySelector('.popup__input_type_url');

// Элементы изображения и подписи к нему:
const imageElement = popupViewImage.querySelector('.popup__image');
const imageCaption = popupViewImage.querySelector('.popup__caption');




function renderUser(userData) {
  userName.textContent = userData.name;
  userDescription.textContent = userData.about;
  userAvatar.style.backgroundImage = `url(${userData.avatar})`;
}

function renderInitialCards(cardsData, userId) {
  cardsData.forEach((cardData) => {
    const card = createCard(cardData, userId, deleteCard, handleLikeCard, viewImage);
    cardListContainer.append(card);
})  
}

function renderInitialPage() {
  Promise.all([
    getUser(),
    getInitialCards()
  ])
    .then(([ userData, cardsData ]) => {
      const userId = userData._id;
      renderUser(userData);
      renderInitialCards(cardsData, userId);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`)
    })
}

function resetForm(formElement) {
  formElement.reset();
  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  toggleButtonState(validationConfig, inputList, button);
}

function renderLoading(formElement, isLoading) {
  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = button.getAttribute('data-button-text');
  }
}

//ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ

// Отрисовываем исходную страницу: информацию о пользователе и карточки:
renderInitialPage(); 

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
  renderLoading(createCardFormElement, true);
  const cardData = {
    name: cardNameInput.value,
    link: cardImageUrlInput.value
  }
  Promise.all([
    getUser(),
    postNewCard(cardData.name, cardData.link)
  ])
    .then(([ userData, cardData ]) => {
      const card = createCard(cardData, userData._id, deleteCard, handleLikeCard, viewImage);
      cardListContainer.prepend(card);
      resetForm(createCardFormElement);
      closeModal(popupAddNewCard);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`)
    })
    .finally((err) => {
      renderLoading(createCardFormElement, false);
    })
}

createCardFormElement.addEventListener('submit', handleAddCardSubmit);

// Редактирование профиля: 

buttonEditProfile.addEventListener('click', function () {
  editProfileFormElement.name.value = userName.textContent;
  editProfileFormElement.description.value = userDescription.textContent;
  clearValidation(validationConfig, editProfileFormElement);
  openModal(popupEditProfile);
});

/**
 * Обрабатывает отправку формы редактирования профиля: позволяет изменить
 * имя пользователя и описание.
 * @param {Event} evt 
 */
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(editProfileFormElement, true);
  updateProfileInfo(userNameInput.value, userDescriptionInput.value)
    .then((userData) => {
      renderUser(userData);
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(editProfileFormElement, false);
    })
};

editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);

// Обновление аватара:

buttonEditAvatar.addEventListener('click', function () { 
  clearValidation(validationConfig, editAvatarFormElement);
  openModal(popupEditAvatar);
})

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(editAvatarFormElement, true);
  updateAvatar(userAvatarInput.value)
    .then((userData) => {
      renderUser(userData);
      resetForm(editAvatarFormElement);
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(editAvatarFormElement, false);
    })
}

editAvatarFormElement.addEventListener('submit', handleEditAvatarFormSubmit);

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
