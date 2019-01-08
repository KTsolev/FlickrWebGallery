import React, { Component } from 'react';
import './Spinner.scss';

class Spinner extends Component {
  render() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return (
      <div className="spinner"></div>
    );
  }
}

export default Spinner;
