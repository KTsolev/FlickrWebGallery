import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import PhotosList from './Components/PhotosList/PhotosList';

class App extends Component {

  render() {
    console.log('photos', this.state);
    return (
      <div className="App">
        <header className="App__header">
          <img src={logo} className="header__logo" alt="logo" />
          <p>
            Flickr image Gallery.
          </p>
          <div className="header__controls">
            <span className="header__label">Search by title:</span>
            <input name="searchByTitle" value="" type="text" />
            <span className="header__label">Search by tags:</span>
            <input name="searchByTags" value="" type="text" />
          </div>
        </header>
        <main className="list-holder">
           <PhotosList />
        </main>
      </div>
    );
  }
}

export default App;
