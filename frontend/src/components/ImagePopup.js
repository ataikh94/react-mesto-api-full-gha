import React from 'react';

function ImagePopup({ card, onClose }) {
    const isOpen = card !== null;
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container-image">
                <button type="button"
                    className="popup__close-button"
                    aria-label="Кнопка закрытия модального окна"
                    onClick={onClose}></button>
                <img src={isOpen ? card.link : null}
                    alt={isOpen ? card.name : null}
                    className="popup__image" />
                <span className="popup__text">{isOpen ? card.name : null}</span>
            </div>
        </div>
    )
}

export default ImagePopup;