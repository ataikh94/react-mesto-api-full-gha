import React from 'react'
import PopupWithForm from './PopupWithForm'
import useFormValidation from '../utils/useFormValidation';

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace }) {

  const { values, errors, isValid, handleChange, setValue, reset, formRef } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const newCard = {
      name: values['popupTitle'],
      link: values['popupLink']
    }
    onAddPlace(newCard);
  }

  React.useEffect(() => {
    setValue('popupTitle', '')
    setValue('popupLink', '')
  }, [isOpen]);

  const onClosePopup = () => {
    onClose();
    reset({ 'popupTitle': '' , 'popupLink': ''});
  }

  const getErrorClassName = (name) => `popup__input-error ${errors[name] ? 'popup__input-error_active' : ''}`

  return (
    <PopupWithForm isValid={isValid}
      ref={formRef}
      name='addCard'
      title='Новое место'
      isOpen={isOpen}
      btnName='Создать'
      onClose={onClosePopup}
      onSubmit={handleSubmit}>
      <input type="text"
        className="popup__input popup__input_type_title"
        name="popupTitle"
        id="popupTitle"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={values['popupTitle'] ?? ''}
        onChange={handleChange} required />
      <span className={getErrorClassName('popupTitle')}>{errors['popupTitle']}</span>
      <input type="url"
        className="popup__input popup__input_type_link"
        name="popupLink"
        id="popupLink"
        placeholder="Ссылка на картинку"
        value={values['popupLink'] ?? ''}
        onChange={handleChange} required />
      <span className={getErrorClassName('popupLink')}>{errors['popupLink']}</span>
    </PopupWithForm>
  )
}
export default AddPlacePopup;