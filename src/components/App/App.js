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
  const [isLogedIn, setIsLogedIn] = useState(false);
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
        console.log(result);
        if (result) {
          mainApi.getProfile()
          .then((dataProfile) => {
              setCurrentUser(dataProfile);
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
          type: 'succes',
          text: 'Профиль обновлён.'
        });
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
    history.push('/signin');
    setIsLogedIn(false);
  }

  const handleMovieSave = (movie) => {
    console.log(movie)
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
    console.log(movie)
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
            <ProtectedRoute exact path="/movies"
              isLogedIn={isLogedIn}
              component={Movies}
              handleMovieSave={handleMovieSave}
              handleMovieDelete={handleMovieDelete}
              savedMoviesByUser={savedMoviesByUser}
            />
            <ProtectedRoute exact path="/saved-movies"
              isLogedIn={isLogedIn}
              component={SavedMovies}
              savedMoviesByUser={savedMoviesByUser}
              handleMovieDelete={handleMovieDelete}
            />
            <ProtectedRoute exact path="/profile"
              isLogedIn={isLogedIn}
              component={Profile}
              handleSignOut={handleSignOut}
              handleProfileEdit={handleProfileEdit}
              statusEditRequest={statusEditRequest}
            />
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
