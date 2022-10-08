import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';
import logo from '../../images/logo.svg';

function Form({ children, titleText, submitButtonText, questionText, linkPath, linkText, isSubmitDisabled, statusRequest, onSubmit }) {

  const type = statusRequest.type;
  const text = statusRequest.text;
  
  const apiFeedbackClassName = `form__feedback form__feedback_type_${type}`;
  const submitButtonClassName = `form__submit ${isSubmitDisabled && "form__submit_inactive"}`;

  return(
    <form className="form" noValidate onSubmit={onSubmit}>
      <Link className="form__logo" to="/">
        <img
          src={logo}
          alt="Логотип сайта"
        />
      </Link>
      <h1 className="form__title">{titleText}</h1>

      {children}

      <span
        className={apiFeedbackClassName}
      >{text}</span>

      <button
        type="submit"
        className={submitButtonClassName}
        disabled={isSubmitDisabled}
      >{submitButtonText}</button>

      <div className="form__sign-in-wrap">
        <p className="form__sign-in-question">{`${questionText} `}
        <Link className="form__sign-in-link" to={linkPath}>{linkText}</Link></p>
      </div>
    </form>
  );
}

export default Form;
