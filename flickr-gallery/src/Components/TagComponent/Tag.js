import React, { Component } from 'react';
import './Tag.scss';

const ReactSafeHtml = require('react-safe-html');

class Tag extends Component {
  render() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return (
      <div className="chip" style={{ backgroundColor: `#${randomColor}` }}>
        <span className="chip__text">{this.props.tagName}</span>
        <i className="far fa-times-circle chip__icon"
          onClick={this.props.iconClickHandler} ></i>
      </div>
    );
  }
}

export default Tag;
