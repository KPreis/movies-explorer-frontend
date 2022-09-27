import logo from '../../images/logo.svg';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header({ isLogedIn }) {

  return (
    <Switch>
      <Route exact path="/">
        <header className={`header ${!isLogedIn && "header_landing"}`} >
          <div className="header__content">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <Navigation isLogedIn={isLogedIn} />
          </div>
        </header>
      </Route>
      <Route exact path="/(movies|saved-movies|profile)">
        <header className="header" >
          <div className="header__content">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <Navigation isLogedIn={true} />
          </div>
        </header>
      </Route>
    </Switch>
    
  );
}

export default Header;