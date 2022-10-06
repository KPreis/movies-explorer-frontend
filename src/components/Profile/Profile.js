import React, {useContext, useState, useEffect} from 'react';
import './Profile.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile( { handleSignOut, statusEditRequest, handleProfileEdit } ) {
  const { values, handleChange, resetFrom, isValid } = useFormWithValidation();
  const { text, type } = statusEditRequest;
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEditing] = useState(false);
  const [statusText, setStatusText] = useState('');

  const isDisabled = isValid && (values.name !== currentUser.name || values.email !== currentUser.email);

  const submitButtonClassName = `profile-form__submit ${!isDisabled && "profile-form__submit_inactive"}`;
  const inputClassName = `profile-form__input ${!isEdit && "profile-form__input_disabled"}`;

  const apiMessageClassName = `profile-form__api-message profile-form__api-message_type_${type}`;

  const handleEditClick = () => {
    resetFrom(currentUser, {}, false);
    setIsEditing(true);
    setStatusText('');
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsEditing(false);
    handleProfileEdit(values);
  }

  useEffect(() => {
      setStatusText(text);
  }, [statusEditRequest]);

  useEffect(() => {
    setStatusText('');
}, []);

  useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, false)
    }
  }, [currentUser, resetFrom]);
  
  return (
    <section className="profile">
      <form  className="profile-form" name="login" onSubmit={handleSubmit}>
        <h1 className="profile-form__title">Привет, {currentUser.name}!</h1>
        <label className="profile-form__label">
          <span className="profile-form__label-text">Имя</span>
          <input
            value={values.name || currentUser.name}
            onChange={handleChange}
            id="name-input"
            type="text"
            name="name"
            placeholder="Имя"
            className={inputClassName}
            minLength="2"
            maxLength="30"
            required
            disabled={!isEdit}
          />
        </label>

        <label className="profile-form__label">
          <span className="profile-form__label-text">E-mail</span>
          <input
            value={values.email || currentUser.email}
            onChange={handleChange}
            id="email-input"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            name="email"
            placeholder="E-mail"
            className={inputClassName}
            required
            disabled={!isEdit}
          />
        </label>

        
          <span
            className={apiMessageClassName}
          >{statusText}</span>
        
        

        {isEdit ? (
          <button
            type="submit"
            className={submitButtonClassName}
            disabled={!isDisabled}
          >Сохранить</button>
        ) : (
          <>
            <button
              className="profile-form__edit"
                type="button"
                onClick={handleEditClick}
            >Редактировать</button>
            <button
              className="profile__logout"
                type="button"
                onClick={handleSignOut}
            >Выйти из аккаунта</button>
          </>
        )}
      </form>
    </section>
  );
}

export default Profile;
