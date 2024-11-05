import { apiConfig } from '../utils/constants.js'

/**
 * Обрабатывает HTTP-ответ и возвращает его в формате JSON (или возвращает
 * ошибку)
 * @param {Response} res - объект запроса
 */
function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

/**
 * Забирает с сервера данные о пользователе
 * @returns {Promise<Object>} Промис, в котором возвращаются данные пользователя
 */
export function getUser() {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    headers: apiConfig.headers
})
  .then(res => {
    return getResponseData(res);
  });
}

/**
 * Забирает с сервера данные о существующих на данный момент карточках
 * @returns {Promise<Array>} Промис, в котором возвращается список данных карточек
 */
export function getInitialCards() {
  return fetch(`${apiConfig.baseUrl}cards`, {
    headers: apiConfig.headers
  })
  .then(res => {
    return getResponseData(res);
  });
}

/**
 * Обновляет информацию о пользователе на сервере
 * @param {string} userName - Новое имя пользователя
 * @param {string} userDescription - Новое описание пользователя (job)
 * @returns {Promise<Object>} Промис, в котором возвращаются обновленные данные пользователя
 */
export function updateProfileInfo (userName, userDescription) {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: userName,
      about: userDescription
    })
  })
  .then(res => {
    return getResponseData(res);
  });
}

/**
 * Обновляет аватар пользователя, предварительно проверяя ссылку на валидность
 * @param {string} avatarUrl - Ссылка на новый аватар
 * @returns {Promise<Object>} Промис, в котором возвращаются обновленные данные пользователя
 */
export function updateAvatar (avatarUrl) {
  return fetch(avatarUrl, {
    method: 'HEAD'
  })
  .then(res => {
    console.log(res.headers.get('Content-Type'));
    if (res.ok && res.headers.get('Content-Type').startsWith('image/')) {
      return fetch(`${apiConfig.baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
          avatar: avatarUrl
        })
      });
    } else { 
      return Promise.reject('По этой ссылке нет изображения');
    }
  })
      .then(res => {
        return getResponseData(res);
      })
      .catch((err) => {
        return Promise.reject(`Ссылка на аватар не прошла валидацию: ${err}`);
      })
    }

/**
 * Сохраняет новую карточку на сервере
 * @param {string} cardName - Название карточки
 * @param {string} imageLink - Ссылка на изображение внутри карточки
 * @returns {Promise<Object>} Промис, в котором возвращаются данные созданной карточки
 */
export function postNewCard(cardName, imageLink) {
  return fetch(`${apiConfig.baseUrl}cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: imageLink
    })
  })
    .then(res => {
      return getResponseData(res);
    });
}

/**
 * Удаляет карточку с сервера
 * @param {string} cardId - ID карточки, которую нужно удалить
 * @returns {Promise<Response>} Промис, в котором возвращается ответ сервера
 */
export function deleteCardApi(cardId) {
  return fetch(`${apiConfig.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then(res => {
    return getResponseData(res);
  });
}

/**
 * Ставит или отменяет лайк у карточки на сервере (в зависимости от того, 
 * ставил ли текущий пользователь лайк ранее)
 * @param {string} cardId - ID карточки, которой нужно поставить или отменить лайк
 * @param {string} method - HTTP-метод ('PUT' чтобы лайкнуть, 'DELETE' чтобы убрать лайк)
 * @returns {Promise<Object>} - Промис, в котором возвращаются обновленные данные карточки
 */
export function likeCardApi(cardId, method) {
  return fetch(`${apiConfig.baseUrl}cards/likes/${cardId}`, {
    method: method,
    headers: apiConfig.headers
  })
    .then(res => {
      return getResponseData(res);
    });
}