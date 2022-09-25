import logo from '../../images/logo.svg';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ isLogedIn }) {

  return (
    <header className={`header ${!isLogedIn && "header_landing"}`} >
      <div className="header__content">
        <img className="header__logo" src={logo} alt="Логотип" />
        <Navigation isLogedIn={isLogedIn} />
      </div>
    </header>
  );
}

export default Header;