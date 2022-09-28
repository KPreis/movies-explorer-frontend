import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const isLogedIn = false;

  return (
    <div className="app">
      <CurrentUserContext.Provider value={'currentUser'}>
        <div className="app__page">
          <Header isLogedIn={isLogedIn} />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/signup">
              <Register />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
            <Route path="/profile">
              <Login />
            </Route>
            <Route>
              {isLogedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
            </Route>
          </Switch>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
