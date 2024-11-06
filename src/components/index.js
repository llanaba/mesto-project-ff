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

// Переменная для хранения колбэка удаления карточки: при нажатии на кнопку
// удаления на карточке вызывается функция configurePerformDelete, которая 
// меняет содержимое переменной performDelete. При подтверждении удаления 
// карточки код, записанный в performDelete, исполняется.
let performDelete;

/**
 * Сохраняет в переменную performDelete настройки функции удаления, которая 
 * сработает при подтверждении удаления
 * @param {Function} deletionFunction - колбэк, ответственный за удаление (он создается
 * в момент создания карточки и хранит в себе данные карточки и данные 
 * html элемента карточки)
 */
function configurePerformDelete(deletionFunction) {
  performDelete = deletionFunction;
}

/**
 * Исполняет код, записанный в переменную performDelete с помощью configurePerformDelete.
 */
function confirmDeletion() {
  performDelete();
}

/**
 * Обрабатывает удаление карточки: открывает модальное окно для подтверждения удаления
 * и перезаписывает значение переменной performDelete, используя данные карточки, которую
 * пользователь хочет удалить. 
 * @param {Object} card - объект карточки, которую нужно удалить
 */
function handleDelete(card) {
  openModal(popupConfirmDelete);
  configurePerformDelete(() => {
    deleteCard(card)
      .then(() => {
        closeModal(popupConfirmDelete);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`)
      })
  })
}

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
export const popupConfirmDelete = document.querySelector('.popup_type_confirm-delete');

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

// Форма подтверждения удаления карточки:
const confirmDeleteFormElement = popupConfirmDelete.querySelector('.popup__form');

// Элементы изображения и подписи к нему:
const imageElement = popupViewImage.querySelector('.popup__image');
const imageCaption = popupViewImage.querySelector('.popup__caption');


/**
 * Отображает информацию о пользователе на странице
 * @param {Object} userData - Объект, содержащий информацию о пользователе
 * @param {string} userData.name - Имя пользователя
 * @param {string} userData.about - Описание пользователя (job)
 * @param {string} userData.avatar - Ссылка на аватар пользователя
 */
function renderUser(userData) {
  userName.textContent = userData.name;
  userDescription.textContent = userData.about;
  userAvatar.style.backgroundImage = `url(${userData.avatar})`;
}

/**
 * Отрисовывает карточки на странице
 * @param {Array} cardsData - Список объектов карточек, которые нужно отобразить
 * @param {string} userId - Id пользователя (необходим, чтобы определять принадлежность
 * карточки данному пользователю: если карточка принадлежит пользователю, он имеет
 * возможность ее удалять, а если не принадлежит, то он не может ее удалить)
 */
function renderInitialCards(cardsData, userId) {
  cardsData.forEach((cardData) => {
    const card = createCard(cardData, userId, handleDelete, handleLikeCard, viewImage);
    cardListContainer.append(card.element);
})  
}

/**
 * Отрисовывает страницу при первой загрузке. Для этого функция делает два параллельных
 * запроса: для получения карточек и для получения данных пользователя. 
 * @returns {Promise} Промис, ответственный за получение данных сразу от двух запросов:
 * данные пользователя и данные карточек, существующих на сервере.
 */
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

/**
 * Очищает форму от введенных в нее данных и делает неактивной кнопку отправки формы
 * @param {HTMLFormElement} formElement - Форма, которую необходимо очистить
 */
function resetForm(formElement) {
  formElement.reset();
  const button = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  toggleButtonState(validationConfig, inputList, button);
}

/**
 * Меняет текст на кнопке отправки формы, чтобы визуализировать загрузку
 * @param {HTMLFormElement} formElement - Форма, сохранение данных в которой нужно визуализировать
 * @param {boolean} isLoading - Параметр, который передается при вызове функции, чтобы
 * определить ее состояние: true, если нужно отобразить текст при загрузке, и false,
 * если нужно отобразить кнопку в обычном состоянии
 */
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

// Слушатели на кнопки закрытия попапов:
buttonsClosePopup.forEach(button => {
  button.addEventListener('click', function (event) {
    const activePopup = event.target.closest('.popup');
    closeModal(activePopup);
  })
})

// Слушатель на кнопку подтверждения удаления карточки: вызывает функцию
// confirmDeletion, удаляющую карточку
confirmDeleteFormElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  confirmDeletion();
})

// Включаем валидацию всех форм на странице:
enableValidation(validationConfig);


// ВЗАИМОДЕЙСТВИЕ С ПОЛЬЗОВАТЕЛЕМ

// Добавление новой карточки на страницу: 

buttonAddNewCard.addEventListener('click', function () {
  resetForm(createCardFormElement);
  openModal(popupAddNewCard);
});

/**
 * Обрабатывает отправку формы добавления карточки: создает новую карточку 
 * и добавляет ее в начало списка карточек.
 * @param {Event} evt — событие отправки формы
 */
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(createCardFormElement, true);
  const cardData = {
    name: cardNameInput.value,
    link: cardImageUrlInput.value
  }
  postNewCard(cardData.name, cardData.link)
    .then((cardData) => {
      const card = createCard(cardData, cardData.owner._id, handleDelete, handleLikeCard, viewImage);
      cardListContainer.prepend(card.element);
      resetForm(createCardFormElement);
      closeModal(popupAddNewCard);
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`)
    })
    .finally(() => {
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
 * @param {Event} evt — событие отправки формы
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

/**
 * Обрабатывает форму отправки ссылки при обновлении аватара: отправляет новую ссылку
 * на сервер и отображает новый аватар, если ссылка прошла валидацию.
 * @param {Event} evt — событие отправки формы
 * @throws {Error} — если ссылка на картинку не прошла валидацию
 */
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
