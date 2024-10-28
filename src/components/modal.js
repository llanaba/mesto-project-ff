/**
 * Обрабатывает закрытие модальных окон с помощью клавиши Escape
 * @param {KeyboardEvent} event - событие нажатия клавиши Escape
 */
function handleEscapeClose (event) {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
}

/**
 * Обрабатывает закрытие модальных окон с помощью клика по оверлею
 * @param {MouseEvent} event - клик по оверлею модального окна
 */
function handleOverlayClose (event) {
  if (event.target.classList.contains('popup_is-opened')) {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
}

/**
 * Открывает модальное окно и вешает слушатели событий для его закрытия
 * @param {HTMLElement} popupElement - модальное окно, которое нужно открыть
 */
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeClose);
  document.addEventListener('click', handleOverlayClose);
}

/**
 * Закрывает модальное окно и снимает с него слушатели событий
 * @param {HTMLElement} popupElement - модальное окно, которое нужно закрыть
 */
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeClose);
  document.removeEventListener('click', handleOverlayClose);
}
