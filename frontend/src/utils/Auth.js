import { authBaseUrl } from "./constants";

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${authBaseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(getResponse);
};

export const authorize = (email, password) => {
  return fetch(`${authBaseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(getResponse)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
    })
};

export const checkToken = (token) => {
  return fetch(`${authBaseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(getResponse);
}