import React from 'react';
import './Navigation.css';
import accountLogo from '../../images/account.svg';
import { Link } from 'react-router-dom';

function Navigation({isLogedIn}) {

  return (
    <nav className="navigation">
      {isLogedIn ? (
        <div className="navigation__content">
          <div className="navigation__links">
            <Link to="/movies" className="navigation__link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="navigation__link">
              Сохранённые фильмы
            </Link>
          </div>
          <Link to="/profile" >
            <button className="navigation__account-button">
              <img className="navigation__account-button-logo" src={accountLogo} alt="Account logo"></img>
              Аккаунт
            </button>
          </Link>
        </div>  
      ) 
      :
      (
        <div className="navigation__landing-links">
          <Link to="/signup" className="navigation__register-link">
            Регистрация
          </Link>
          <Link to="/signin">
            <button className="navigation__login-button">
              Войти
            </button>
          </Link>
        </div>
        )
      }
    </nav>
  )
}

export default Navigation;