import React, {useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { register, authorization, validateToken, logout } from '../../utils/auth.js';
import { api } from '../../utils/api.js';

function App() {
  const [moviesCard, setMoviesCard] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [movieCard, setMovieCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(true);

  const history = useHistory();

  useEffect(() => {
    checkToken();
  });

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getProfile()])
      .then(([initialCards, dataProfile]) => {
        setMoviesCard(initialCards);
        setCurrentUser(dataProfile);
      })
      .catch((error) => {      
        console.log(error);
      });
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
  };

  const handleUpdateUser = (profile) => {
    api
      .setProfile(profile)
      .then((result) => {
        setCurrentUser(result);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onRegister = (email, password) => {
    register(email, password)
      .then((result) => {
        if (result) {
          history.push('/sign-in');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLogin = (email, password) => {
    authorization(email, password)
      .then((result) => {
        if (result) {
          Promise.all([api.getInitialCards(), api.getProfile()])
          .then(([initialCards, dataProfile]) => {
            setMoviesCard(initialCards);
            setCurrentUser(dataProfile);
          })
          .catch((error) => {
            console.log(error);
          });
          setIsLogedIn(true);
          history.push('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkToken = () => {
    validateToken()
      .then(() => {
        setIsLogedIn(true);
        history.push('/');
      })
      .catch((error) => {
        if (error === 'Ошибка: 401') {
          history.push('/sign-in');
        }
        console.log(error);
      });   
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={'currentUser'}>
        <div className="app__page">
          <Header isLogedIn={isLogedIn} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              isLogedIn={isLogedIn}
              component={Main}
            />
            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route>
              {isLogedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
            </Route>
          </Switch>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
