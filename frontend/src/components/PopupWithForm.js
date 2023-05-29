import React from 'react';

const PopupWithForm = React.forwardRef(({
  name,
  isOpen,
  title,
  children,
  btnName,
  onClose,
  onSubmit,
  isValid }, ref) => {
    
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button"
          className="popup__close-button"
          aria-label="Кнопка закрытия модального окна"
          onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form ref={ref}
          name={name}
          className="popup__form"
          onSubmit={onSubmit} noValidate>
          {children}
          <button className={`popup__save-button ${isValid ? '' : 'popup__save-button_type_disabled'}`}
            type="submit">{btnName}</button>
        </form>
      </div>
    </div>
  )
})

export default PopupWithForm;