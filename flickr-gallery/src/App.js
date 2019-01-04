import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import PhotosList from './Components/PhotosList/PhotosList';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App__header">
          <img src={logo} className="App__logo" alt="logo" />
          <p>
            Flickr image Gallery.
          </p>
        </header>
        <main className="App__list-holder">
          <PhotosList />
        </main>
      </div>
    );
  }
}

export default App;
