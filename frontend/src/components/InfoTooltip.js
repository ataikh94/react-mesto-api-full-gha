import React from 'react'

export default function InfoTooltip({ isOpen, text, image, onClose }) {

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button"
          className="popup__close-button"
          aria-label="Кнопка закрытия модального окна"
          onClick={onClose}></button>
        <img className='popup__login-result_image'
          alt={text}
          src={image} />
        <h2 className="popup__title popup__login-result_title">{text}</h2>
      </div>
    </div>
  )
}
