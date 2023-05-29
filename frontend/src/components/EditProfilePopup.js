import React from 'react'
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm'
import useFormValidation from '../utils/useFormValidation';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValue, reset, formRef } = useFormValidation();
  const getErrorClassName = (name) => `popup__input-error ${errors[name] ? 'popup__input-error_active' : ''}`
  const onClosePopup = () => {
    onClose();
    reset({ 'name': currentUser.name, 'text': currentUser.about });
  }

  React.useEffect(() => {
    setValue('name', currentUser.name)
    setValue('text', currentUser.about)
  }, [currentUser, setValue, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values['name'],
      about: values['text']
    });
  }

  return (
    <PopupWithForm name='editProfile'
      ref={formRef}
      title='Редактировать профиль'
      isOpen={isOpen}
      btnName='Сохранить'
      onClose={onClosePopup}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input type="text"
        className="popup__input popup__input_type_name"
        name="name"
        id="name"
        placeholder="Укажите Ваше имя"
        minLength="2"
        maxLength="40"
        value={values['name'] ?? ''}
        onChange={handleChange} required />
      <span className={getErrorClassName('name')}>{errors['name']}</span>
      <input type="text"
        className="popup__input popup__input_type_text"
        name="text"
        id="text"
        placeholder="Опишите Вашу деятельность"
        minLength="2"
        maxLength="200"
        value={values['text'] ?? ''}
        onChange={handleChange} required />
      <span className={getErrorClassName('text')}>{errors['text']}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;