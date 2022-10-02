import React, { useState } from 'react';
import './Navigation.css';
import accountLogo from '../../images/account.svg';
import { Link, NavLink } from 'react-router-dom';

function Navigation({ isLogedIn }) {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  }

  return (
    <nav className="navigation">
      {isLogedIn ? (
        <>
        <div className="navigation__content">
          <div className="navigation__links">
            <NavLink to="/movies" className="navigation__link" activeClassName="navigation__link_active">
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">
              Сохранённые фильмы
            </NavLink>
          </div>
          <Link to="/profile" >
            <button className="navigation__account-button">
              <img className="navigation__account-button-logo" src={accountLogo} alt="Account logo"></img>
              Аккаунт
            </button>
          </Link>
        </div>
        <button className="navigation__menu-open navigation__menu-open" onClick={handleMenuOpen} type="button"></button>
      </>
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

      <div className={`navigation__mobile-menu mobile-menu ${isMenuOpen ? "mobile-menu_is-open" : ""}`}>
        <div className="mobile-menu__links">
          <button className="mobile-menu__close" onClick={handleMenuClose} type="button"></button>
          <NavLink className="mobile-menu__site-link" activeClassName="mobile-menu__site-link_active" exact to="/" onClick={handleMenuClose}>Главная</NavLink>
          <NavLink className="mobile-menu__site-link" activeClassName="mobile-menu__site-link_active" to="/movies" onClick={handleMenuClose}>Фильмы</NavLink>
          <NavLink className="mobile-menu__site-link" activeClassName="mobile-menu__site-link_active" to="/saved-movies" onClick={handleMenuClose}>Сохранённые фильмы</NavLink>
          <Link className="mobile-menu__user-profile" to="/profile" onClick={handleMenuClose}>
            <button className="navigation__account-button">
              <img className="navigation__account-button-logo" src={accountLogo} alt="Account logo"></img>
              Аккаунт
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;