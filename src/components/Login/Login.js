import React, { useEffect } from 'react';
import './Login.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import Form from '../Form/Form';

function Login( {handleLogin, statusLoginRequest} ) {
  const { values, handleChange, resetFrom, errors, isValid } = useFormWithValidation();
  const isDisabled = !isValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
  };

  useEffect(() => {
    resetFrom({}, {}, false);
  }, [resetFrom]);

  return (
    <section className="login">
      <Form
        formName="login"
        titleText="Рады видеть!"
        submitButtonText="Войти"
        questionText="Ещё не зарегистрированы?"
        linkPath="/signup"
        linkText="Регистрация"
        isSubmitDisabled={isDisabled}
        statusRequest={statusLoginRequest}
        onSubmit={handleSubmit}
      >

        <label className="form__label">
          <span className="form__label-text">E-mail</span>
          <input
            value={values.email || ''}
            onChange={handleChange}
            id="email-input"
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            name="email"
            placeholder="E-mail"
            className="form__input form__input_type_email"
            required
          />
          <span className="email-input-error form__input-error">
            {errors.email || ''}
          </span>
        </label>

        <label className="form__label">
          <span className="form__label-text">Пароль</span>
          <input
            value={values.password || ''}
            onChange={handleChange}
            id="password-input"
            type="password"
            name="password"
            placeholder="Пароль"
            className="form__input form__input_type_password"
            required
          />
          <span className="password-input-error form__input-error">
            {errors.password || ''}
          </span>
        </label>
      </Form>
    </section>
  );
}

export default Login;
