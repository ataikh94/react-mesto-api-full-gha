import { authBaseUrl } from "./constants";

export const register = (email, password) => {
  return fetch(`${authBaseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        return response.json();
      }
    })
};

export const authorize = (email, password) => {
  return fetch(`${authBaseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((response => response.json()))
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
    .then(res => res.json())
    .then(data => data)
}