import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Card from './Card';
import Header from './Header';

function Main({
    email,
    signOut,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    return (
        <>
            <Header>
                <div className='header__group'>
                    <span className='header__email'>{email}</span>
                    <button type='button'
                        className='header__button'
                        onClick={signOut}>Выйти</button>
                </div>
            </Header>
            <main className="main">
                <section className="profile">
                    <div className="profile__content">
                        <button type="button"
                            className="profile__change-avatar"
                            aria-label="Кнопка редактирования аватара"
                            onClick={onEditAvatar}>
                            <img src={currentUser.avatar}
                                alt="Аватар"
                                className="profile__avatar" />
                        </button>
                        <div className="info">
                            <h1 className="info__name">{currentUser.name}</h1>
                            <button type="button"
                                className="info__edit-button"
                                aria-label="Кнопка редактирования информации профиля"
                                onClick={onEditProfile}></button>
                            <p className="info__text">{currentUser.about}</p>
                        </div>
                    </div>
                    <button type="button"
                        className="profile__add-button"
                        aria-label="Кнопка добавления карточки"
                        onClick={onAddPlace}></button>
                </section>
                <section className="elements">
                    <ul className="card-list">
                        {
                        cards.map((item) => {
                            return (
                                <li className="element" key={item._id}><Card key={item._id}
                                    card={item}
                                    onCardClick={onCardClick}
                                    onCardLike={onCardLike}
                                    onCardDelete={onCardDelete} /></li>
                            )
                        }).reverse()}
                    </ul>
                </section>
            </main>
        </>
    );
}

export default Main;