function handleEscapeClose (event) {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
}

function handleOverlayClose (event) {
  if (event.target.classList.contains('popup_is-opened')) {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
}

export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeClose);
  document.addEventListener('click', handleOverlayClose);

  const buttonClosePopup = popupElement.querySelector('.popup__close');
  buttonClosePopup.addEventListener('click', function(event) {
    closeModal(popupElement);
  })
}

export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeClose);
  document.removeEventListener('click', handleOverlayClose);
}