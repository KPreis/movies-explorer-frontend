import React from 'react';
import './Profile.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Profile( { handleSignOut } ) {
  const { values, handleChange, isValid } = useFormWithValidation();

  const isDisabled = !isValid;
  const isEditing = false;


  const submitButtonClassName = `profile-form__submit ${
    isDisabled && "profile-form__submit_inactive"
  }`;
  const inputClassName = `profile-form__input ${
    !isEditing && "profile-form__input_disabled"
  }`;
  

  return (
    <section className="profile">
      <form
        className="profile-form"
        name="login"
        action="#"
      >
        <h1 className="profile-form__title">Привет, Виталий!</h1>

        <label className="profile-form__label">
          <span className="profile-form__label-text">Имя</span>
          <input
            value={values.name || ''}
            onChange={handleChange}
            id="name-input"
            type="text"
            name="name"
            placeholder="Имя"
            className={inputClassName}
            minLength="2"
            maxLength="30"
            required
            disabled={!isEditing}
          />
        </label>

        <label className="profile-form__label">
          <span className="profile-form__label-text">E-mail</span>
          <input
            value={values.email || ''}
            onChange={handleChange}
            id="email-input"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            name="email"
            placeholder="E-mail"
            className={inputClassName}
            required
            disabled={!isEditing}
          />
        </label>

        {isEditing ? (
          <button
            type="submit"
            className={submitButtonClassName}
            disabled={isDisabled}
          >Сохранить</button>
        ) : (
          <>
            <button
              className="profile-form__edit"
              type="button"
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
