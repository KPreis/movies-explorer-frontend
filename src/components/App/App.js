import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import { register, authorization, validateToken, logout } from '../../utils/auth';
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';


function App() {
  const [statusRegister, setStatusRegister] = useState(true);
  const [isLogedIn, setIsLogedIn] = useState(true);
  const [cards, setData] = useState([]);
  const [dataProfile, setDataProfile] = useState({ name: '', email: '' });

  const history = useHistory();

  const handleRegister = (email, password) => {
    register(email, password)
      .then((result) => {
        if (result) {
          setStatusRegister(true);
          history.push('/signin');
        }
      })
      .catch((error) => {
        console.log(error);
        setStatusRegister(false);
      });
  };

  const handleLogin = (email, password) => {
    authorization(email, password)
      .then((result) => {
        if (result) {
          Promise.all([moviesApi.getMovies(), mainApi.getProfile()])
      .then(([initialCards, dataProfile]) => {
        setData(initialCards);
        setDataProfile(dataProfile);
      })
      .catch((error) => {
        console.log(error);
      });
          setStatusRegister(false);
          setIsLogedIn(true);
          history.push('/movies');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleSignOut() {
    logout();
    history.push('/signin');
    setIsLogedIn(false);
  }

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
              <Register handleRegister={handleRegister} statusRegister={statusRegister}/>
            </Route>
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
            <Route path="/profile">
              <Profile handleSignOut={ handleSignOut } />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
