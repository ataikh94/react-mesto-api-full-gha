import React from 'react'
import PopupWithForm from './PopupWithForm'
import useFormValidation from '../utils/useFormValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const { values, errors, isValid, handleChange, setValue, reset, formRef } = useFormValidation();

    React.useEffect(() => {
        setValue('popupAvatarLink', '')
    }, [isOpen]);

    const onClosePopup = () => {
        onClose();
        reset({ 'popupAvatarLink': '' });
      }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: values['popupAvatarLink']
        });
    }
    const getErrorClassName = (name) => `popup__input-error ${errors[name] ? 'popup__input-error_active' : ''}`

    return (
        <PopupWithForm ref={formRef}
            isValid={isValid}
            name='сhangeAvatar'
            title='Обновить аватар'
            isOpen={isOpen}
            btnName='Сохранить'
            onClose={onClosePopup}
            onSubmit={handleSubmit}>
            <input type="url"
                className="popup__input popup__input_type_link"
                name="popupAvatarLink"
                id="popupAvatarLink"
                placeholder="Ссылка на аватар"
                value={values['popupAvatarLink'] ?? ''}
                onChange={handleChange} required />
            <span className={getErrorClassName('popupAvatarLink')}>{errors['popupAvatarLink']}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;