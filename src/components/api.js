import { apiConfig } from './index.js'

export function getUser() {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    headers: apiConfig.headers
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }) 
}

export function getInitialCards() {
  return fetch(`${apiConfig.baseUrl}cards`, {
    headers: apiConfig.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export function updateProfileInfo (userName, userDescription) {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: userName,
      about: userDescription
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

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
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(`Ссылка на аватар не прошла валидацию: ${err}`);
      })
    }

export function postNewCard(cardName, imageLink) {
  return fetch(`${apiConfig.baseUrl}cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: imageLink
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function deleteCardApi(cardId) {
  return fetch(`${apiConfig.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
    .then((res) => {
      if (res.ok) {
        return res
      } 
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function likeCardApi(cardId, method) {
  return fetch(`${apiConfig.baseUrl}cards/likes/${cardId}`, {
    method: method,
    headers: apiConfig.headers
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } 
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}