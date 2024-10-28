import '../pages/index.css';
import initialCards from './cards.js';
import { 
  createCard, 
  deleteCard, 
  likeCard, 
  prepareCardData 
} from './card.js';
import { openModal, closeModal } from './modal.js';


// DOM-ЭЛЕМЕНТЫ СТРАНИЦЫ

// Список карточек:
const cardListContainer = document.querySelector('.places__list');

// Попапы и кнопки, которые их активируют:
const buttonAddNewCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');

export const popupAddNewCard = document.querySelector('.popup_type_new-card');
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupViewImage = document.querySelector('.popup_type_image');

// Формы:
const editProfileFormElement = popupEditProfile.querySelector('.popup__form');
const createCardFormElement = popupAddNewCard.querySelector('.popup__form');

// Элементы, относящиеся к профилю пользователя на странице:
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');


//ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ

// Выводим исходные карточки на страницу:

initialCards.forEach((cardData) => {
  const card = createCard(cardData, deleteCard, likeCard, viewImage);
  cardListContainer.append(card);
})

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
  const cardData = prepareCardData(createCardFormElement);
  const card = createCard(cardData, deleteCard, likeCard);
  cardListContainer.prepend(card);
  createCardFormElement.reset();
  closeModal(popupAddNewCard);
}

createCardFormElement.addEventListener('submit', handleAddCardSubmit);

// Редактирование профиля: 

buttonEditProfile.addEventListener('click', function () {
  editProfileFormElement.name.value = userName.textContent;
  editProfileFormElement.description.value = userDescription.textContent;
  openModal(popupEditProfile);
});

/**
 * Обрабатывает отправку формы редактирования профиля: позволяет изменить
 * имя пользователя и описание.
 * @param {Event} evt 
 */
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
  const descriptionInput = editProfileFormElement.querySelector('.popup__input_type_description');
  userName.textContent = nameInput.value;
  userDescription.textContent = descriptionInput.value;
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
export function viewImage(cardName, cardLink) {
  openModal(popupViewImage);
  const imageElement = popupViewImage.querySelector('.popup__image');
  const imageCaption = popupViewImage.querySelector('.popup__caption');
  imageCaption.textContent = cardName;
  imageElement.src = cardLink;
  imageElement.alt = cardName;
}