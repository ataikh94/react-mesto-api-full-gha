import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({
    card,
    onCardClick,
    onCardLike,
    onCardDelete }) {
        
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__button-like ${isLiked && 'element__button-like_active'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <div>
            <button type="button"
                className={`element__button-delete ${!isOwn ? 'element__button-delete_hided' : ''}`}
                aria-label="Кнопка Удалить"
                onClick={handleDeleteClick}></button>
            <img src={card.link}
                alt={card.name}
                className="element__image"
                onClick={handleClick} />
            <div className="element__group">
                <h2 className="element__desc">{card.name}</h2>
                <div className="element__likes">
                    <button type="button"
                        className={cardLikeButtonClassName}
                        aria-label="Кнопка Нравится"
                        onClick={handleLikeClick}></button>
                    <p className="element__count-likes">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;