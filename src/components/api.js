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
      return Promise.reject(`Ошибка: ${res.status}`)
    })
}