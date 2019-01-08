import React, { Component } from 'react';
import './Image.scss';

class Image extends Component {

  constructor(props) {
    super(props);

    this.ironImageHd = null;
    this.preloadImg = null;

    this._setLoadedImgtRef = element => this.ironImageHd = element;

    this._setPreloadImgtRef = element => this.preloadImg = element;

  }

  render() {
    return (
      <div className="iron-image-container">
        <div
          className="iron-image-loaded"
          ref={this._setLoadedImgtRef}>
          <img
            src={this.props.srcLoaded}
            style={{ display: 'none' }}
            onLoad={() => {
              this.ironImageHd.setAttribute(
                'style',
                `background-image: url('${this.props.srcLoaded}')`
              );
              this.ironImageHd.classList.add('iron-image-fade-in');
              this.preloadImg.classList.add('iron-image-fade-out');
            }}

            alt='user-img' />
        </div>
        <div
          className="iron-image-preload"
          ref={this._setPreloadImgtRef}
          style={{ backgroundImage: `url('${this.props.srcPreload}')` }}>
        </div>
      </div>
    );
  }

}

export default Image;
