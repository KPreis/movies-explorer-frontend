import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Header from '../Header/Header';

function App() {
  return (
    <div className="app">
      <CurrentUserContext.Provider value={'currentUser'}>
        <div className="app__page">
          <Header />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
