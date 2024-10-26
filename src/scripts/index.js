import '../pages/index.css';
import initialCards from './cards.js';
import { openModal, closeModal } from './modal.js';

/**
 * Создает элемент карточки, получая на вход данные карточки и функцию удаления
 * @param {Object} cardData — объект, содержащий данные карточки
 * @param {Function} deleteCard — колбэк-функция, ответственная за удаление карточки
 * @returns {HTMLElement} cardElement — готовый к добавлению в DOM элемент карточки
 */
function createCard(cardData, deleteCard) {
  // Клонируем темплейт карточки, ищем в нем все элементы:
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('li').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardDeleteButtonElement = cardElement.querySelector('.card__delete-button');
  
  // Заполняем элементы карточки данными:
  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  
  // Вешаем обработчик событий на кнопку удаления:
  cardDeleteButtonElement.addEventListener('click', function () {
    deleteCard(cardElement);
  });

  // Вешаем обработчик события на изображение, чтобы его можно было открыть на весь экран
  cardImageElement.addEventListener('click', function () {
    openModal(popupViewImage);
  });

  // Возвращаем готовый элемент карточки:
  return cardElement;
}

/**
 * Удаляет элемент карточки, переданный в качестве аргумента
 * @param {HTMLElement} card — элемент карточки, которую необходимо удалить
 */
function deleteCard(card) {
  card.remove();
}

// Выводим карточки на страницу:
const cardListContainer = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard);
  cardListContainer.append(card);
})


// Попапы и кнопки, которые их активируют:
const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');

const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupViewImage = document.querySelector('.popup_type_image');

buttonAddNewCard.addEventListener('click', function () {
  openModal(popupAddNewCard);
});

const editProfileFormElement = popupEditProfile.querySelector('.popup__form');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');

buttonEditProfile.addEventListener('click', function () {
  editProfileFormElement.name.value = userName.textContent;
  editProfileFormElement.description.value = userDescription.textContent;
  openModal(popupEditProfile);
})

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
  const descriptionInput = editProfileFormElement.querySelector('.popup__input_type_description');
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
  closeModal(popupEditProfile);
}

editProfileFormElement.addEventListener('submit', handleFormSubmit);