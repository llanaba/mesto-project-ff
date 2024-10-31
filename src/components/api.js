import { apiConfig } from './index.js'

export function getUserData() {
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

export function getInitialCardsData() {
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