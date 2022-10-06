import React, { useState, useEffect } from 'react';
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
import { mainApi } from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


function App() {
  const [isLogedIn, setIsLogedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [statusRegisterRequest, setStatusRegisterRequest] = useState({});
  const [statusLoginRequest, setStatusLoginRequest] = useState({});
  const [savedMoviesByUser, setSavedMoviesByUser] = useState([]);
  const [statusEditRequest, setStatusEditRequest] = useState({});

  useEffect(() => {
    mainApi.getSavedMovies()
      .then((result) => {
        setSavedMoviesByUser(result.filter((i) => i.owner === currentUser._id));
      })
      .catch(error => {
        console.log(error)
      })
  }, [currentUser]);

  useEffect(() => {
    checkToken();
  });

  useEffect(() => {
    localStorage.setItem('savedMovies', JSON.stringify(savedMoviesByUser));
  }, [savedMoviesByUser])

  useEffect(() => {
    const currentUserInSessionStorage = JSON.parse(sessionStorage.getItem('currentUser'));

    if (!currentUserInSessionStorage) {
      mainApi.getProfile()
      .then((dataProfile) => {
        setCurrentUser(dataProfile);
        sessionStorage.setItem('currentUser', JSON.stringify(dataProfile));
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      setCurrentUser(currentUserInSessionStorage);
    }
  }, []);

  const history = useHistory();

  const handleRegister = (name, email, password) => {
    register(name, email, password)
      .then((result) => {
        if (result) {
          handleLogin(email, password);
        }
      })
      .catch((error) => {
        if (error === "Ошибка: 409") {
          setStatusRegisterRequest({
            type: 'error',
            text: 'Пользователь с таким email уже существует'
          });
        } else {
          setStatusRegisterRequest({
            type: 'error',
            text: 'При регистрации пользователя произошла ошибка'
          });
        }
      });
  };

  const handleLogin = (email, password) => {
    authorization(email, password)
      .then((result) => {
        if (result) {
          mainApi.getProfile()
          .then((dataProfile) => {
            setCurrentUser(dataProfile);
            sessionStorage.setItem('currentUser', JSON.stringify(dataProfile));
            })
            .catch((error) => {
              console.log(error);
            });
            setIsLogedIn(true);
            history.push('/movies');
            setStatusLoginRequest({});
          }
      })
      .catch((error) => {
        console.log(error);
        if (error === "Ошибка: 401") {
          setStatusLoginRequest({
            type: 'error',
            text: 'Неправильный Email или Пароль'
          });
        } else {
          setStatusLoginRequest({
            type: 'error',
            text: 'Что-то пошло не так...'
          });
        }
      });
  };

  const handleProfileEdit = (profile) => {
    const {name, email} = profile;
    mainApi.setProfile(name, email)
      .then((result) => {
        setCurrentUser(result);
        setStatusEditRequest({
          type: 'success',
          text: 'Профиль обновлён.'
        });
        sessionStorage.setItem('currentUser', JSON.stringify(result));
      })
      .catch((error) => {
        if (error === "Ошибка: 409") {
          setStatusEditRequest({
            type: 'error',
            text: 'Пользователь с таким email уже существует'
          });
        } else {
          setStatusEditRequest({
            type: 'error',
            text: 'При обновлении профиля произошла ошибка'
          });
        }
        });
  };

  const checkToken = () => {
    validateToken()
      .then(() => {
        setIsLogedIn(true);
      })
      .catch((error) => {
        setIsLogedIn(false);
      });
  };

  const handleSignOut = () => {
    logout();
    localStorage.clear();
    sessionStorage.clear();
    history.push('/');
    setIsLogedIn(false);
    setStatusEditRequest({})
  }

  const handleMovieSave = (movie) => {
    mainApi.saveMovie(movie)
      .then((newSavedMovie) => {
        setSavedMoviesByUser((movies) => [
          newSavedMovie,
          ...movies
        ]);
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleMovieDelete = (movie) => {
    mainApi.deleteMovie(movie._id)
      .then(() => {
        setSavedMoviesByUser((movies) => movies.filter((m) => m._id !== movie._id));
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app__page">
          <Header isLogedIn={isLogedIn} />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/signup">
              <Register handleRegister={handleRegister} statusRegisterRequest={statusRegisterRequest}/>
            </Route>
            <Route exact path="/signin">
              <Login handleLogin={handleLogin} statusLoginRequest={statusLoginRequest} />
            </Route>
            <ProtectedRoute path="/movies"
              isLogedIn={isLogedIn}
              component={Movies}
              handleMovieSave={handleMovieSave}
              handleMovieDelete={handleMovieDelete}
              savedMoviesByUser={savedMoviesByUser}
            />
            <ProtectedRoute path="/saved-movies"
              isLogedIn={isLogedIn}
              component={SavedMovies}
              savedMoviesByUser={savedMoviesByUser}
              handleMovieDelete={handleMovieDelete}
            />
            <ProtectedRoute path="/profile"
              isLogedIn={isLogedIn}
              component={Profile}
              handleSignOut={handleSignOut}
              handleProfileEdit={handleProfileEdit}
              statusEditRequest={statusEditRequest}
            />
          </Switch>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
