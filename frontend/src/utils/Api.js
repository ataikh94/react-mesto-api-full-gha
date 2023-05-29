class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
    }

    getUserInfo() {
        const userData = fetch(`${this._baseUrl}users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        return userData
            .then(this._checkResponse);
    }

    getCards() {
        const arrayCards = fetch(`${this._baseUrl}cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        return arrayCards
            .then(this._checkResponse);
    }

    patchUserInfo(name, desc) {
        const userInfoUpdate = fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: desc
            })
        })
        return userInfoUpdate
            .then(this._checkResponse);
    }

    postCard(name, link) {
        const cardPost = fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
        return cardPost
            .then(this._checkResponse);
    }

    deleteCard(itemId) {
        const cardDelete = fetch(`${this._baseUrl}cards/${itemId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        return cardDelete
            .then(this._checkResponse);
    }

    putLike(itemId) {
        const cardLike = fetch(`${this._baseUrl}cards/${itemId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        return cardLike
            .then(this._checkResponse);
    }

    deleteLike(itemId) {
        const likeDelete = fetch(`${this._baseUrl}cards/${itemId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        return likeDelete
            .then(this._checkResponse);
    }

    patchAvatar(avatar) {
        const avatarPatch = fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
        return avatarPatch
            .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    changeLikeCardStatus(id, isLiked) {
        const likeCardStatusChange = fetch(`${this._baseUrl}cards/${id}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        return likeCardStatusChange
            .then(this._checkResponse);
    }
}

const api = new Api('https://api.ataikh.mesto.nomoredomains.rocks/');

export default api;