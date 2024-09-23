// Функция создания карточки
function addCard(cardData, deleteCard) {
  // Клонируем темплейт карточки, ищем в нем все элементы:
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('li').cloneNode(true);
  const cardTitleElement = cardElement.querySelector('.card__title');
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardDeleteButtonElement = cardElement.querySelector('.card__delete-button');
  
  // Заполняем элементы карточки данными:
  cardTitleElement.textContent = cardData.name;
  cardImageElement.src = cardData.link
  
  // Вешаем обработчик событий на кнопку удаления:
  cardDeleteButtonElement.addEventListener('click', function () {
    deleteCard(cardElement);
  });

  // Возвращаем готовый элемент карточки:
  return cardElement;
}

// Функция удаления карточки:
function deleteCard(card) {
  card.remove();
}

// Выводим карточки на страницу:
const cardListContainer = document.querySelector('.places__list');

initialCards.forEach((cardData) => {
  const card = addCard(cardData, deleteCard);
  cardListContainer.append(card);
})