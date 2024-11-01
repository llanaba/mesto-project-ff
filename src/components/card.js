import { deleteCardApi } from './api.js'

function isOwner(cardData, userId) {
  return (cardData.owner._id === userId);
}

/**
 * Создает элемент карточки, получая на вход данные карточки, функцию удаления
 * и функцию лайка карточки
 * @param {Object} cardData — объект, содержащий данные карточки
 * @param {Function} deleteCard — колбэк-функция, ответственная за удаление карточки
 * @returns {HTMLElement} cardElement — готовый к добавлению в DOM элемент карточки
 */
export function createCard(cardData, userId, deleteCard, likeCard, viewImage) {
  // Клонируем темплейт карточки, ищем в нем все элементы:
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('li').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardDeleteButtonElement = cardElement.querySelector('.card__delete-button');
  const cardLikeButtonElement = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  
  // Заполняем элементы карточки данными:
  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;
  

  // Отрисовываем кнопку удаления, если пользователь — автор карточки:
  if (isOwner(cardData, userId)) {
    cardDeleteButtonElement.style.display = 'block';
  }

  // Вешаем обработчик событий на кнопку удаления:
  cardDeleteButtonElement.addEventListener('click', function () {
    deleteCard(cardElement, cardData);
  });

  // Вешаем обработчик событий на кнопку лайка:
  cardLikeButtonElement.addEventListener('click', function () {
    likeCard(cardElement);
  })

  // Вешаем обработчик события на изображение, чтобы его можно было открыть на весь экран
  cardImageElement.addEventListener('click', function () {
    viewImage(cardData.name, cardData.link);
  });

  // Возвращаем готовый элемент карточки:
  return cardElement;
}

/**
 * Удаляет элемент карточки, переданный в качестве аргумента
 * @param {HTMLElement} card — элемент карточки, которую необходимо удалить
 */
export function deleteCard(cardElement, cardData) {
  deleteCardApi(cardData._id)
    .then((res) => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`)
    })
}

/**
 * Ставит лайк на элемент карточки, переданный в качестве аргумента
 * @param {HTMLElement} card — элемент карточки, которую необходимо лайкнуть
 */
export function likeCard(card) {
  const cardLikeButtonElement = card.querySelector('.card__like-button');
  cardLikeButtonElement.classList.toggle('card__like-button_is-active');
}

